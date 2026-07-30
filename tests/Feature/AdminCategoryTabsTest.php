<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminCategoryTabsTest extends TestCase
{
    use RefreshDatabase;

    public function test_categories_page_no_longer_exposes_tab_management_data(): void
    {
        $user = User::factory()->create();
        Category::create([
            'title' => 'Tourism',
            'slug' => 'tourism',
            'description' => 'Tourism description',
            'image' => 'tourism.png',
            'display_order' => 1,
            'is_active' => true,
        ]);

        $this->actingAs($user)
            ->get(route('admin.categories.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Categories')
                ->has('categories', 1)
                ->where('categories.0.title', 'Tourism')
                ->missing('categories.0.tabs'));
    }
}
