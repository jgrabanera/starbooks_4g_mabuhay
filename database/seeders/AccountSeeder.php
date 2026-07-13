<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        User::factory()->create([
            'name' => 'Jomar Rabanera',
            'email' => 'admin.user@sb4g.com',
            'password' => Hash::make('sb4g@dminPassword'), // Replace with a secure password
        ]);


    }
}
