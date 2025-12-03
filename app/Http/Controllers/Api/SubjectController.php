<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
     public function index()
    {
        return Subject::with(['media'])->get();
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
    ]);

    $subject = Subject::create($validated);
    return response()->json($subject->load('media'), 201);
}

    public function show($id)
    {
        return Subject::with(['media'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);
        $subject->update($request->only(['title']));

        return response()->json($subject->load(['media']));
    }

    public function destroy($id)
    {
        Subject::findOrFail($id)->delete();
        return response()->noContent();
    }
}
