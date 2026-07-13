<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminNavigationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_away_from_admin_pages(): void
    {
        $this->get(route('admin.dashboard'))
            ->assertRedirect(route('login'));

        $this->get(route('admin.categories.index'))
            ->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_open_admin_pages(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertOk();

        $this->actingAs($user)
            ->get(route('admin.categories.index'))
            ->assertOk();
    }
}
