<?php

test('registration screen can be rendered', function () {
    $response = $this->get('/api/auth/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post('/api/auth/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    // FIXME: redirect
    // $response->assertRedirect(route('dashboard', absolute: false));
});
