<?php

use App\Models\User;

test('session screen can be rendered', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get('/api/session');

    $response->assertStatus(200);
});
