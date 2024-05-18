<?php

use App\Models\User;

it('has many projects', function () {
    $user = User::factory()->hasProjects(5)->create();
    expect($user->projects()->exists())->toBe(true);
    expect($user->projects()->count())->toBe(5);
});
