<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Client/Categories');
    }

    public function getData(Request $request)
    {
        $category = Category::orderBy('id', 'desc')->get();

        return response()->json($category);
    }
    public function store(Request $request)
    {
        $payload = $request->validate([
            'name' => ['required', 'string', 'max:100'],
        ]);

        $category = Category::create([
            'name' => trim($payload['name']),
        ]);

        $request->session()->put('username', $payload['name']);

        return response()->json([
            'message' => 'Category recorded successfully.',
            'category' => $category,
        ], 201);
    }


}
