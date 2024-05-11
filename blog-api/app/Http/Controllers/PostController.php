<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function createPost(Request $request)
    {

        $request->validate([
            'title' => 'bail|required|min:3',
            'description' => 'bail|required|min:5',
            'image_url' => 'required'
        ]);

        Post::create([
            'creator_id' => $request->current_user_id,
            'title' => $request->title,
            'description' => $request->description,
            'image_url' => $request->image_url
        ]);

        return response()->json([
            'message' => 'Post created successfully'
        ], 200);
    }

    public function getAllPosts()
    {
        $allPosts = Post::with(['user' => function ($query) {
            $query->select('id', 'first_name', 'last_name', 'email');
        }])->orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => $allPosts
        ], 200);
    }

    public function getSinglePost($postId)
    {
        // $post = Post::with('user')->findOrFail($postId);
        $post = Post::with(['user' => function ($query) {
            $query->select('id', 'first_name', 'last_name', 'email');
        }])->findOrFail($postId);

        return response()->json([
            'data' => $post
        ], 200);
    }

    public function updatePost(Request $request,  $postId)
    {
        $post = Post::findOrFail($postId);

        if ($post->creator_id == $request->current_user_id) {
            $post->update([
                'title' => request('title'),
                'description' => request('description'),
                'image_url' => request('image_url')
            ]);

            return response()->json([
                'message' => 'Post updated successfully'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Access denied'
            ], 403);
        }
    }

    public function deletePost(Request $request,  $postId)
    {
        $post = Post::findOrFail($postId);

        if ($post->creator_id == $request->current_user_id) {
            $post->delete();

            return response()->json([
                'message' => 'Post deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Access denied'
            ], 403);
        }
    }
}
