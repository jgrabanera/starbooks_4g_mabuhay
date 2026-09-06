<?php

namespace Database\Seeders;

use App\Models\SocialServiceContent;
use Illuminate\Database\Seeder;

class SocialServiceContentSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            0 => [
                'id' => 1,
                'tab_id' => 'social-services',
                'title' => 'Posting of San Roque Fire Sub-Station Official Hotline for Emergency Response',
                'slug' => 'posting-of-san-roque-fire-sub-station-official-hotline-for-emergency-response',
                'description' => 'Posting of San Roque Fire Sub-Station Official Hotline for Emergency Response',
                'image' => '943f3701-d5fa-4d73-8dd9-85c2b3cd6133_posting-of-san-roque-fire-sub-station-official-hotline-for-emergency-response.jpg',
                'pdf' => '16fe5ac4-0881-40df-b497-743a5b77f55e_posting-of-san-roque-fire-sub-station-official-hotline-for-emergency-response.pdf',
                'video' => null,
                'is_active' => 1,
                'created_at' => '2026-09-06 16:51:03',
                'updated_at' => '2026-09-06 16:51:03',
            ],
        ];

        SocialServiceContent::query()->upsert($rows, ['id']);
    }
}
