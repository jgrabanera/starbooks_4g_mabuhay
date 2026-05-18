<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class DashboardController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function getData(Request $request)
    {
        $category = Category::orderBy('id', 'desc')->get();

        return response()->json($category);
    }

}
