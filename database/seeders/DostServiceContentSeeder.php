<?php

namespace Database\Seeders;

use App\Models\DostServiceContent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DostServiceContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (! Schema::hasTable('dost_service_contents')) {
            return;
        }

        $contents = [
            [1, 'ProgramsServices', 'SMART AND SUSTAINABLE COMMUNITIES PROGRAM', 'smart-and-sustainable-communities-program', 'SMARTER, SUSTAINABLE, RESILIENT AND INCLUSIVE COMMUNITIES THROUGH SCIENCE TECHNOLOGY AND INNOVATION (STI)', '1788620191_smart-and-sustainable-communities-program.png', '1788620191_smart-and-sustainable-communities-program.pdf', null, true, '2026-09-05 14:56:31', '2026-09-05 14:56:31'],
            [2, 'ProgramsServices', 'DOST Scholarship Program', 'dost-scholarship-program', 'S&T Undergraduate and Junior Level Science Scholarship (JLSS)', '1788620371_dost-scholarship-program.png', '1788620371_dost-scholarship-program.pdf', null, true, '2026-09-05 14:59:31', '2026-09-05 14:59:31'],
            [3, 'ProgramsServices', 'DOST IX Local Grants-in-Aid (GIA) Program', 'dost-ix-local-grants-in-aid-gia-program', 'Aims to harness the country’s scientific and technological capabilities to spur and attain sustainable economic growth and development.', '1788621290_dost-ix-local-grants-in-aid-gia-program.png', '1788621291_dost-ix-local-grants-in-aid-gia-program.pdf', null, true, '2026-09-05 15:14:51', '2026-09-05 15:14:51'],
            [4, 'ProgramsServices', 'Small Enterprise Technology Upgrading Program (SETUP)', 'small-enterprise-technology-upgrading-program-setup', 'SETUP provides assistance to Micro, Small, and Medium Enterprises (MSMEs) that will enable them to enhance their businesses.', '1788621709_small-enterprise-technology-upgrading-program-setup.png', '1788621709_small-enterprise-technology-upgrading-program-setup.pdf', null, true, '2026-09-05 15:21:49', '2026-09-05 15:21:49'],
            [5, 'ProgramsServices', 'DOST iFWD PH Program', 'dost-ifwd-ph-program', 'Provide support opportunities for OFWs and their immediate families to establish technology-based enterprises in the country.', '1788622576_dost-ifwd-ph-program.png', '1788622576_dost-ifwd-ph-program.pdf', null, true, '2026-09-05 15:36:16', '2026-09-05 15:36:16'],
            [6, 'ProgramsServices', 'RSTL - Regional Standards and Testing Laboratories', 'rstl-regional-standards-and-testing-laboratories', 'RSTL - Regional Standards and Testing Laboratories', '1788623096_rstl-regional-standards-and-testing-laboratories.png', '1788623096_rstl-regional-standards-and-testing-laboratories.pdf', null, true, '2026-09-05 15:44:56', '2026-09-05 15:44:56'],
            [7, 'FacebookPosts', 'MOA signing of newly-approved CEST-Mabuhay Project', 'moa-signing-of-newly-approved-cest-mabuhay-project', 'The LGU was granted with the assistance amounting to ₱2,469,060.00 that will address the challenges/issues of the Municipality in terms of environment, education, technology and economic livelihood.', '1788623594_moa-signing-of-newly-approved-cest-mabuhay-project.jpg', '1788623651_moa-signing-of-newly-approved-cest-mabuhay-project.pdf', null, true, '2026-09-05 15:53:14', '2026-09-05 15:54:11'],
            [8, 'FacebookPosts', 'Ceremonial Turnover of CEST Funding Assistance', 'ceremonial-turnover-of-cest-funding-assistance', 'Municipal Mayor Edreluisa O. Caloñge leads the acceptance of fund assistance granted by the Department of Science and Technology Office No. IX (DOST-IX) through its Provincial Science and Technology Office of Zamboanga Sibugay Province (PSTO-ZSP) during the 57th Araw ng Mabuhay Celebration in Mabuhay, Zamboanga Sibugay Province.', '1788624217_ceremonial-turnover-of-cest-funding-assistance.jpg', '1788624217_ceremonial-turnover-of-cest-funding-assistance.pdf', null, true, '2026-09-05 16:03:37', '2026-09-05 16:03:37'],
            [9, 'FacebookPosts', 'Turnover of the 1st Community Tsunami Alerting Station (CTAS) in the Zamboanga Sibugay Province to the LGU-Mabuhay', 'turnover-of-the-1st-community-tsunami-alerting-station-ctas-in-the-zamboanga-sibugay-province-to-the-lgu-mabuhay', '𝐃𝐎𝐒𝐓 𝐈𝐗 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥𝐥𝐲 𝐓𝐮𝐫𝐧𝐬 𝐎𝐯𝐞𝐫 𝐭𝐡𝐞 𝟏𝐬𝐭 𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 𝐓𝐬𝐮𝐧𝐚𝐦𝐢 𝐀𝐥𝐞𝐫𝐭𝐢𝐧𝐠 𝐒𝐭𝐚𝐭𝐢𝐨𝐧 (𝐂𝐓𝐀𝐒) 𝐢𝐧 𝐭𝐡𝐞 𝐙𝐚𝐦𝐛𝐨𝐚𝐧𝐠𝐚 𝐒𝐢𝐛𝐮𝐠𝐚𝐲 𝐏𝐫𝐨𝐯𝐢𝐧𝐜𝐞 𝐭𝐨 𝐭𝐡𝐞 𝐋𝐨𝐜𝐚𝐥 𝐆𝐨𝐯𝐞𝐫𝐧𝐦𝐞𝐧𝐭 𝐔𝐧𝐢𝐭 𝐨𝐟 𝐌𝐚𝐛𝐮𝐡𝐚𝐲 (𝐋𝐆𝐔-𝐌𝐚𝐛𝐮𝐡𝐚𝐲)', '1788624386_turnover-of-the-1st-community-tsunami-alerting-station-ctas-in-the-zamboanga-sibugay-province-to-the-lgu-mabuhay.jpg', '1788624386_turnover-of-the-1st-community-tsunami-alerting-station-ctas-in-the-zamboanga-sibugay-province-to-the-lgu-mabuhay.pdf', null, true, '2026-09-05 16:06:26', '2026-09-05 16:06:26'],
            [10, 'FacebookPosts', 'DOST IX Turns Over 8 STARBOOKS Units in Zamboanga Sibugay', 'dost-ix-turns-over-8-starbooks-units-in-zamboanga-sibugay', 'The DOST Regional Office No. IX, through its Provincial Science and Technology Office of Zamboanga Sibugay (PSTO-ZSP), successfully turned over eight (08) units of STARBOOKS to the beneficiary schools in the municipalities of Alicia and Mabuhay, Zamboanga Sibugay,', '1788624562_dost-ix-turns-over-8-starbooks-units-in-zamboanga-sibugay.jpg', '1788624562_dost-ix-turns-over-8-starbooks-units-in-zamboanga-sibugay.pdf', null, true, '2026-09-05 16:09:22', '2026-09-05 16:09:22'],
        ];

        foreach ($contents as [$id, $tabId, $title, $slug, $description, $image, $pdf, $video, $isActive, $createdAt, $updatedAt]) {
            DostServiceContent::query()->updateOrCreate(
                ['id' => $id],
                [
                    'tab_id' => $tabId,
                    'title' => $title,
                    'slug' => $slug,
                    'description' => $description,
                    'image' => $image,
                    'pdf' => $pdf,
                    'video' => $video,
                    'is_active' => $isActive,
                    'created_at' => $createdAt,
                    'updated_at' => $updatedAt,
                ],
            );
        }
    }
}
