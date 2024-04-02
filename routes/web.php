<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::inertia('/editor', 'Editor/Index')->name('editor');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// `guest` middleware is used to prevent authenticated users from accessing the routes
// will redirect to the dashboard if the user is already authenticated
// see Illuminate\Auth\Middleware\RedirectIfAuthenticated
Route::middleware('guest')->group(function () {
    Route::get('register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::post('register', [AuthController::class, 'register']);

    Route::get('login', function () {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    })->name('login');

    Route::post('login', [AuthController::class, 'login']);

    Route::get('forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    })->name('password.request');

    Route::post('forgot-password', [AuthController::class, 'resetLink'])
        ->name('password.email');

    Route::get('reset-password/{token}', [AuthController::class, 'resetView'])
        ->name('password.reset');

    Route::post('reset-password', [AuthController::class, 'resetPassword'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', [AuthController::class, 'verifyEmailPrompt'])
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [AuthController::class, 'sendEmailVerification'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // seems useless
    Route::get('confirm-password', function () {
        return Inertia::render('Auth/ConfirmPassword');
    })->name('password.confirm');

    Route::post('confirm-password', [AuthController::class, 'confirmPassword']);

    Route::put('password', [AuthController::class, 'updatePassword'])->name('password.update');

    Route::post('logout', [AuthController::class, 'logout'])
        ->name('logout');
});
