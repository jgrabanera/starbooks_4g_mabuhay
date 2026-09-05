<?php

namespace Database\Seeders;

use App\Models\AboutPriority;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class AboutPrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (! Schema::hasTable('about_priorities')) {
            return;
        }

        $priorities = [
            [
                'id' => 7,
                'about_id' => 1,
                'title' => 'Transparency',
                'description' => 'Open and honest communication with all stakeholders about government decisions and actions',
                'display_order' => 0,
                'created_at' => '2026-09-05 09:15:10',
                'updated_at' => '2026-09-05 09:15:10',
            ],
            [
                'id' => 8,
                'about_id' => 1,
                'title' => 'Service Excellence',
                'description' => 'Delivering high-quality services that prioritize citizen needs and satisfaction',
                'display_order' => 1,
                'created_at' => '2026-09-05 09:15:10',
                'updated_at' => '2026-09-05 09:15:10',
            ],
            [
                'id' => 9,
                'about_id' => 1,
                'title' => 'Sustainability',
                'description' => 'Fostering economic growth and environmental protection for future generations',
                'display_order' => 2,
                'created_at' => '2026-09-05 09:15:10',
                'updated_at' => '2026-09-05 09:15:10',
            ],
        ];

        foreach ($priorities as $priority) {
            AboutPriority::query()->updateOrCreate(
                ['id' => $priority['id']],
                $priority,
            );
        }
    }
}
