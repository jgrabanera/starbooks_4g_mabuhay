<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categories = [
            [
                'title' => 'Tourism',
                'slug' => 'tourism',
                'description' => 'Festives & Tourism description',
                'image' => '1783931169_tourism.jpg',
                'display_order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Social Services',
                'slug' => 'social-services',
                'description' => 'Social Services',
                'image' => '1785303760_social-services.png',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'About LGU Mabuhay',
                'slug' => 'about-lgu-mabuhay',
                'description' => 'About description',
                'image' => '1783932516_about.png',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'DOST Services',
                'slug' => 'dost-services',
                'description' => null,
                'image' => '1784801251_dost-services.png',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'LGU Mabuhay Projects',
                'slug' => 'lgu-mabuhay-projects',
                'description' => null,
                'image' => '1783933858_projects.jpg',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Resources',
                'slug' => 'resources',
                'description' => null,
                'image' => '1785303724_resources.jpg',
                'display_order' => 6,
                'is_active' => true,
            ],
        ];

        Category::insertOrIgnore($categories);
    }
}
