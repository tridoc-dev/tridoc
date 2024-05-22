<?php

use App\Models\User;

test('project screen can be rendered', function () {
    $user = User::factory()->hasProjects(1)->create();
    $response = $this->actingAs($user)->get('/api/projects');

    $response->assertStatus(200)->assertJsonFragment(['user_id' => $user->id]);
});

test('a new project can be created by a user', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->post('/api/projects', ['name' => 'new_project']);

    $response->assertStatus(200)->assertJsonFragment(['name' => 'new_project', 'user_id' => $user->id]);
});
