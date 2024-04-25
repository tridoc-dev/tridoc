<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProjectFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EditorController extends Controller
{
    public function update(UpdateProjectFile $request)
    {
        $disk = Storage::disk('sftp');
        $disk->makeDirectory('storage/projects/' . $request->project->id);
        $disk->put('storage/projects/' . $request->project->id . '/main.tex', $request->content);
        return response()->ok($disk->allFiles('storage/projects/' . $request->project->id));
    }
}
