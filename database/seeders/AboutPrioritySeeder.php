<?php

namespace Database\Seeders;

use App\Models\AboutPriority;
use Illuminate\Database\Seeder;

class AboutPrioritySeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            0 => [
                'id' => 7,
                'about_id' => 1,
                'title' => 'Transparency',
                'description' => 'Open and honest communication with all stakeholders about government decisions and actions',
                'display_order' => 0,
                'created_at' => '2026-09-05 09:15:10',
                'updated_at' => '2026-09-05 09:15:10',
            ],
            1 => [
                'id' => 8,
                'about_id' => 1,
                'title' => 'Service Excellence',
                'description' => 'Delivering high-quality services that prioritize citizen needs and satisfaction',
                'display_order' => 1,
                'created_at' => '2026-09-05 09:15:10',
                'updated_at' => '2026-09-05 09:15:10',
            ],
            2 => [
                'id' => 9,
                'about_id' => 1,
                'title' => 'Sustainability',
                'description' => 'Fostering economic growth and environmental protection for future generations',
                'display_order' => 2,
                'created_at' => '2026-09-05 09:15:10',
                'updated_at' => '2026-09-05 09:15:10',
            ],
        ];

        AboutPriority::query()->upsert($rows, ['id']);
    }
}
