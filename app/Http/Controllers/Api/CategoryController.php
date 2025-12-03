<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::with(['media'])->get();
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
    ]);

    $category = Category::create($validated);
    return response()->json($category->load('media'), 201);
}

    public function show($id)
    {
        return Category::with(['media'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->only(['title']));

        return response()->json($category->load(['media']));
    }

    public function destroy($id)
    {
        Category::findOrFail($id)->delete();
        return response()->noContent();
    }
}
