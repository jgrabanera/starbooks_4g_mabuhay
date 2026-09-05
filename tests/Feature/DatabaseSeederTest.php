<?php

namespace Tests\Feature;

use Database\Seeders\CurrentDatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DatabaseSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_current_database_seeder_restores_the_saved_data_and_is_idempotent(): void
    {
        $this->seed(CurrentDatabaseSeeder::class);
        $this->seed(CurrentDatabaseSeeder::class);

        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseCount('categories', 6);
        $this->assertDatabaseCount('abouts', 1);
        $this->assertDatabaseCount('about_council_members', 8);
        $this->assertDatabaseCount('about_barangays', 18);
        $this->assertDatabaseCount('about_barangay_kagawads', 126);

        $this->assertDatabaseHas('categories', [
            'id' => 1,
            'image' => '1788595276_tourism.jpg',
        ]);
        $this->assertDatabaseHas('users', [
            'email' => 'admin.user@sb4g.com',
            'email_verified_at' => '2026-09-05 07:32:34',
        ]);
    }
}
