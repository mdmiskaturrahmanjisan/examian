<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
     public function index()
    {
        return Topic::with(['media', 'subject'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subject_id' => 'required|integer|exists:subjects,id',
        ]);

        $topic = Topic::create($validated);
        return response()->json($topic->load(['media', 'subject']), 201);
    }

    public function show($id)
    {
        return Topic::with(['media', 'subject'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $topic = Topic::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subject_id' => 'required|integer|exists:subjects,id',
        ]);

        $topic->update($validated);
        return response()->json($topic->load(['media', 'subject']));
    }

    public function destroy($id)
    {
        Topic::findOrFail($id)->delete();
        return response()->noContent();
    }
}
