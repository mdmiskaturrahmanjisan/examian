<?php

// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use App\Models\Media;
// use Illuminate\Http\Request;

// class MediaController extends Controller
// {
//     public function index()
//     {
//         return Media::all();
//     }

//     public function store(Request $request)
//     {
//         $validated = $request->validate([
//             'mediable_id' => 'required|integer',
//             'mediable_type' => 'required|string',
//             'collection_name' => 'nullable|string',
//             'original_url' => 'required|string',
//         ]);

//         $media = Media::create($validated);
//         return response()->json($media, 201);
//     }

//     public function show($id)
//     {
//         return Media::findOrFail($id);
//     }

//     public function update(Request $request, $id)
//     {
//         $media = Media::findOrFail($id);
//         $media->update($request->only(['collection_name', 'original_url']));
//         return response()->json($media);
//     }

//     public function destroy($id)
//     {
//         Media::findOrFail($id)->delete();
//         return response()->noContent();
//     }
// }





namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    // Fetch all media
    public function index()
    {
        return Media::all();
    }

    // Upload file
    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|image|max:5120', // 5MB max
            'collection_name' => 'nullable|string',
        ]);

        // Store file in public/storage
        $path = $request->file('file')->store('uploads', 'public');

        // Save in DB
        $media = Media::create([
            'original_url' => asset('storage/' . $path),
            'collection_name' => $validated['collection_name'] ?? null,
        ]);

        return response()->json($media, 201);
    }

    // Attach media to any model
    public function attach(Request $request)
    {
        $validated = $request->validate([
            'media_id' => 'required|integer',
            'mediable_id' => 'required|integer',
            'mediable_type' => 'required|string',
        ]);

        $media = Media::findOrFail($validated['media_id']);
        $media->update([
            'mediable_id' => $validated['mediable_id'],
            'mediable_type' => $validated['mediable_type'],
        ]);

        return $media;
    }
}

