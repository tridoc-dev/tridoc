<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProjectFile;
use Illuminate\Http\Request;

class EditorController extends Controller
{
    public function update(UpdateProjectFile $request)
    {
        return response()->ok($request->all());
    }
}
