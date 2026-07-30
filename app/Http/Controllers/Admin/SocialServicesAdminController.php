<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubCategory;
use Inertia\Inertia;
use Inertia\Response;

class SocialServicesAdminController extends Controller
{
    public function index(): Response
    {
        $sectionCategory = Category::query()
            ->where('slug', 'social-services')
            ->first(['id', 'title', 'slug']);

        return Inertia::render('Admin/SocialServices', [
            'sectionCategory' => $sectionCategory,
            'contents' => $sectionCategory
                ? SubCategory::query()
                    ->where('category_id', $sectionCategory->id)
                    ->orderByDesc('id')
                    ->get([
                        'id',
                        'category_id',
                        'tab_id',
                        'title',
                        'slug',
                        'description',
                        'image',
                        'pdf',
                        'is_active',
                    ])
                : [],
        ]);
    }
}
