<?php
// namespace App\Http\Controllers\Api;
// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\Exam;
// use App\Models\UserExam;
// use App\Models\UserAnswer;
// use App\Models\Question;
// use Illuminate\Support\Facades\DB;
// use Carbon\Carbon;

// class UserExamController extends Controller
// {
//     public function start(Request $request, $examId) {
//         $userId = auth()->id() ?? $request->user_id ?? null;
//         if (!$userId) return response()->json(['message'=>'Unauthorized'], 401);

//         $exam = Exam::findOrFail($examId);
//         $session = UserExam::where('user_id', $userId)
//             ->where('exam_id', $exam->id)
//             ->where('is_submitted', false)
//             ->first();

//         if ($session) {
//             $session->load('answers.question.options');
//             return response()->json([
//                 'session'=>$session,
//                 'remaining_seconds'=> max(0, Carbon::parse($session->expires_at)->diffInSeconds(now()))
//             ]);
//         }
//         $started = now();
//         $expires = now()->addMinutes($exam->duration_minutes);

//         $session = UserExam::create([
//             'user_id'=>$userId,
//             'exam_id'=>$exam->id,
//             'started_at'=>$started,
//             'expires_at'=>$expires,
//         ]);

//         $session->load('exam');
//         return response()->json([
//             'session'=>$session,
//             'remaining_seconds'=>$exam->duration_minutes * 60
//         ]);
//     }
//     public function saveAnswer(Request $request) {
//         $userId = auth()->id() ?? $request->user_id ?? null;
//         if (!$userId) return response()->json(['message'=>'Unauthorized'], 401);

//         $validated = $request->validate([
//             'user_exam_id'=>'required|integer|exists:user_exams,id',
//             'question_id'=>'required|integer|exists:questions,id',
//             'selected_option_ids'=>'nullable|array',
//             'selected_option_ids.*'=>'integer',
//         ]);

//         $session = UserExam::findOrFail($validated['user_exam_id']);
//         if ($session->is_submitted) {
//             return response()->json(['message'=>'Session already submitted'], 400);
//         }
//         if (now()->greaterThan(Carbon::parse($session->expires_at))) {
//             return response()->json(['message'=>'Session expired'], 400);
//         }

//         $answer = UserAnswer::updateOrCreate(
//             [
//                 'user_exam_id'=>$validated['user_exam_id'],
//                 'question_id'=>$validated['question_id'],
//             ],
//             [
//                 'selected_option_ids'=>$validated['selected_option_ids'] ?? []
//             ]
//         );

//         return response()->json($answer);
//     }

//     public function resume($sessionId) {
//         $session = UserExam::with('answers.question.options','exam')->findOrFail($sessionId);
//         if ($session->is_submitted) {
//             return response()->json(['message'=>'Already submitted','session'=>$session], 400);
//         }
//         $remaining = max(0, Carbon::parse($session->expires_at)->diffInSeconds(now()));
//         return response()->json(['session'=>$session,'remaining_seconds'=>$remaining]);
//     }

//     public function submit(Request $request, $sessionId) {
//         $session = UserExam::with('answers.question.options','exam')->findOrFail($sessionId);
//         if ($session->is_submitted) {
//             return response()->json(['message'=>'Already submitted'], 400);
//         }
//         $exam = $session->exam;

//         $score = 0;
//         $total_possible = 0;
//         $perQ = $exam->marks_per_question;
//         $neg = $exam->negative_marks_per_question;
//         DB::transaction(function() use (&$session,&$score,&$total_possible,$perQ,$neg) {
//             foreach ($session->answers as $answer) {
//                 $question = $answer->question;
//                 $correct = $question->options()->where('is_correct', true)->pluck('id')->sort()->values()->toArray();
//                 $selected = $answer->selected_option_ids ?? [];
//                 sort($selected);
//                 if ($selected === $correct && count($correct)>0) {
//                     $score += $perQ;
//                 } else {
//                     $score -= $neg;
//                 }
//                 $total_possible += $perQ;
//             }

//             $session->is_submitted = true;
//             $session->score = $score;
//             $session->submitted_at = now();
//             $session->save();
//         });

//         $pass = $score >= $exam->pass_mark;

