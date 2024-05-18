<?php

use App\Models\User;

test('login screen can be rendered', function () {
    $response = $this->get('/api/auth/login');

    $response->assertStatus(200);
});

test('users can authenticate using the login screen', function () {
    $user = User::factory()->create();

    $response = $this->post('/api/auth/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    /* FIXME: redirect
     * Although the page is defined in the front-end, the back-end dosen't know it, may be define it in routes/web.php
     *   like https://github.com/codewithtonyofficial/laravel-testing/blob/main/routes/web.php
     */
    // $response->assertRedirect(route('dashboard', absolute: false));
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post('/api/auth/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/api/auth/logout');

    $this->assertGuest();
    // FIXME: redirect
    // $response->assertRedirect('/');
});
