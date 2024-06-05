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

        $dirs = $disk->allDirectories($path);
        foreach ($dirs as $dir) {
            $trimmed = str_replace($path . '/', '', $dir);
            $levels = explode('/', $trimmed);

            $current = &$result;
            foreach ($levels as $level) {
                if (!isset($current[$level])) {
                    $current[$level] = [];
                }

                $current = &$current[$level];
            }
        }

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
            if ($request->has('directory')) {
                $disk->makeDirectory($path);
                return response()->ok();
            }

            if ($request->hasFile('upload')) {
                $disk->put($path, $request->file('upload')->get());
            } else if ($request->has('content')) {
                $disk->put($path, $request->input('content') ?? "");
            } else {
                return response()->error('No content provided');
            }

            return response()->ok($disk->size($path));
        } catch (\Throwable $th) {
            return response()->error($th->getMessage());
        }
    }

    public function delete(UpdateProjectFileRequest $request, Filesystem $disk)
    {
        $path = 'storage/projects/' . $request->project->id . '/' . $request->filename;

        try {
            $disk->delete($path);

            return response()->ok();
        } catch (\Throwable $th) {
            return response()->error($th->getMessage());
        }
    }

    public function rename(UpdateProjectFileRequest $request, Filesystem $disk)
    {
        $path = 'storage/projects/' . $request->project->id . '/' . $request->filename;
        $newFilename = $request->input('newFilename');
        $newPath = 'storage/projects/' . $request->project->id . '/' . $newFilename;

        try {
            $disk->move($path, $newPath);

            return response()->ok();
        } catch (\Throwable $th) {
            return response()->error($th->getMessage());
        }
    }
}
