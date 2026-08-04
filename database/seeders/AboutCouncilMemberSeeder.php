<?php

namespace Database\Seeders;

use App\Models\AboutCouncilMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class AboutCouncilMemberSeeder extends Seeder
{
    public function run(): void
    {
        if (! Schema::hasTable('about_council_members')) {
            return;
        }

        $members = [
            [
                'id' => 1,
                'about_id' => 1,
                'name' => 'Maria Pilar T. Adlaon',
                'role' => 'Council Member',
                'image' => '1785840758_organization-council-member-1.png',
                'display_order' => 0,
                'created_at' => '2026-08-04 02:23:30',
                'updated_at' => '2026-08-04 02:52:38',
            ],
            [
                'id' => 2,
                'about_id' => 1,
                'name' => 'Hon. Majin V. Andak',
                'role' => 'Council Member',
                'image' => '1785840758_organization-council-member-2.png',
                'display_order' => 1,
                'created_at' => '2026-08-04 02:23:30',
                'updated_at' => '2026-08-04 02:52:38',
            ],
            [
                'id' => 3,
                'about_id' => 1,
                'name' => 'Alvarez H. Dammang',
                'role' => 'Council Member',
                'image' => '1785840758_organization-council-member-3.png',
                'display_order' => 2,
                'created_at' => '2026-08-04 02:23:30',
                'updated_at' => '2026-08-04 02:52:38',
            ],
            [
                'id' => 4,
                'about_id' => 1,
                'name' => 'Hon. Alvin D. Hassan',
                'role' => 'Council Member',
                'image' => '1785840758_organization-council-member-4.png',
                'display_order' => 3,
                'created_at' => '2026-08-04 02:23:30',
                'updated_at' => '2026-08-04 02:52:38',
            ],
            [
                'id' => 5,
                'about_id' => 1,
                'name' => 'Hon. Rey T. Omamalin',
                'role' => 'Council Member',
                'image' => '1785840758_organization-council-member-5.png',
                'display_order' => 4,
                'created_at' => '2026-08-04 02:23:30',
                'updated_at' => '2026-08-04 02:52:38',
            ],
            [
                'id' => 6,
                'about_id' => 1,
                'name' => 'Hon. Julhisan "Isan" H. Buhali',
                'role' => 'Council Member',
                'image' => null,
                'display_order' => 5,
                'created_at' => '2026-08-04 02:23:30',
                'updated_at' => '2026-08-04 02:49:17',
            ],
            [
                'id' => 7,
                'about_id' => 1,
                'name' => 'Hon. Bhong Anjawang',
                'role' => 'Council Member',
                'image' => null,
                'display_order' => 6,
                'created_at' => '2026-08-04 02:23:30',
                'updated_at' => '2026-08-04 02:49:32',
            ],
            [
                'id' => 15,
                'about_id' => 1,
                'name' => 'Hon. Dario S. Alforque',
                'role' => 'Council Member',
                'image' => '1785840758_organization-council-member-8.png',
                'display_order' => 7,
                'created_at' => '2026-08-04 02:52:38',
                'updated_at' => '2026-08-04 02:52:38',
            ],
        ];

        foreach ($members as $member) {
            AboutCouncilMember::query()->updateOrCreate(
                ['id' => $member['id']],
                $member,
            );
        }
    }
}
