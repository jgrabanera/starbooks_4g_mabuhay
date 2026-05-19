<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubCategory;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    //
    public function index($slug)
    {
        $category = Category::where("slug", $slug)->first();
        $subCategories = SubCategory::where("category_id", $category->id)
            ->where("is_active", 1)
            ->get();

        // return $category;

        return Inertia::render('Client/SubCategories', [
            'subCategories' => $subCategories,
            'category' => $category,
        ]);
    }
    public function getData($slug)
    {
        $subCategories = SubCategory::where('category_slug', $slug)->get();

        return Inertia::render('Client/SubCategories', [
            'subCategories' => $subCategories,
        ]);
    }

}

