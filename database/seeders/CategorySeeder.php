<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'id' => 1,
                'title' => 'Tourism',
                'slug' => 'tourism',
                'description' => 'Festives & Tourism description',
                'image' => '1785835506_tourism.png',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-08-04 01:25:06',
                'display_order' => 5,
                'is_active' => true,
            ],
            [
                'id' => 2,
                'title' => 'LGU Resources',
                'slug' => 'lgu-resources',
                'description' => 'Awards, budgets, memorandums, and ordinances',
                'image' => '1785835131_social-services.jpg',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-08-04 01:18:51',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'id' => 3,
                'title' => 'About LGU Mabuhay',
                'slug' => 'about-lgu-mabuhay',
                'description' => 'About description',
                'image' => '1785834798_about-lgu-mabuhay.png',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-08-04 01:13:18',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'id' => 4,
                'title' => 'DOST Services',
                'slug' => 'dost-services',
                'description' => null,
                'image' => '1785834895_dost-services.png',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-08-04 01:14:55',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'id' => 5,
                'title' => 'LGU Mabuhay Projects',
                'slug' => 'lgu-mabuhay-projects',
                'description' => null,
                'image' => '1785835046_lgu-mabuhay-projects.png',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-08-04 01:17:26',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'id' => 6,
                'title' => 'Social Services',
                'slug' => 'social-services',
                'description' => 'Social Services',
                'image' => '1785835688_resources.jpg',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-08-04 01:28:08',
                'display_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::query()->updateOrCreate(
                ['id' => $category['id']],
                $category,
            );
        }
    }
}
