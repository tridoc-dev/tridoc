<?php

use App\Http\Controllers\AuthController;
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
