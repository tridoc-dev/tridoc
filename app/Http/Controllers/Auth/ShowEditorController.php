<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ShowEditorController extends Controller {
    public function show(): Response {
        return Inertia::render('Editor/Editor');
    }
}
