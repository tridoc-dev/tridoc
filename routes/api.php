<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\LaTeXController;
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
    });

    Route::prefix('editor/{project}')->group(function () {
        Route::get('', [EditorController::class, 'list']);

        Route::get('{filename}', [EditorController::class, 'get'])->where('filename', '.*');
        Route::post('{filename}', [EditorController::class, 'put'])->where('filename', '.*');
        Route::put('{filename}', [EditorController::class, 'put'])->where('filename', '.*');
        Route::delete('{filename}', [EditorController::class, 'delete'])->where('filename', '.*');
        Route::patch('{filename}', [EditorController::class, 'rename'])->where('filename', '.*');
    })->whereNumber('project');

    Route::prefix('action/{project}')->group(function () {
        Route::post('latex', [LaTeXController::class, 'compile']);
    })->whereNumber('project');
});
