<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\Category;
use App\Models\DostServiceContent;
use App\Models\ProjectContent;
use App\Models\ResourceContent;
use App\Models\SocialServiceContent;
use App\Models\TourismContent;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $fixedSectionCounts = [
            'about-lgu-mabuhay' => About::query()->where('page_key', 'about-lgu-mabuhay')->count(),
            'dost-services' => DostServiceContent::query()->count(),
            'lgu-mabuhay-projects' => ProjectContent::query()->count(),
            'resources' => ResourceContent::query()->count(),
            'social-services' => SocialServiceContent::query()->count(),
            'tourism' => TourismContent::query()->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'categories' => Category::query()
                ->withCount('subCategories')
                ->orderByDesc('id')
                ->get(['id', 'title', 'slug', 'description', 'is_active'])
                ->map(fn (Category $category): array => [
                    'id' => $category->id,
                    'title' => $category->title,
                    'slug' => $category->slug,
                    'description' => $category->description,
                    'is_active' => $category->is_active,
                    'content_count' => $fixedSectionCounts[$category->slug] ?? $category->sub_categories_count,
                ]),
        ]);
    }
}
