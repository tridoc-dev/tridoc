<?php

namespace App\Providers;

use App\Http\Controllers\EditorController;
use App\Models\User;
use App\Services\DockerService;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
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

        $this->app->when(EditorController::class)
            ->needs(Filesystem::class)
            ->give(function () {
                return Storage::disk('sftp');
            });

        $this->app->singleton(DockerService::class, function () {
            return new DockerService();
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
