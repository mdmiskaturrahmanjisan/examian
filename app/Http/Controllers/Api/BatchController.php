<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Batch;
use Illuminate\Http\Request;

class BatchController extends Controller
{
    public function index()
    {
        return Batch::with(['media', 'user'])->get();

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'user_id' => 'nullable|integer',
        ]);

        $batch = Batch::create($validated);
        return response()->json($batch->load(['media', 'user']), 201);
    }

    public function show($id)
    {
        return Batch::with(['media', 'user'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $batch = Batch::findOrFail($id);
        $batch->update($request->all());
        return response()->json($batch->load(['media', 'user']));
    }

    public function destroy($id)
    {
        Batch::findOrFail($id)->delete();
        return response()->noContent();
    }
}
