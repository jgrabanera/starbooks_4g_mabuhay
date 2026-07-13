<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'categories' => Category::query()
                ->orderByDesc('id')
                ->get(['id', 'title', 'description', 'is_active']),
        ]);
    }
}
