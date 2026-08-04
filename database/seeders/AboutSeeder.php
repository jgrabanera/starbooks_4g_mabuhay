<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        About::query()->updateOrCreate(
            ['page_key' => 'about-lgu-mabuhay'],
            [
                'hero_logo' => '1783932516_about.png',
                'hero_logo_alt' => 'LGU Mabuhay',
                'hero_title' => 'Municipality of Mabuhay',
                'hero_description' => 'A progressive local government unit committed to transparent, efficient, and citizen-centered governance.',
                'overview_badge' => 'Municipality Overview',
                'overview_title' => 'About Mabuhay',
                'overview_paragraphs' => [
                    'The Municipality of Mabuhay is a 4th class municipality in the province of Zamboanga Sibugay, Philippines. Known for its rich cultural heritage and agricultural community, Mabuhay is committed to progressive governance and sustainable local development.',
                    'The municipal government continues to foster economic growth, improve public education and health services, and strengthen environmental stewardship through responsive, people-centered administration.',
                    'Through digital governance initiatives and coordinated public service delivery, LGU Mabuhay aims to make government services more accessible, transparent, and empowering for every resident.',
                ],
                'overview_highlights' => [
                    'Digital service access and public information support',
                    'Community-based programs for agriculture and livelihoods',
                    'Health, education, and inclusive municipal coordination',
                ],
                'media_badge' => 'Media Feature',
                'media_title' => 'Municipal Video Showcase',
                'media_preview_image' => 'lgu_mabuhay.jpg',
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
                    ['id' => 'member-3', 'name' => 'Alvarez H. Dammang', 'role' => 'Council Member', 'image' => null],
                    ['id' => 'member-4', 'name' => 'Nelson L. Mallen', 'role' => 'Council Member', 'image' => null],
                    ['id' => 'member-5', 'name' => 'Baltazar A. Alcala Sr.', 'role' => 'Council Member', 'image' => null],
                    ['id' => 'member-6', 'name' => 'Jermalyn M. Dammang', 'role' => 'Council Member', 'image' => null],
                    ['id' => 'member-7', 'name' => 'Abubakhar S. Anjawan', 'role' => 'Council Member', 'image' => null],
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
                            'kagawads' => [
                                'Ramon Garcia',
                                'Liza Mendoza',
                                'Joel Ramos',
                            ],
                        ],
                    ],
                    [
                        'id' => 2,
                        'title' => 'Bagong Silang (Tumalog)',
                        'reference' => 'BRGY-002',
                        'population' => 1596,
                        'captain_image' => null,
                        'officials' => [
                            'captain' => 'Michael Fernandez',
                            'secretary' => 'Rose Ann Diaz',
                            'treasurer' => 'Edgar Castillo',
                            'skChairperson' => 'Kristine Bautista',
                            'kagawads' => [
                                'Leo Ramos',
                                'Allan Flores',
                                'Grace Mendoza',
                            ],
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
            ],
        );
    }
}
