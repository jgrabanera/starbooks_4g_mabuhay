<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CurrentDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AccountSeeder::class,
            CategorySeeder::class,
            AboutSeeder::class,
            AboutPrioritySeeder::class,
            AboutCouncilMemberSeeder::class,
            AboutLguBarangaySeeder::class,
            DostServiceContentSeeder::class,
            TourismContentSeeder::class,
            SocialServiceContentSeeder::class,
            ProjectContentSeeder::class,
            LguResourceContentSeeder::class,
            SubCategorySeeder::class,
        ]);
    }
}
