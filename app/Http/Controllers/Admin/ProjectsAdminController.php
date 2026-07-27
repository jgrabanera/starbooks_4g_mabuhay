<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;

class ProjectsAdminController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Admin/Projects');
    }
}


