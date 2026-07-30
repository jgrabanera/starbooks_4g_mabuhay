<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminCategoryImageUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_cannot_create_a_category_from_the_categories_cms(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('admin.categories.store'), [
            'title' => 'Science and Technology',
            'description' => 'Books for science learners.',
            'is_active' => true,
            'image' => UploadedFile::fake()->image('science.png'),
        ]);

        $response->assertNotFound();
        $this->assertDatabaseCount('categories', 0);
    }

    public function test_admin_can_update_a_category_with_a_new_uploaded_image(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $category = Category::create([
            'title' => 'Old Title',
            'slug' => 'old-title',
            'description' => 'Old description',
            'image' => 'old-title.png',
            'is_active' => true,
        ]);

        Storage::disk('public')->put(
            'images/thumbnails/old-title.png',
            'old image',
        );

        $response = $this->actingAs($user)->post(route('admin.categories.update', $category), [
            'title' => 'Updated Title',
            'description' => 'Updated description',
            'is_active' => false,
            'image' => UploadedFile::fake()->image('updated-title.webp'),
        ]);

        $response->assertRedirect(route('admin.categories.index'));

        $category->refresh();

        $this->assertSame('Updated Title', $category->title);
        $this->assertSame('updated-title', $category->slug);
        $this->assertSame('Updated description', $category->description);
        $this->assertFalse($category->is_active);
        $this->assertNotSame('old-title.png', $category->image);
        Storage::disk('public')->assertMissing('images/thumbnails/old-title.png');
        Storage::disk('public')->assertExists('images/thumbnails/' . $category->image);
    }
}
