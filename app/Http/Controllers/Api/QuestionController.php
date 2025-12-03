<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
// use App\Models\QuestionOption;

class QuestionController extends Controller
{
    public function index(Request $request) {
        // optional filter by exam/subject/topic
        $query = Question::with('options');
        if ($request->filled('exam_id')) $query->where('exam_id', $request->exam_id);
        return $query->paginate(20);
    }

    public function show($id) {
        return Question::with('options')->findOrFail($id);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'exam_id'=>'nullable|integer|exists:exams,id',
            'question_text'=>'required|string',
            'options'=>'required|array|min:1',
            'options.*.option_text'=>'required|string',
            'options.*.is_correct'=>'required|boolean',
        ]);

        $question = Question::create([
            'exam_id'=>$validated['exam_id'] ?? null,
            'question_text'=>$validated['question_text'],
        ]);

        foreach ($validated['options'] as $opt) {
            $question->options()->create([
                'option_text'=>$opt['option_text'],
                'is_correct'=>$opt['is_correct'],
            ]);
        }

        return response()->json($question->load('options'), 201);
    }

    public function update(Request $request, $id) {
        $question = Question::findOrFail($id);
        $validated = $request->validate([
            'question_text'=>'sometimes|required|string',
            'options'=>'nullable|array',
            'options.*.id'=>'nullable|integer|exists:question_options,id',
            'options.*.option_text'=>'required_with:options|string',
            'options.*.is_correct'=>'required_with:options|boolean',
        ]);

        if (isset($validated['question_text'])) {
            $question->update(['question_text'=>$validated['question_text']]);
        }

        if (!empty($validated['options'])) {
            // naive approach: replace options — for production you may implement diffs
            $question->options()->delete();
            foreach ($validated['options'] as $opt) {
                $question->options()->create([
                    'option_text'=>$opt['option_text'],
                    'is_correct'=>$opt['is_correct'],
                ]);
            }
        }

        return response()->json($question->load('options'));
    }

    public function destroy($id) {
        Question::findOrFail($id)->delete();
        return response()->noContent();
    }
}
