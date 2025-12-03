<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return Course::with(['media', 'user', 'category'])->get();

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'nullable|required|string',
            'category_id' => 'nullable|integer|exists:categories,id',
            'batch_id' => 'nullable|integer|exists:batches,id',
            'exam_id' => 'nullable|integer|exists:exams,id',
            'title' => 'required|string|max:255',
            'details' => 'required|string',
            'new_price' => 'required|numeric|min:0',
            'old_price' => 'required|numeric|min:0',
            'status' => 'integer',
            'is_free' => 'boolean',
            'user_id' => 'nullable|integer',
        ]);

        $course = Course::create($validated);
        return response()->json($course->load(['media', 'user']), 201);
    }

    public function show($id)
    {
        return Course::with(['media', 'user'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        $course->update($request->all());
        return response()->json($course->load(['media', 'user']));
    }

    public function destroy($id)
    {
        Course::findOrFail($id)->delete();
        return response()->noContent();
    }
}
