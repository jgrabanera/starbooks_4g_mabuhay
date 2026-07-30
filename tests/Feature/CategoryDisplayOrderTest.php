<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CategoryDisplayOrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_update_category_display_order(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $category = Category::create([
            'title' => 'Projects',
            'slug' => 'projects',
            'description' => 'Project updates',
            'image' => 'projects.png',
            'display_order' => 3,
            'is_active' => true,
        ]);

        Storage::disk('public')->put(
            'images/thumbnails/projects.png',
            'existing image',
        );

        $response = $this->actingAs($user)->post(
            route('admin.categories.update', $category),
            [
                'title' => 'Projects',
                'description' => 'Project updates',
                'display_order' => 1,
                'is_active' => true,
            ],
        );

        $response->assertRedirect(route('admin.categories.index'));

        $category->refresh();

        $this->assertSame(1, $category->display_order);
    }

    public function test_admin_cannot_create_new_categories_when_category_set_is_fixed(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        Category::create([
            'title' => 'About',
            'slug' => 'about',
            'description' => 'About section',
            'image' => 'about.png',
            'display_order' => 1,
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->post(route('admin.categories.store'), [
            'title' => 'Resources',
            'description' => 'Resource center',
            'is_active' => true,
            'image' => UploadedFile::fake()->image('resources.png'),
        ]);

        $response->assertNotFound();
        $this->assertDatabaseCount('categories', 1);
    }
}
