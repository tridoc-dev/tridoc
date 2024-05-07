<?php

namespace App\Http\Controllers;

use App\Http\Requests\Editor\GetProjectFileRequest;
use App\Http\Requests\Editor\ViewProjectRequest;
use App\Http\Requests\Editor\UpdateProjectFileRequest;
use Illuminate\Contracts\Filesystem\Filesystem;

class EditorController extends Controller
{
    public function list(ViewProjectRequest $request, Filesystem $disk)
    {
        $path = 'storage/projects/' . $request->project->id;
        $list = $disk->allFiles($path);
        $result = [];

        array_map(
            function ($file) use ($path, &$result) {
                $trimmed = str_replace($path . '/', '', $file);
                $levels = explode('/', $trimmed);

                if (count($levels) === 1) {
                    $result['.'][] = $trimmed;
                    return;
                }

                $current = &$result;
                foreach ($levels as $key => $level) {
                    if ($key === array_key_last($levels)) {
                        $current['.'][] = $level;
                        break;
                    }

                    if (!isset($current[$level])) {
                        $current[$level] = [];
                    }

                    $current = &$current[$level];
                }
            },
            $list
        );

        return response()->ok($result);
    }

    public function get(GetProjectFileRequest $request, Filesystem $disk)
    {
        $path = 'storage/projects/' . $request->project->id . '/' . $request->filename;

        try {
            $content = $disk->get($path);

            return response($content);
        } catch (\Throwable $th) {
            return response()->error($th->getMessage());
        }
    }

    public function put(UpdateProjectFileRequest $request, Filesystem $disk)
    {
        $path = 'storage/projects/' . $request->project->id . '/' . $request->filename;
        $disk->makeDirectory(dirname($path));

        try {
            if ($request->hasFile('file')) {
                $disk->put($path, $request->file('file'));
            } else if ($request->has('content')) {
                $disk->put($path, $request->input('content'));
            }

            return response()->ok($disk->size($path));
        } catch (\Throwable $th) {
            return response()->error($th->getMessage());
        }
    }
}
