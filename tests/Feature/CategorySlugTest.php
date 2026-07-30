<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategorySlugTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_persists_the_provided_slug_value(): void
    {
        $category = Category::create([
            'title' => 'Science and Technology',
            'slug' => 'science-and-technology',
            'description' => 'Books for science learners.',
            'image' => 'science-and-technology.png',
            'display_order' => 1,
            'tabs' => [
                ['id' => 'memorandum-1', 'label' => 'Memorandum'],
            ],
            'is_active' => true,
        ]);

        $this->assertSame('science-and-technology', $category->slug);
        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'slug' => 'science-and-technology',
        ]);
    }

    public function test_category_index_data_endpoint_returns_slug_values(): void
    {
        Category::create([
            'title' => 'Health Sciences',
            'slug' => 'health-sciences',
            'description' => 'Health content',
            'image' => 'health-sciences.png',
            'display_order' => 1,
            'tabs' => [
                ['id' => 'memorandum-1', 'label' => 'Memorandum'],
            ],
            'is_active' => true,
        ]);

        $response = $this->get(route('client.get-categories'));

        $response
            ->assertOk()
            ->assertJsonPath('0.slug', 'health-sciences')
            ->assertJsonPath('0.image', 'health-sciences.png');
    }

    public function test_admin_cannot_create_category_from_categories_cms(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post(route('admin.categories.store'), [
                'title' => 'Science',
                'image' => 'science-technology.png',
                'description' => 'Books about science and technology.',
                'display_order' => 5,
                'is_active' => true,
            ]);

        $response->assertNotFound();
        $this->assertDatabaseMissing('categories', [
            'title' => 'Science',
        ]);
    }
}
