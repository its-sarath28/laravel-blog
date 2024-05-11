<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class checkRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Retrieve the authenticated user
        $user = Auth::guard('sanctum')->user();

        // Log::info('User role: ' . $user->role);
        // Log::info(
        //     'Expected roles: ',
        //     $roles
        // );

        // Check if the user's role is in the allowed roles
        if (in_array($user->role, $roles)) {
            return $next($request);
        } else {
            return response()->json([
                'message' => 'Access denied'
            ], 403);
        }
    }
}
