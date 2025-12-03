<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    public function index()
    {
        return SubCategory::with(['media', 'category'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
        ]);

        $sub = SubCategory::create($validated);
        return response()->json($sub->load(['media', 'category']), 201);
    }

    public function show($id)
    {
        return SubCategory::with(['media', 'category'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $sub = SubCategory::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
        ]);

        $sub->update($validated);
        return response()->json($sub->load(['media', 'category']));
    }

    public function destroy($id)
    {
        SubCategory::findOrFail($id)->delete();
        return response()->noContent();
    }
}
