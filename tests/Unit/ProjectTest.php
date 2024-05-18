<?php

use App\Models\Project;

it('belongs to user', function () {
    $project = Project::factory()->create();
    expect($project->user()->exists())->toBe(true);
});
