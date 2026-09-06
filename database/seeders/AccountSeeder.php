<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            0 => [
                'id' => 1,
                'name' => 'SB4G Admin',
                'email' => 'admin.user@sb4g.com',
                'email_verified_at' => '2026-09-05 07:32:34',
                'password' => '$2y$12$IgyviFQySA11CmA1ktWtMeJk.MQJyDN.bXl4SWLJNvJt6PJ.71DzK',
                'remember_token' => null,
                'created_at' => '2026-09-05 12:32:30',
                'updated_at' => '2026-09-05 12:32:30',
            ],
        ];

        User::query()->upsert($rows, ['id']);
    }
}
