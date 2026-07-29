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

    public function test_dost_services_slug_renders_its_dedicated_page(): void
    {
        $response = $this->get(route('client.category.show', [
            'slug' => 'dost-services',
        ]));

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Client/Sub/DostServices'));
    }

    public function test_lgu_mabuhay_projects_slug_renders_its_dedicated_page(): void
    {
        $response = $this->get(route('client.category.show', [
            'slug' => 'lgu-mabuhay-projects',
        ]));

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Client/Sub/LguMabuhayProjects'));
    }

    public function test_resources_slug_renders_its_dedicated_page(): void
    {
        $response = $this->get(route('client.category.show', [
            'slug' => 'resources',
        ]));

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Client/Sub/Resources'));
    }

    public function test_social_services_slug_renders_its_dedicated_page(): void
    {
        $response = $this->get(route('client.category.show', [
            'slug' => 'social-services',
        ]));

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Client/Sub/SocialServices'));
    }

    public function test_tourism_slug_renders_its_dedicated_page(): void
    {
        $response = $this->get(route('client.category.show', [
            'slug' => 'tourism',
        ]));

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Client/Sub/Tourism'));
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
