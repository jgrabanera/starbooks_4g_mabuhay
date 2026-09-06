<?php

namespace Database\Seeders;

use App\Models\LguResourceContent;
use Illuminate\Database\Seeder;

class LguResourceContentSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            0 => [
                'id' => 1,
                'tab_id' => 'memorandum',
                'title' => 'Executive Order no. 04 Series of 2026',
                'slug' => 'executive-order-no-04-series-of-2026',
                'description' => 'Executive Order Suspending Classes and Government Work Due to Typhoon Basyang',
                'image' => '1788704729_executive-order-no-04.png',
                'pdf' => '1788704730_executive-order-no-04.pdf',
                'is_active' => 1,
                'created_at' => '2026-09-06 14:25:30',
                'updated_at' => '2026-09-06 14:26:12',
            ],
            1 => [
                'id' => 2,
                'tab_id' => 'memorandum',
                'title' => 'Memorandum no. 06 Series of 2025',
                'slug' => 'memorandum-no-06-series-of-2025',
                'description' => 'Implementation of a “No Gambling Policy” During the St. Michael the Archangel Parish Fiesta',
                'image' => '1788705152_memorandum-no-06-series-of-2025.png',
                'pdf' => '1788705152_memorandum-no-06-series-of-2025.pdf',
                'is_active' => 1,
                'created_at' => '2026-09-06 14:32:32',
                'updated_at' => '2026-09-06 14:32:32',
            ],
            2 => [
                'id' => 3,
                'tab_id' => 'memorandum',
                'title' => 'Memorandum no. 07 Series of 2025',
                'slug' => 'memorandum-no-07-series-of-2025',
                'description' => 'Observance of the 55th Town Fiesta of Mabuhay and Designation of September 30, 2025 as Clean-Up and Rest Day',
                'image' => '1788705328_memorandum-no-07-series-of-2025.png',
                'pdf' => '1788705328_memorandum-no-07-series-of-2025.pdf',
                'is_active' => 1,
                'created_at' => '2026-09-06 14:35:28',
                'updated_at' => '2026-09-06 14:35:28',
            ],
            3 => [
                'id' => 4,
                'tab_id' => 'memorandum',
                'title' => 'Memorandum Circular No. 2022-085',
                'slug' => 'memorandum-circular-no-2022-085',
                'description' => 'Implementation of Road Clearing in the New Normal',
                'image' => '1788705590_memorandum-circular-no-2022-085.png',
                'pdf' => '1788705590_memorandum-circular-no-2022-085.pdf',
                'is_active' => 1,
                'created_at' => '2026-09-06 14:39:50',
                'updated_at' => '2026-09-06 14:39:50',
            ],
            4 => [
                'id' => 7,
                'tab_id' => 'budget',
                'title' => 'Memorandum Circular No. 2020-117, September 4, 2020',
                'slug' => 'memorandum-circular-no-2020-117-september-4-2020',
                'description' => 'Guidelines in the Establishment of the Barangay Profile System (BPS) Module Under the Barangay Information System (BIS)',
                'image' => '1788706859_memorandum-circular-no-2020-117-september-4-2020.png',
                'pdf' => '1788706627_memorandum-circular-no-2020-117-september-4-2020.pdf',
                'is_active' => 1,
                'created_at' => '2026-09-06 14:57:07',
                'updated_at' => '2026-09-06 15:00:59',
            ],
            5 => [
                'id' => 8,
                'tab_id' => 'budget',
                'title' => 'BIS Memorandum Dated January 26, 2024',
                'slug' => 'bis-memorandum-dated-january-26-2024',
                'description' => 'Updates Relative to the Processing of Barangay Officials’ Death and Burial Assistance (BODBA) and Encoding of Profiles of Newly Elected and Appointed Barangay and Sangguniang Kabataan Officials (BSKOs) in the Barangay Officials’ Profiling System (BOPS) for the 2023–2025 Term of Office',
                'image' => '1788706826_bis-memorandum-dated-january-26-2024.png',
                'pdf' => '1788706765_bis-memorandum-dated-january-26-2024.pdf',
                'is_active' => 1,
                'created_at' => '2026-09-06 14:59:25',
                'updated_at' => '2026-09-06 15:00:26',
            ],
            6 => [
                'id' => 9,
                'tab_id' => 'ordinance',
                'title' => 'Municipal Ordinance No.06-223-2024',
                'slug' => 'municipal-ordinance-no06-223-2024',
                'description' => 'An Ordinance Prohibiting The Collection of Any Form of Fees Upon All Types of Vehicles Transporting Goods In The Territorial Jurisdiction of Mabuhay, Zamboanga Sibugay',
                'image' => '1788709572_municipal-ordinance-no06-223-2024.png',
                'pdf' => '1788709572_municipal-ordinance-no06-223-2024.pdf',
                'is_active' => 1,
                'created_at' => '2026-09-06 15:46:12',
                'updated_at' => '2026-09-06 15:46:12',
            ],
            7 => [
                'id' => 10,
                'tab_id' => 'ordinance',
                'title' => 'Appropriation Ordinance No. 2024-12-12',
                'slug' => 'appropriation-ordinance-no-2024-12-12',
                'description' => 'An Appropriation Ordinance Authorizing Supplemental Budget No. 9 for CY 2024 in the Amount of ₱2,626,168.58',
                'image' => '1788710078_appropriation-ordinance-no-2024-12-12.png',
                'pdf' => '1788710078_appropriation-ordinance-no-2024-12-12.pdf',
                'is_active' => 1,
                'created_at' => '2026-09-06 15:54:38',
                'updated_at' => '2026-09-06 15:54:38',
            ],
            8 => [
                'id' => 11,
                'tab_id' => 'ordinance',
                'title' => 'Appropriation Ordinance No. 2011-125',
                'slug' => 'appropriation-ordinance-no-2011-125',
                'description' => 'An Ordinance Authorizing the Annual Budget of the Municipality of Mabuhay, Zamboanga Sibugay, for Calendar Year 2025',
                'image' => '1788710708_appropriation-ordinance-no-2011-125.png',
                'pdf' => '1788710683_appropriation-ordinance-no-2011-125.pdf',
                'is_active' => 1,
                'created_at' => '2026-09-06 16:04:43',
                'updated_at' => '2026-09-06 16:05:08',
            ],
        ];

        LguResourceContent::query()->upsert($rows, ['id']);
    }
}
