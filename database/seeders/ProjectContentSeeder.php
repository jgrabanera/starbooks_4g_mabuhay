<?php

namespace Database\Seeders;

use App\Models\ProjectContent;
use Illuminate\Database\Seeder;

class ProjectContentSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            0 => [
                'id' => 1,
                'tab_id' => 'ongoing',
                'title' => 'Proposal of Mabuhay Hostel',
                'slug' => 'proposal-of-mabuhay-hostel',
                'description' => 'Mayor Edreluisa O. Caloñge and Engr. Eggardo Cole, MPDC joined the DEVDep Quarterly Meeting for the proposal of the Mabuhay Hostel. If granted, this project will create a significant impact on the municipality. The establishment of a hostel in Mabuhay will not only provide affordable and accessible accommodation for visitors  and travelers, but it will also help boost local tourism and economic activity. It can generate employment opportunities for residents, increase revenue for small businesses, and enhance the overall image of Mabuhay as a hospitable and progressive town',
                'image' => '1788626329_proposal-of-mabuhay-hostel.jpg',
                'pdf' => '1788626329_proposal-of-mabuhay-hostel.pdf',
                'is_active' => 1,
                'created_at' => '2026-09-05 16:38:49',
                'updated_at' => '2026-09-05 16:38:49',
            ],
        ];

        ProjectContent::query()->upsert($rows, ['id']);
    }
}
