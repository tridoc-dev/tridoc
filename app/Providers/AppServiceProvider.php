<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (User $user, string $token) {
            return config('app.url') . '/auth/reset/' . $token . '?email=' . urlencode($user->email);
        });

        Response::macro('ok', function (mixed $value = null) {
            return Response::json([
                'data' => $value,
            ]);
        });

        Response::macro('error', function (string $message, int $code = 400) {
            return Response::json([
                'message' => $message,
            ], $code);
        });
    }
}
