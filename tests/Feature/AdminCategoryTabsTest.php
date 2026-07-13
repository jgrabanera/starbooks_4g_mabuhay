<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminCategoryTabsTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_update_tabs_for_a_category(): void
    {
        $user = User::factory()->create();
        $category = Category::create([
            'title' => 'Tourism',
            'slug' => 'tourism',
            'description' => 'Tourism description',
            'image' => 'tourism.png',
            'tabs' => [
                ['id' => 'memorandum-1', 'label' => 'Memorandum'],
            ],
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->put(
            route('admin.categories.tabs.update', $category),
            [
                'tabs' => [
                    ['label' => 'Memorandum'],
                    ['label' => 'Executive Orders'],
                    ['label' => 'Ordinance'],
                ],
            ],
        );

        $response->assertRedirect(route('admin.categories.index'));

        $category->refresh();

        $this->assertCount(3, $category->tabs);
        $this->assertSame('Memorandum', $category->tabs[0]['label']);
        $this->assertSame('Executive Orders', $category->tabs[1]['label']);
        $this->assertSame('Ordinance', $category->tabs[2]['label']);
    }
}
