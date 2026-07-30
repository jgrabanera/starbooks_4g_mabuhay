<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminProjectsPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_projects_cms_loads_only_project_category_records(): void
    {
        $user = User::factory()->create();
        $projectCategory = Category::create([
            'title' => 'LGU Mabuhay Projects',
            'slug' => 'lgu-mabuhay-projects',
            'description' => 'Projects section',
            'image' => 'projects.png',
            'display_order' => 3,
            'tabs' => [
                ['id' => 'completed', 'label' => 'Completed'],
                ['id' => 'ongoing', 'label' => 'On-Going'],
            ],
            'is_active' => true,
        ]);

        $otherCategory = Category::create([
            'title' => 'Tourism',
            'slug' => 'tourism',
            'description' => 'Tourism section',
            'image' => 'tourism.png',
            'display_order' => 4,
            'tabs' => [
                ['id' => 'events', 'label' => 'Events'],
            ],
            'is_active' => true,
        ]);

        SubCategory::create([
            'category_id' => $projectCategory->id,
            'tab_id' => 'completed',
            'title' => 'Finished Road Project',
            'slug' => 'finished-road-project',
            'description' => 'Completed project',
            'image' => 'finished-road-project.png',
            'pdf' => null,
            'is_active' => true,
        ]);

        SubCategory::create([
            'category_id' => $otherCategory->id,
            'tab_id' => 'events',
            'title' => 'Tourism Festival',
            'slug' => 'tourism-festival',
            'description' => 'Tourism content',
            'image' => 'tourism-festival.png',
            'pdf' => null,
            'is_active' => true,
        ]);

        $this->actingAs($user)
            ->get(route('admin.projects.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Projects')
                ->where('sectionCategory.slug', 'lgu-mabuhay-projects')
                ->has('contents', 1)
                ->where('contents.0.title', 'Finished Road Project')
                ->where('contents.0.tab_id', 'completed'));
    }
}
