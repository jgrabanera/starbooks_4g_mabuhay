<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminContentTabAssignmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_content_for_a_specific_category_tab(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $category = Category::create([
            'title' => 'Tourism',
            'slug' => 'tourism',
            'description' => 'Tourism category',
            'image' => 'tourism.png',
            'tabs' => [
                ['id' => 'memorandum-1', 'label' => 'Memorandum'],
                ['id' => 'ordinance-2', 'label' => 'Ordinance'],
            ],
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->post(route('admin.contents.store'), [
            'category_id' => $category->id,
            'tab_id' => 'ordinance-2',
            'title' => 'Local Tourism Ordinance',
            'description' => 'Ordinance content',
            'is_active' => true,
            'image' => UploadedFile::fake()->image('ordinance.png'),
        ]);

        $response->assertRedirect(route('admin.contents.index'));

        $content = SubCategory::query()->firstOrFail();

        $this->assertSame($category->id, $content->category_id);
        $this->assertSame('ordinance-2', $content->tab_id);
        $this->assertSame('local-tourism-ordinance', $content->slug);
    }
}
