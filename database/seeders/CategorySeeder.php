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
                'image' => '1788595276_tourism.jpg',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-09-05 08:01:16',
                'display_order' => 5,
                'is_active' => true,
            ],
            [
                'id' => 2,
                'title' => 'LGU Resources',
                'slug' => 'lgu-resources',
                'description' => 'Awards, budgets, memorandums, and ordinances',
                'image' => '1788594799_lgu-resources.jpg',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-09-05 07:53:19',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'id' => 3,
                'title' => 'About LGU Mabuhay',
                'slug' => 'about-lgu-mabuhay',
                'description' => 'About description',
                'image' => '1788594610_about-lgu-mabuhay.png',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-09-05 07:50:10',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'id' => 4,
                'title' => 'DOST Services',
                'slug' => 'dost-services',
                'description' => null,
                'image' => '1788594524_dost-services.png',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-09-05 07:48:44',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'id' => 5,
                'title' => 'LGU Mabuhay Projects',
                'slug' => 'lgu-mabuhay-projects',
                'description' => null,
                'image' => '1788594621_lgu-mabuhay-projects.jpg',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-09-05 07:50:21',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'id' => 6,
                'title' => 'Social Services',
                'slug' => 'social-services',
                'description' => 'Social Services',
                'image' => '1788595662_social-services.jpg',
                'tabs' => null,
                'created_at' => null,
                'updated_at' => '2026-09-05 08:07:42',
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
