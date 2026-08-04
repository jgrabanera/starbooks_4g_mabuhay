<?php

namespace Database\Factories;

use App\Models\About;
use App\Models\AboutPriority;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<AboutPriority>
 */
class AboutPriorityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'about_id' => About::factory(),
            'title' => fake()->sentence(3),
            'description' => fake()->sentence(10),
            'display_order' => 0,
        ];
    }
}
