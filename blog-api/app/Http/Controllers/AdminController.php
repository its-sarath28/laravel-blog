<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
// use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    public function getAllUsers()
    {
        $allUsers = User::orderBy('first_name', 'asc')->get();
        // $allUsers = User::get();

        // Log::info('All users: ' . $allUsers);

        return response()->json([
            'data' => $allUsers
        ]);
    }

    public function getUserPosts($userId)
    {

        $userPosts = Post::where('creator_id', $userId)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $userPosts
        ], 200);
    }

    public function deleteUserPost($userId, $postId)
    {
        $userPost = Post::where('creator_id', $userId)->where('id', $postId)->first();

        if (!$userPost) {
            return response()->json([
                'message' => 'Post not found'
            ], 404);
        }

        $userPost->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ], 200);
    }
}
