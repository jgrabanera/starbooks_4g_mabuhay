<?php

namespace Database\Factories;

use App\Models\AboutBarangay;
use App\Models\AboutBarangayKagawad;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<AboutBarangayKagawad>
 */
class AboutBarangayKagawadFactory extends Factory
{
    public function definition(): array
    {
        return [
            'about_barangay_id' => AboutBarangay::factory(),
            'name' => fake()->name(),
            'display_order' => 0,
        ];
    }
}
