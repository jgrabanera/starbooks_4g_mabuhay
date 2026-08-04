<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        $about = About::query()->updateOrCreate(
            ['id' => 1],
            [
                'page_key' => 'about-lgu-mabuhay',
                'hero_logo' => '1785834798_about-lgu-mabuhay.png',
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
                'organization_mayor_image' => '1785837572_organization-mayor.png',
                'organization_vice_mayor_name' => 'Hon. Joval John B. Samonte',
                'organization_vice_mayor_role' => 'Municipal Vice Mayor',
                'organization_vice_mayor_image' => '1785837572_organization-vice-mayor.png',
                'organization_council_members' => [
                    ['id' => '1', 'name' => 'Maria Pilar T. Adlaon', 'role' => 'Council Member', 'image' => '1785840758_organization-council-member-1.png'],
                    ['id' => '2', 'name' => 'Hon. Majin V. Andak', 'role' => 'Council Member', 'image' => '1785840758_organization-council-member-2.png'],
                    ['id' => '3', 'name' => 'Alvarez H. Dammang', 'role' => 'Council Member', 'image' => '1785840758_organization-council-member-3.png'],
                    ['id' => '4', 'name' => 'Hon. Alvin D. Hassan', 'role' => 'Council Member', 'image' => '1785840758_organization-council-member-4.png'],
                    ['id' => '5', 'name' => 'Hon. Rey T. Omamalin', 'role' => 'Council Member', 'image' => '1785840758_organization-council-member-5.png'],
                    ['id' => '6', 'name' => 'Hon. Julhisan "Isan" H. Buhali', 'role' => 'Council Member', 'image' => null],
                    ['id' => '7', 'name' => 'Hon. Bhong Anjawang', 'role' => 'Council Member', 'image' => null],
                    ['id' => '15', 'name' => 'Hon. Dario S. Alforque', 'role' => 'Council Member', 'image' => '1785840758_organization-council-member-8.png'],
                ],
                'lgu_badge' => 'Barangay Reference Collection',
                'lgu_subtitle' => 'Municipal Directory Layout Preview',
                'lgu_title' => 'Municipality of Mabuhay',
                'lgu_logo' => null,
                'lgu_barangays' => [],
                'media_overlay_title' => 'Mabuhay Overview Video',
                'media_overlay_description' => 'Replace this showcase with the official LGU Mabuhay video presentation, tourism reel, or public service introduction when media is ready.',
                'media_footer_left' => 'Video Player Placeholder',
                'media_footer_right' => '16:9 Presentation Area',
                'priorities_title' => 'Governance Priorities',
                'priorities_items' => [],
                'created_at' => '2026-08-04 01:33:24',
                'updated_at' => '2026-08-04 01:59:32',
            ],
        );

        if (Schema::hasTable('about_priorities')) {
            $about->priorities()->delete();
        }

        if (Schema::hasTable('about_barangays') && Schema::hasTable('about_barangay_kagawads')) {
            $about->barangays()->delete();
        }
    }
}
