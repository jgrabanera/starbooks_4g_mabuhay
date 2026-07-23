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
                'title' => 'Festives & Tourism',
                'slug' => 'festives-tourism',
                'description' => 'Festives & Tourism description',
                'image' => '1783931169_tourism.jpg',
                'display_order' => 1,
                'tabs' => json_encode([
                    ['id' => 'events-1', 'label' => 'Events'],
                    ['id' => 'festivities-2', 'label' => 'Festivities'],
                    ['id' => 'tourism-sites-3', 'label' => 'Tourism Sites'],
                ]),
                'is_active' => true,
            ],
            [
                'title' => 'Resources',
                'slug' => 'resources',
                'description' => 'Resources description',
                'image' => '1783931258_local-governance.png',
                'display_order' => 2,
                'tabs' => json_encode([
                    ['id' => 'memorandum-1', 'label' => 'Memorandum'],
                    ['id' => 'ordinance-2', 'label' => 'Ordinance'],
                    ['id' => 'posting-of-awardings-3', 'label' => 'Posting of Awardings'],
                    ['id' => 'nta-budget-per-month-4', 'label' => 'NTA, Budget per month'],
                ]),
                'is_active' => true,
            ],
            [
                'title' => 'About',
                'slug' => 'about',
                'description' => 'About description',
                'image' => '1783932516_about.png',
                'display_order' => 3,
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
                'image' => '1783933801_dost-services.jpg',
                'display_order' => 4,
                'tabs' => json_encode([
                    ['id' => 'dost-ix-1', 'label' => 'DOST IX'],
                    ['id' => 'programs-services-2', 'label' => 'Programs & Services'],
                    ['id' => 'facebook-posts-3', 'label' => 'Facebook Posts'],
                ]),
                'is_active' => true,
            ],
            [
                'title' => 'Projects',
                'slug' => 'projects',
                'description' => null,
                'image' => '1783933858_projects.jpg',
                'display_order' => 5,
                'tabs' => json_encode([
                    ['id' => 'completed-1', 'label' => 'Completed'],
                    ['id' => 'on-going-2', 'label' => 'On-Going'],
                    ['id' => 'cancelled-3', 'label' => 'Cancelled'],
                ]),
                'is_active' => true,
            ],
        ];

        Category::insertOrIgnore($categories);
    }
}