//         return response()->json([
//             'score'=>$score,
//             'pass'=>$pass,
//             'exam_total_marks'=>$total_possible,
//             'session'=>$session->load('answers.question.options')
//         ]);
//     }
// }




namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Exam;
use App\Models\UserExam;
use App\Models\UserAnswer;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class UserExamController extends Controller
{
    public function start(Request $request, $examId)
    {
        $userId = auth()->id() ?? $request->user_id ?? null;
        if (!$userId) return response()->json(['message' => 'Unauthorized'], 401);
        $exam = Exam::with('questions.options')->findOrFail($examId);
        $session = UserExam::where('user_id', $userId)
            ->where('exam_id', $exam->id)
            ->where('is_submitted', false)
            ->first();

        if ($session) {
            $session->load(['answers.question.options', 'exam.questions.options']);

            return response()->json([
                'session' => $session,
                'remaining_seconds' => max(0, Carbon::parse($session->expires_at)->diffInSeconds(now()))
            ]);
        }
        $startedAt = now();
        $expiresAt = now()->addMinutes($exam->duration_minutes);

        $session = UserExam::create([
            'user_id'   => $userId,
            'exam_id'   => $exam->id,
            'started_at'=> $startedAt,
            'expires_at'=> $expiresAt,
        ]);
        $session->load(['exam.questions.options']);

        return response()->json([
            'session' => $session,
            'remaining_seconds' => $exam->duration_minutes * 60
        ]);
    }
    public function saveAnswer(Request $request)
    {
        $userId = auth()->id() ?? $request->user_id ?? null;
        if (!$userId) return response()->json(['message'=>'Unauthorized'], 401);

        $validated = $request->validate([
            'user_exam_id'       => 'required|integer|exists:user_exams,id',
            'question_id'        => 'required|integer|exists:questions,id',
            'selected_option_ids'=> 'nullable|array',
            'selected_option_ids.*'=> 'integer',
        ]);

        $session = UserExam::findOrFail($validated['user_exam_id']);

        if ($session->is_submitted)
            return response()->json(['message'=>'Session already submitted'], 400);

        if (now()->greaterThan(Carbon::parse($session->expires_at)))
            return response()->json(['message'=>'Session expired'], 400);

        $answer = UserAnswer::updateOrCreate(
            [
                'user_exam_id' => $validated['user_exam_id'],
                'question_id'  => $validated['question_id'],
            ],
            [
                'selected_option_ids' => $validated['selected_option_ids'] ?? []
            ]
        );

        return response()->json($answer);
    }
    public function resume($sessionId)
    {
        $session = UserExam::with([
            'answers.question.options',
            'exam.questions.options'
        ])->findOrFail($sessionId);

        if ($session->is_submitted) {
            return response()->json([
                'message'=>'Already submitted',
                'session'=>$session
            ], 400);
        }

        $remaining = max(0, Carbon::parse($session->expires_at)->diffInSeconds(now()));

        return response()->json([
            'session' => $session,
            'remaining_seconds' => $remaining
        ]);
    }
    public function submit(Request $request, $sessionId)
    {
        $session = UserExam::with([
            'answers.question.options',
            'exam.questions.options'
        ])->findOrFail($sessionId);

        if ($session->is_submitted)
            return response()->json(['message'=>'Already submitted'], 400);

        $exam = $session->exam;
        $score = 0;
        $totalMarks = 0;

        DB::transaction(function () use (&$session, &$score, &$totalMarks, $exam) {
            $perMark = $exam->marks_per_question;
            $negMark = $exam->negative_marks_per_question;

            foreach ($session->answers as $answer) {
                $question = $answer->question;

                $correct = $question->options()
                    ->where('is_correct', true)
                    ->pluck('id')
                    ->sort()
                    ->values()
                    ->toArray();

                $selected = $answer->selected_option_ids ?? [];
                sort($selected);

                if ($selected === $correct && !empty($correct))
                    $score += $perMark;
                else
                    $score -= $negMark;

                $totalMarks += $perMark;
            }

            $session->update([
                'is_submitted' => true,
                'score'        => $score,
                'submitted_at' => now()
            ]);
        });

        $pass = $score >= $exam->pass_mark;

        return response()->json([
            'score'            => $score,
            'pass'             => $pass,
            'exam_total_marks' => $totalMarks,
            'session'          => $session->fresh(['answers.question.options'])
        ]);
    }
}
