<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectCreateRequest;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = auth()->user()->projects()->orderByDesc('updated_at')->with('user')->get();

        return response()->ok($projects);
    }

    public function store(ProjectCreateRequest $request): JsonResponse
    {
        $project = new Project($request->validated());
        $project->user()->associate(request()->user());
        $project->save();

        return response()->ok($project);
    }
}
