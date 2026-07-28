<?php

namespace Tests\Feature;

use Tests\TestCase;

class ClientCategoryPageRoutingTest extends TestCase
{
    public function test_about_lgu_mabuhay_slug_renders_its_dedicated_page(): void
    {
        $response = $this->get(route('client.category.show', [
            'slug' => 'about-lgu-mabuhay',
        ]));

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Client/Sub/AboutLguMabuhay'));
    }

    public function test_known_category_slug_renders_its_dedicated_page(): void
    {
        $response = $this->get(route('client.category.show', [
            'slug' => 'tourism',
        ]));

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Client/Sub/Tourism'));
    }

    public function test_unknown_category_slug_falls_back_to_shared_sub_category_route(): void
    {
        $response = $this->get(route('client.category.show', [
            'slug' => 'unknown-category',
        ]));

        $response->assertRedirect(route('client.sub-categories', [
            'slug' => 'unknown-category',
        ]));
    }
}
