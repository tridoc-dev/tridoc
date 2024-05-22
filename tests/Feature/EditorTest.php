<?php

use App\Models\User;

test('Editor screen can be rendered', function () {
    $user = User::factory()->hasProjects(1)->create();
    $project = $user->projects[0];

    $response = $this->actingAs($user)->get("/api/editor/{$project->id}");

    $response->assertStatus(200);
});

test('A new file content can be put into a project', function () {
    $user = User::factory()->hasProjects(1)->create();
    $project = $user->projects[0];

    $filename = 'new_file';
    $content = 'new file content';
    $response = $this->actingAs($user)->put("/api/editor/{$project->id}/{$filename}", [
        'project' => $project,
        'filename' => $filename,
        'content' => $content
    ]);

    $response->assertStatus(200);
});

test('An existing file in a project can be opened', function () {
    $user = User::factory()->hasProjects(1)->create();
    $project = $user->projects[0];

    $filename = 'new_file';
    $response = $this->actingAs($user)->get("/api/editor/{$project->id}/{$filename}");

    $response->assertStatus(200)->assertContent('new file content');
})->depends('A new file content can be put into a project');

test('An existing file can be put into a project', function () {
    $user = User::factory()->hasProjects(1)->create();
    $project = $user->projects[0];

    $filename = 'new_file';
    $response = $this->actingAs($user)->put("/api/editor/{$project->id}/{$filename}", [
        'project' => $project,
        'filename' => $filename,
        'file' => $filename
    ]);

    $response->assertStatus(200);
})->depends('A new file content can be put into a project');

test('An existing file can be deleted from a project', function () {
    $user = User::factory()->hasProjects(1)->create();
    $project = $user->projects[0];

    $filename = 'new_file';
    $response = $this->actingAs($user)->delete("/api/editor/{$project->id}/{$filename}");

    $response->assertStatus(200);
})->depends('A new file content can be put into a project');

test('A new directory can be put into a project', function () {
    $user = User::factory()->hasProjects(1)->create();
    $project = $user->projects[0];

    $directory = 'new_directory';
    $response = $this->actingAs($user)->put("/api/editor/{$project->id}/{$directory}", [
        'project' => $project,
        'filename' => $directory,
        'directory' => $directory
    ]);

    $response->assertStatus(200);
});

test('An existing directory can be deleted from a project', function () {
    $user = User::factory()->hasProjects(1)->create();
    $project = $user->projects[0];

    $filename = 'new_directory';
    $response = $this->actingAs($user)->delete("/api/editor/{$project->id}/{$filename}");

    $response->assertStatus(200);
})->depends('A new directory can be put into a project');
