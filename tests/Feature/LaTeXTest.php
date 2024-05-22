<?php

use App\Models\User;

test('latex screen can be rendered', function () {
    $user = User::factory()->hasProjects(1)->create();
    $project = $user->projects[0];
    $response = $this->actingAs($user)->get("/api/action/{$project->id}/latex");

    $response->assertStatus(200);
});

test('a project can be compiled with latex', function () {
    $user = User::factory()->hasProjects(1)->create();
    $project = $user->projects[0];
    // FIXME: How can I trigger it in a test?
    // $response = $this->actingAs($user)->post("/api/action/{$project->id}/latex", ['project' => $project]);

    // $response->assertStatus(200);
});
