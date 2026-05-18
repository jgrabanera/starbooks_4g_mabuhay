<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CategorySlugTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_generates_slug_from_label(): void
    {
        $category = Category::factory()->create([
            'label' => 'Science & Technology',
        ]);

        $this->assertSame('science-technology', $category->slug);
        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'slug' => 'science-technology',
        ]);
    }

    public function test_category_generates_unique_slug_for_matching_labels(): void
    {
        $firstCategory = Category::factory()->create([
            'label' => 'Livelihood Education',
        ]);
        $secondCategory = Category::factory()->create([
            'label' => 'Livelihood Education',
        ]);

        $this->assertSame('livelihood-education', $firstCategory->slug);
        $this->assertSame('livelihood-education-2', $secondCategory->slug);
    }

    public function test_category_regenerates_slug_when_label_changes(): void
    {
        $category = Category::factory()->create([
            'label' => 'Science',
        ]);

        $category->update([
            'label' => 'Math and Engineering',
        ]);

        $this->assertSame('math-and-engineering', $category->refresh()->slug);
    }

    public function test_public_categories_include_slug(): void
    {
        Category::factory()->create([
            'label' => 'Health Sciences',
            'image' => 'health-sciences.png',
        ]);

        $response = $this->get('/categories');

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Client/Categories')
                ->has('categories', 1)
                ->where('categories.0.slug', 'health-sciences')
                ->where('categories.0.image', 'health-sciences.png'));
    }

    public function test_admin_can_create_category(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post(route('admin.categories.store'), [
                'title' => 'Science',
                'label' => 'Science & Technology',
                'image' => 'science-technology.png',
                'description' => 'Books about science and technology.',
                'sort_order' => 5,
                'is_active' => true,
            ]);

        $response->assertSessionHasNoErrors();

        $this->assertDatabaseHas('categories', [
            'title' => 'Science',
            'label' => 'Science & Technology',
            'slug' => 'science-technology',
            'image' => 'science-technology.png',
            'description' => 'Books about science and technology.',
            'sort_order' => 5,
            'is_active' => true,
        ]);
    }
}
