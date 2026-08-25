<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminNavigationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_away_from_admin_pages(): void
    {
        $this->get(route('admin.dashboard'))
            ->assertRedirect(route('login'));

        $this->get(route('admin.categories.index'))
            ->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_open_admin_pages(): void
    {
        $user = User::factory()->create();
        Category::query()->create([
            'title' => 'About',
            'slug' => 'about-lgu-mabuhay',
            'description' => 'About, organization, and LGU information',
            'image' => 'about.jpg',
            'display_order' => 1,
            'is_active' => true,
        ]);
        Category::query()->create([
            'title' => 'Resources',
            'slug' => 'resources',
            'description' => 'Public LGU documents and resources',
            'image' => 'resources.jpg',
            'display_order' => 2,
            'is_active' => false,
        ]);

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Dashboard')
                ->has('categories', 2)
                ->where('categories.0.slug', 'resources')
                ->where('categories.0.is_active', false)
                ->where('categories.1.slug', 'about-lgu-mabuhay'));

        $this->actingAs($user)
            ->get(route('admin.categories.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Categories')
                ->has('categories'));
    }
}
