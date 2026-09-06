<?php

namespace Database\Seeders;

use App\Models\TourismContent;
use Illuminate\Database\Seeder;

class TourismContentSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            0 => [
                'id' => 1,
                'tab_id' => 'events',
                'title' => 'Turn-Over Ceremony and Inauguration of 100 Modified Shelter Assistance Project Units',
                'slug' => 'turn-over-ceremony-and-inauguration-of-100-modified-shelter-assistance-project-units',
                'description' => 'Turnover of Housing Units to 100 Families in Barangay Taguisian, Mabuhay, Zamboanga Sibugay',
                'image' => '93c607f0-3265-4be0-a630-01422579139d_turn-over-ceremony-and-inauguration-of-100-modified-shelter-assistance-project-units.jpg',
                'pdf' => null,
                'video' => '71739620-4410-4bdb-9277-f41f1be59b00_turn-over-ceremony-and-inauguration-of-100-modified-shelter-assistance-project-units.mp4',
                'is_active' => 1,
                'created_at' => '2026-09-06 16:31:34',
                'updated_at' => '2026-09-06 16:31:34',
            ],
        ];

        TourismContent::query()->upsert($rows, ['id']);
    }
}
