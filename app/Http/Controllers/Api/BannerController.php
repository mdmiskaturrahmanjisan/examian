<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function index()
    {
        return Banner::with('media')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'related_id' => 'nullable|integer',
        ]);

        $banner = Banner::create($validated);

        return response()->json($banner->load('media'), 201);
    }

    public function show($id)
    {
        return Banner::with('media')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);
        $banner->update($request->only(['type', 'related_id']));
        return response()->json($banner->load('media'));
    }

    public function destroy($id)
    {
        Banner::findOrFail($id)->delete();
        return response()->noContent();
    }
}
