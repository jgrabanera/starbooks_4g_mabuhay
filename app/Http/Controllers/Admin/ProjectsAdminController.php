<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\FixedCmsSection;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsAdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render(
            'Admin/Projects',
            FixedCmsSection::payload('lgu-mabuhay-projects'),
        );
    }
}
