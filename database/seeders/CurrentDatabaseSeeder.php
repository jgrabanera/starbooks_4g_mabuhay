<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CurrentDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            AccountSeeder::class,
            CategorySeeder::class,
            AboutSeeder::class,
            AboutCouncilMemberSeeder::class,
            AboutLguBarangaySeeder::class,
        ]);
    }
}
