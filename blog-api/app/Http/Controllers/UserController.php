<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getUserProfile(Request $request)
    {
        $user = User::findOrFail($request->current_user_id);

        return response()->json([
            'data' => $user
        ], 200);
    }

    public function updateUserProfile(Request $request)
    {
        $user = User::findOrFail($request->current_user_id);

        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'required|min:6|confirmed',
        ]);

        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Profile updated successfully'
        ], 200);
    }

    public function getUserPosts(Request $request)
    {
        $user = User::findOrFail($request->current_user_id);

        $userPosts = Post::where('creator_id', $user->id)->with('user')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $userPosts
        ]);
    }
}
