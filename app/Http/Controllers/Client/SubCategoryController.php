<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubCategory;
use Inertia\Inertia;

class SubCategoryController extends Controller
{
    public function index(string $slug)
    {
        $category = Category::where("slug", $slug)->firstOrFail();
        $subCategories = SubCategory::where("category_id", $category->id)
            ->where("is_active", 1)
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Client/SubCategories', [
            'subCategories' => $subCategories,
            'category' => $category,
        ]);
    }
}
