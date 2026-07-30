<?php

namespace App\Support;

use App\Models\Category;
use App\Models\SubCategory;

class FixedCmsSection
{
    /**
     * @return array<string, array{route: string}>
     */
    public static function definitions(): array
    {
        return [
            'about-lgu-mabuhay' => [
                'route' => 'admin.about.index',
            ],
            'dost-services' => [
                'route' => 'admin.dost-services.index',
            ],
            'lgu-mabuhay-projects' => [
                'route' => 'admin.projects.index',
            ],
            'social-services' => [
                'route' => 'admin.social-services.index',
            ],
            'tourism' => [
                'route' => 'admin.tourism.index',
            ],
            'resources' => [
                'route' => 'admin.resources.index',
            ],
        ];
    }

    /**
     * @return array{sectionCategory: ?Category, contents: \Illuminate\Database\Eloquent\Collection<int, SubCategory>}
     */
    public static function payload(string $slug): array
    {
        $sectionCategory = Category::query()
            ->where('slug', $slug)
            ->first(['id', 'title', 'slug']);

        return [
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
                : collect(),
        ];
    }

    public static function resolveAdminIndexRoute(?string $slug): string
    {
        return self::definitions()[$slug]['route'] ?? 'admin.categories.index';
    }
}
