<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'phone'    => 'required|string|unique:users,phone',
            'role'     => 'in:admin,student',
            'password' => 'required|string|min:4',
        ]);

        $validated['role'] = $validated['role'] ?? 'student';

        $user = User::create([
            'name'     => $validated['name'],
            'phone'    => $validated['phone'],
            'role'     => $validated['role'],
            'password' => $validated['password'],
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'phone'    => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('phone', $request->phone)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'phone' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user->tokens()->delete();

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'    => 'nullable|string|max:255',
            'phone'   => 'nullable|string|unique:users,phone,' . $user->id,
            'email'   => 'nullable|email|unique:users,email,' . $user->id,
            'address' => 'nullable|string',
            'gender'  => 'nullable|in:male,female,other',
            'avatar'  => 'nullable|string', 
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated',
            'user'    => $user
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password'     => 'required|min:4|confirmed', 
        ]);

        $user = $request->user();
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully']);
    }

}
