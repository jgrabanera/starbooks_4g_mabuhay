<?php

namespace Database\Factories;

use App\Models\About;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\About>
 */
class AboutFactory extends Factory
{
    protected $model = About::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'page_key' => 'about-lgu-mabuhay',
            'hero_logo' => 'hero-logo.png',
            'hero_logo_alt' => 'LGU Mabuhay',
            'hero_title' => 'Municipality of Mabuhay',
            'hero_description' => 'A progressive local government unit committed to transparent, efficient, and citizen-centered governance.',
            'overview_badge' => 'Municipality Overview',
            'overview_title' => 'About Mabuhay',
            'overview_paragraphs' => [
                'The Municipality of Mabuhay is a 4th class municipality in the province of Zamboanga Sibugay, Philippines.',
                'The municipal government continues to foster economic growth and improve public services.',
                'LGU Mabuhay aims to make government services more accessible and transparent for every resident.',
            ],
            'overview_highlights' => [
                'Digital service access and public information support',
                'Community-based programs for agriculture and livelihoods',
                'Health, education, and inclusive municipal coordination',
            ],
            'media_badge' => 'Media Feature',
            'media_title' => 'Municipal Video Showcase',
            'media_preview_image' => 'media-preview.jpg',
            'media_video' => null,
            'media_overlay_title' => 'Mabuhay Overview Video',
            'media_overlay_description' => 'Replace this showcase with the official LGU Mabuhay video presentation, tourism reel, or public service introduction when media is ready.',
            'media_footer_left' => 'Video Player Placeholder',
            'media_footer_right' => '16:9 Presentation Area',
            'priorities_title' => 'Governance Priorities',
            'priorities_items' => [
                [
                    'id' => 'priority-1',
                    'title' => 'Good Governance',
                    'description' => 'Transparent decision-making and accountable public service systems.',
                ],
                [
                    'id' => 'priority-2',
                    'title' => 'Inclusive Growth',
                    'description' => 'Community development through agriculture, education, health, and livelihood support.',
                ],
                [
                    'id' => 'priority-3',
                    'title' => 'Digital Access',
                    'description' => 'Improved citizen access to information and municipal programs through digital tools.',
                ],
            ],
        ];
    }
}
