<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\TourismContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientSectionContentApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_section_content_api_returns_active_category_records_with_normalized_tab_ids(): void
    {
        $category = Category::create([
            'title' => 'Tourism',
            'slug' => 'tourism',
            'description' => 'Tourism section',
            'image' => 'tourism.png',
            'display_order' => 1,
            'tabs' => [
                ['id' => 'events-1', 'label' => 'Events'],
            ],
            'is_active' => true,
        ]);

        TourismContent::create([
            'tab_id' => 'events-1',
            'title' => 'Founding Anniversary Parade',
            'slug' => 'founding-anniversary-parade',
            'description' => 'Annual tourism event',
            'image' => 'parade.png',
            'pdf' => 'parade.pdf',
            'is_active' => true,
        ]);

        TourismContent::create([
            'tab_id' => 'events-1',
            'title' => 'Hidden Event',
            'slug' => 'hidden-event',
            'description' => 'Hidden tourism event',
            'image' => 'hidden.png',
            'pdf' => null,
            'is_active' => false,
        ]);

        $response = $this->getJson(route('api.tourism.contents'));

        $response
            ->assertOk()
            ->assertJsonPath('category.slug', 'tourism')
            ->assertJsonCount(1, 'contents')
            ->assertJsonPath('contents.0.title', 'Founding Anniversary Parade')
            ->assertJsonPath('contents.0.tab_id', 'events-1')
            ->assertJsonPath('contents.0.normalized_tab_id', 'events');
    }
}
