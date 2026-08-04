<?php

namespace Database\Factories;

use App\Models\About;
use App\Models\AboutCouncilMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<AboutCouncilMember>
 */
class AboutCouncilMemberFactory extends Factory
{
    public function definition(): array
    {
        return [
            'about_id' => About::factory(),
            'name' => fake()->name(),
            'role' => 'Council Member',
            'image' => null,
            'display_order' => 0,
        ];
    }
}
