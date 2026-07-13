<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = [
            ['title' => 'Tourism', 'slug' => 'tourism', 'description' => 'tourism description', 'image' => '1783931169_tourism.jpg', 'is_active' => true],
            ['title' => 'Local Governance', 'slug' => 'local-governance', 'description' => 'Local governance description', 'image' => '1783931258_local-governance.png', 'is_active' => true],

        ];

        Category::insertOrIgnore($users);
    }
}
