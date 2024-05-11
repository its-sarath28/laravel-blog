<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::prefix('/v1/auth')->group(function () {
        Route::post('/sign-up', 'signUp');
        Route::post('/sign-in', 'signIn');
    });
});

Route::middleware('isLoggedIn')->group(function () {
    Route::controller(PostController::class)->group(function () {
        Route::prefix('/v1/posts')->group(function () {
            Route::post('/create-post', 'createPost');
            Route::put('/{postId}/update-post', 'updatePost');
            Route::delete('/{postId}/delete-post', 'deletePost');
        });
    });
});

Route::controller(PostController::class)->group(function () {
    Route::get('/v1/posts', 'getAllPosts');
    Route::get('/v1/posts/{postId}', 'getSinglePost');
});

Route::middleware('isLoggedIn')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::prefix('/v1/users')->group(function () {
            Route::get('/profile', 'getUserProfile');
            Route::put('/update-profile', 'updateUserProfile');
            Route::get('/get-user-posts', 'getUserPosts');
        });
    });
});

Route::middleware(['isLoggedIn', 'checkRole:ADMIN'])->group(function () {
    Route::controller(AdminController::class)->group(function () {
        Route::prefix('/v1/admin')->group(function () {
            Route::get('/all-users', 'getAllUsers');
            Route::get('/{userId}/user-posts', 'getUserPosts');
            Route::delete('/{userId}/user-posts/{postId}', 'deleteUserPost');
        });
    });
});
