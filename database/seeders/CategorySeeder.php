<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'tabs' => json_encode([
                    ['id' => 'events-1', 'label' => 'Events'],
                    ['id' => 'festivities-2', 'label' => 'Festivities'],
                    ['id' => 'tourism-sites-3', 'label' => 'Tourism Sites'],
                ]),
                'is_active' => true,
            ],
            [
                'title' => 'Social Services',
                'slug' => 'social-services',
                'description' => 'Social Services',
                'image' => '1785303760_social-services.png',
                'display_order' => 4,
                'tabs' => json_encode([
                    ['id' => 'memorandum-1', 'label' => 'Memorandum'],
                    ['id' => 'ordinance-2', 'label' => 'Ordinance'],
                    ['id' => 'posting-of-awardings-3', 'label' => 'Posting of Awardings'],
                    ['id' => 'nta-budget-per-month-4', 'label' => 'NTA, Budget per month'],
                ]),
                'is_active' => true,
            ],
            [
                'title' => 'About LGU Mabuhay',
                'slug' => 'about-lgu-mabuhay',
                'description' => 'About description',
                'image' => '1783932516_about.png',
                'display_order' => 1,
                'tabs' => json_encode([
                    ['id' => 'about-lgu-mabuhay-1', 'label' => 'About LGU Mabuhay'],
                    ['id' => 'organizational-structure-2', 'label' => 'Organizational Structure'],
                    ['id' => 'contacts-3', 'label' => 'Contacts'],
                ]),
                'is_active' => true,
            ],
            [
                'title' => 'DOST Services',
                'slug' => 'dost-services',
                'description' => null,
                'image' => '1784801251_dost-services.png',
                'display_order' => 2,
                'tabs' => json_encode([
                    ['id' => 'dost-ix-1', 'label' => 'DOST IX'],
                    ['id' => 'programs-services-2', 'label' => 'Programs & Services'],
                    ['id' => 'facebook-posts-3', 'label' => 'Facebook Posts'],
                ]),
                'is_active' => true,
            ],
            [
                'title' => 'LGU Mabuhay Projects',
                'slug' => 'lgu-mabuhay-projects',
                'description' => null,
                'image' => '1783933858_projects.jpg',
                'display_order' => 3,
                'tabs' => json_encode([
                    ['id' => 'completed-1', 'label' => 'Completed'],
                    ['id' => 'on-going-2', 'label' => 'On-Going'],
                    ['id' => 'cancelled-3', 'label' => 'Cancelled'],
                ]),
                'is_active' => true,
            ],
            [
                'title' => 'Resources',
                'slug' => 'resources',
                'description' => null,
                'image' => '1785303724_resources.jpg',
                'display_order' => 6,
                'tabs' => json_encode([
                    ['id' => 'memorandum', 'label' => 'Memorandum'],
                ]),
                'is_active' => true,
            ],
        ];

        Category::insertOrIgnore($categories);
    }
}
