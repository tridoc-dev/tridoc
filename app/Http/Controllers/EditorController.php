<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProjectFile;
use Illuminate\Contracts\Filesystem\Filesystem;

class EditorController extends Controller
{
    public function update(UpdateProjectFile $request, Filesystem $disk)
    {
        $disk->makeDirectory('storage/projects/' . $request->project->id);
        $disk->put('storage/projects/' . $request->project->id . '/main.tex', $request->input('content'));
        return response()->ok($disk->allFiles('storage/projects/' . $request->project->id));
    }
}
