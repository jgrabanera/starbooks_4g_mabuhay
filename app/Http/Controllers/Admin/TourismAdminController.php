<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\FixedCmsSection;
use Inertia\Inertia;
use Inertia\Response;

class TourismAdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render(
            'Admin/Tourism',
            FixedCmsSection::payload('tourism'),
        );
    }
}
