<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Exam;

class ExamController extends Controller
{
    public function index()
    {
        return Exam::with(['subjects', 'topics'])->get();
    }
    public function show($id)
    {
        return Exam::with([
            'subjects',
            'topics',
            'questions.options'
        ])->findOrFail($id);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'duration_minutes' => 'required|integer|min:1',
            'pass_mark' => 'nullable|numeric|min:0',
            'total_questions' => 'nullable|integer|min:0',
            'marks_per_question' => 'required|numeric',
            'negative_marks_per_question' => 'required|numeric|min:0',

            'subject_ids' => 'array|required',
            'subject_ids.*' => 'integer|exists:subjects,id',

            'topic_ids' => 'array|required',
            'topic_ids.*' => 'integer|exists:topics,id',
        ]);
        $examData = collect($validated)->except(['subject_ids', 'topic_ids'])->toArray();
        $exam = Exam::create($examData);
        $exam->subjects()->sync($validated['subject_ids']);
        $exam->topics()->sync($validated['topic_ids']);

        return response()->json(
            $exam->load(['subjects', 'topics']),
            201
        );
    }
    public function update(Request $request, $id)
    {
        $exam = Exam::findOrFail($id);
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'duration_minutes' => 'sometimes|required|integer|min:1',
            'pass_mark' => 'nullable|numeric|min:0',
            'total_questions' => 'nullable|integer|min:0',
            'marks_per_question' => 'sometimes|required|numeric',
            'negative_marks_per_question' => 'sometimes|required|numeric|min:0',
            'subject_ids' => 'array',
            'subject_ids.*' => 'integer|exists:subjects,id',
            'topic_ids' => 'array',
            'topic_ids.*' => 'integer|exists:topics,id',
        ]);
        $examData = collect($validated)->except(['subject_ids', 'topic_ids'])->toArray();
        $exam->update($examData);
        if ($request->has('subject_ids')) {
            $exam->subjects()->sync($validated['subject_ids'] ?? []);
        }
        if ($request->has('topic_ids')) {
            $exam->topics()->sync($validated['topic_ids'] ?? []);
        }
        return response()->json($exam->load(['subjects', 'topics']));
    }
    public function destroy($id)
    {
        $exam = Exam::findOrFail($id);
        $exam->delete();
        return response()->noContent();
    }
}
