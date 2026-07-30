<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminFixedSectionPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_fixed_section_pages_load_only_their_own_category_records(): void
    {
        $user = User::factory()->create();

        $definitions = [
            [
                'route' => 'admin.resources.index',
                'component' => 'Admin/Resources',
                'slug' => 'resources',
                'title' => 'Resources',
                'tab_id' => 'resources',
                'content_title' => 'Citizen Resource Guide',
            ],
            [
                'route' => 'admin.social-services.index',
                'component' => 'Admin/SocialServices',
                'slug' => 'social-services',
                'title' => 'Social Services',
                'tab_id' => 'award',
                'content_title' => 'Livelihood Award Posting',
            ],
            [
                'route' => 'admin.tourism.index',
                'component' => 'Admin/Tourism',
                'slug' => 'tourism',
                'title' => 'Tourism',
                'tab_id' => 'events',
                'content_title' => 'Mabuhay Founding Anniversary',
            ],
            [
                'route' => 'admin.dost-services.index',
                'component' => 'Admin/DostServices',
                'slug' => 'dost-services',
                'title' => 'DOST Services',
                'tab_id' => 'Dost-ix',
                'content_title' => 'DOST IX Provincial Update',
            ],
        ];

        foreach ($definitions as $index => $definition) {
            $category = Category::create([
                'title' => $definition['title'],
                'slug' => $definition['slug'],
                'description' => $definition['title'] . ' section',
                'image' => $definition['slug'] . '.png',
                'display_order' => $index + 1,
                'tabs' => [
                    ['id' => $definition['tab_id'], 'label' => $definition['title']],
                ],
                'is_active' => true,
            ]);

            SubCategory::create([
                'category_id' => $category->id,
                'tab_id' => $definition['tab_id'],
                'title' => $definition['content_title'],
                'slug' => str($definition['content_title'])->slug()->toString(),
                'description' => $definition['title'] . ' content',
                'image' => $definition['slug'] . '-content.png',
                'pdf' => null,
                'is_active' => true,
            ]);
        }

        $otherCategory = Category::create([
            'title' => 'Other Category',
            'slug' => 'other-category',
            'description' => 'Other section',
            'image' => 'other-category.png',
            'display_order' => 50,
            'tabs' => [
                ['id' => 'other', 'label' => 'Other'],
            ],
            'is_active' => true,
        ]);

        SubCategory::create([
            'category_id' => $otherCategory->id,
            'tab_id' => 'other',
            'title' => 'Other Category Item',
            'slug' => 'other-category-item',
            'description' => 'Other content',
            'image' => 'other-category-item.png',
            'pdf' => null,
            'is_active' => true,
        ]);

        foreach ($definitions as $definition) {
            $this->actingAs($user)
                ->get(route($definition['route']))
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page
                    ->component($definition['component'])
                    ->where('sectionCategory.slug', $definition['slug'])
                    ->has('contents', 1)
                    ->where('contents.0.title', $definition['content_title'])
                    ->where('contents.0.tab_id', $definition['tab_id']));
        }
    }
}
