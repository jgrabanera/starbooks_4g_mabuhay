<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin.user@sb4g.com'],
            [
                'name' => 'Jomar Rabanera',
                'email_verified_at' => '2026-09-05 07:32:34',
                'password' => Hash::make('sb4g@dminPassword'),
            ],
        );
    }
}
