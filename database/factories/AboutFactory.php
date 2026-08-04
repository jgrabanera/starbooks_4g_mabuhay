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

    public function configure(): static
    {
        return $this->afterCreating(function (About $about): void {
            foreach (array_values($about->priorities_items ?? []) as $index => $priority) {
                $about->priorities()->create([
                    'title' => $priority['title'] ?? '',
                    'description' => $priority['description'] ?? '',
                    'display_order' => $index,
                ]);
            }

            foreach (array_values($about->organization_council_members ?? []) as $index => $member) {
                $about->councilMembers()->create([
                    'name' => $member['name'] ?? '',
                    'role' => $member['role'] ?? 'Council Member',
                    'image' => $member['image'] ?? null,
                    'display_order' => $index,
                ]);
            }

            foreach (array_values($about->lgu_barangays ?? []) as $index => $barangay) {
                $barangayRecord = $about->barangays()->create([
                    'title' => $barangay['title'] ?? '',
                    'reference' => $barangay['reference'] ?? '',
                    'population' => (int) ($barangay['population'] ?? 0),
                    'captain_image' => $barangay['captain_image'] ?? null,
                    'captain_name' => $barangay['officials']['captain'] ?? '',
                    'secretary_name' => $barangay['officials']['secretary'] ?? '',
                    'treasurer_name' => $barangay['officials']['treasurer'] ?? '',
                    'sk_chairperson_name' => $barangay['officials']['skChairperson'] ?? '',
                    'display_order' => $index,
                ]);

                foreach (array_values($barangay['officials']['kagawads'] ?? []) as $kagawadIndex => $kagawad) {
                    $barangayRecord->kagawads()->create([
                        'name' => $kagawad,
                        'display_order' => $kagawadIndex,
                    ]);
                }
            }
        });
    }

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
            'organization_mayor_name' => 'Hon. Edrelusa "Lulu" Calonge',
            'organization_mayor_role' => 'Municipal Mayor',
            'organization_mayor_image' => null,
            'organization_vice_mayor_name' => 'Hon. Joval John B. Samonte',
            'organization_vice_mayor_role' => 'Municipal Vice Mayor',
            'organization_vice_mayor_image' => null,
            'organization_council_members' => [
                ['id' => 'member-1', 'name' => 'Maria Pilar T. Adlaon', 'role' => 'Council Member', 'image' => null],
                ['id' => 'member-2', 'name' => 'Majin V. Andak Sr.', 'role' => 'Council Member', 'image' => null],
            ],
            'lgu_badge' => 'Barangay Reference Collection',
            'lgu_subtitle' => 'Municipal Directory Layout Preview',
            'lgu_title' => 'Municipality of Mabuhay',
            'lgu_logo' => null,
            'lgu_barangays' => [
                [
                    'id' => 1,
                    'title' => 'Abunda',
                    'reference' => 'BRGY-001',
                    'population' => 893,
                    'captain_image' => null,
                    'officials' => [
                        'captain' => 'Juan Dela Cruz',
                        'secretary' => 'Maria Santos',
                        'treasurer' => 'Pedro Reyes',
                        'skChairperson' => 'Angela Flores',
                        'kagawads' => ['Ramon Garcia', 'Liza Mendoza'],
                    ],
                ],
            ],
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
