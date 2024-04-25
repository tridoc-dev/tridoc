<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('session', function (Request $request) {
    return response()->ok($request->user());
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::post('register', [AuthController::class, 'register']);

    Route::post('forgot', [AuthController::class, 'forgotPassword']);
    Route::post('reset', [AuthController::class, 'resetPassword']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('projects')->group(function () {
        Route::get('', [ProjectController::class, 'index']);
        Route::post('', [ProjectController::class, 'store']);
//        Route::get('{project}', [ProjectController::class, 'show']);
//        Route::put('{project}', [ProjectController::class, 'update']);
//        Route::delete('{project}', [ProjectController::class, 'destroy']);
    });

    Route::prefix('editor')->group(function () {
        // Route::post('update', [EditorController::class, 'update']);

        Route::post('update/{project}', [EditorController::class, 'update'])->whereNumber('project');
    });
});
