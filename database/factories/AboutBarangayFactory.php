<?php

namespace Database\Factories;

use App\Models\About;
use App\Models\AboutBarangay;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<AboutBarangay>
 */
class AboutBarangayFactory extends Factory
{
    public function definition(): array
    {
        return [
            'about_id' => About::factory(),
            'title' => fake()->city(),
            'reference' => 'BRGY-' . fake()->numerify('###'),
            'population' => fake()->numberBetween(500, 5000),
            'captain_image' => null,
            'captain_name' => fake()->name(),
            'secretary_name' => fake()->name(),
            'treasurer_name' => fake()->name(),
            'sk_chairperson_name' => fake()->name(),
            'display_order' => 0,
        ];
    }
}
