<?php

namespace Tests\Feature;

use App\Models\About;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminAboutPageTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array<string, mixed>
     */
    private function validPayload(): array
    {
        return [
            'section' => 'about',
            'hero_logo_alt' => 'Updated LGU Mabuhay Logo',
            'hero_title' => 'Updated Municipality of Mabuhay',
            'hero_description' => 'Updated hero description for the about page.',
            'overview_badge' => 'Updated Overview',
            'overview_title' => 'Updated About Mabuhay',
            'overview_paragraphs' => [
                'Updated paragraph one.',
                'Updated paragraph two.',
            ],
            'overview_highlights' => [
                'Updated highlight one',
                'Updated highlight two',
            ],
            'media_badge' => 'Updated Media',
            'media_title' => 'Updated Media Title',
            'organization_mayor_name' => 'Hon. Updated Mayor',
            'organization_mayor_role' => 'Municipal Mayor',
            'organization_vice_mayor_name' => 'Hon. Updated Vice Mayor',
            'organization_vice_mayor_role' => 'Municipal Vice Mayor',
            'organization_council_members' => [
                [
                    'id' => 'member-1',
                    'name' => 'Maria Pilar T. Adlaon',
                    'role' => 'Council Member',
                ],
                [
                    'id' => 'member-2',
                    'name' => 'Majin V. Andak Sr.',
                    'role' => 'Council Member',
                ],
            ],
            'lgu_badge' => 'Updated Barangay Directory',
            'lgu_subtitle' => 'Updated municipal reference',
            'lgu_title' => 'Updated LGU Mabuhay',
            'lgu_barangays' => [
                [
                    'id' => 1,
                    'title' => 'Abunda',
                    'reference' => 'BRGY-001',
                    'population' => 1200,
                    'officials' => [
                        'captain' => 'Captain One',
                        'secretary' => 'Secretary One',
                        'treasurer' => 'Treasurer One',
                        'skChairperson' => 'SK One',
                        'kagawads' => [
                            'Kagawad One',
                            'Kagawad Two',
                        ],
                    ],
                ],
            ],
            'media_overlay_title' => 'Updated Overlay Title',
            'media_overlay_description' => 'Updated overlay description.',
            'media_footer_left' => 'Updated footer left',
            'media_footer_right' => 'Updated footer right',
            'priorities_title' => 'Updated Priorities',
            'priorities_items' => [
                [
                    'title' => 'Priority One',
                    'description' => 'Priority one description.',
                ],
                [
                    'title' => 'Priority Two',
                    'description' => 'Priority two description.',
                ],
            ],
        ];
    }

    public function test_admin_about_page_loads_with_default_content_shape(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('admin.about.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/About')
                ->where('aboutContent.hero_title', 'Municipality of Mabuhay')
                ->where('aboutContent.overview_badge', 'Municipality Overview')
                ->where('aboutContent.media_title', 'Municipal Video Showcase')
                ->where('aboutContent.priorities_title', 'Governance Priorities'));
    }

    public function test_admin_about_page_can_store_structured_about_content(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();

        $payload = $this->validPayload();
        $payload['hero_logo'] = UploadedFile::fake()->image('hero-logo.png');
        $payload['media_preview_image'] = UploadedFile::fake()->image('media-preview.png');
        $payload['media_video'] = UploadedFile::fake()->create('about-video.mp4', 2048, 'video/mp4');

        $this->actingAs($user)
            ->post(route('admin.about.update'), $payload)
            ->assertRedirect(route('admin.about.index'));

        $about = About::query()->where('page_key', 'about-lgu-mabuhay')->first();

        $this->assertNotNull($about);
        $this->assertSame('Updated Municipality of Mabuhay', $about->hero_title);
        $this->assertSame(
            ['Updated paragraph one.', 'Updated paragraph two.'],
            $about->overview_paragraphs,
        );
        $this->assertSame('Priority One', $about->priorities_items[0]['title']);
        $this->assertNotNull($about->media_video);

        Storage::disk('public')->assertExists('images/thumbnails/' . $about->hero_logo);
        Storage::disk('public')->assertExists('images/thumbnails/' . $about->media_preview_image);
        Storage::disk('public')->assertExists('videos/about/' . $about->media_video);
    }

    public function test_admin_about_page_can_save_organization_tab_independently_with_member_image(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();

        $about = About::factory()->create([
            'page_key' => 'about-lgu-mabuhay',
            'hero_title' => 'Keep Existing Hero',
            'lgu_title' => 'Keep Existing LGU',
        ]);

        $payload = [
            'section' => 'organization',
            'organization_mayor_name' => 'Hon. Updated Mayor',
            'organization_mayor_role' => 'Municipal Mayor',
            'organization_vice_mayor_name' => 'Hon. Updated Vice Mayor',
            'organization_vice_mayor_role' => 'Municipal Vice Mayor',
            'organization_council_members' => [
                [
                    'id' => 'member-1',
                    'name' => 'Maria Pilar T. Adlaon',
                    'role' => 'Council Member',
                    'image' => UploadedFile::fake()->image('member-one.png'),
                ],
                [
                    'id' => 'member-2',
                    'name' => 'Majin V. Andak Sr.',
                    'role' => 'Council Member',
                ],
            ],
        ];

        $this->actingAs($user)
            ->post(route('admin.about.update'), $payload)
            ->assertRedirect(route('admin.about.index'));

        $about->refresh();

        $this->assertSame('Keep Existing Hero', $about->hero_title);
        $this->assertSame('Keep Existing LGU', $about->lgu_title);
        $this->assertSame('Hon. Updated Mayor', $about->organization_mayor_name);
        $this->assertSame('Maria Pilar T. Adlaon', $about->organization_council_members[0]['name']);
        $this->assertNotNull($about->organization_council_members[0]['image']);

        Storage::disk('public')->assertExists(
            'images/thumbnails/' . $about->organization_council_members[0]['image'],
        );
    }

    public function test_admin_about_page_can_save_a_newly_added_council_member_without_placeholder_rows(): void
    {
        $user = User::factory()->create();

        $about = About::factory()->create([
            'page_key' => 'about-lgu-mabuhay',
            'organization_council_members' => [],
        ]);

        $payload = [
            'section' => 'organization',
            'organization_mayor_name' => 'Hon. Updated Mayor',
            'organization_mayor_role' => 'Municipal Mayor',
            'organization_vice_mayor_name' => 'Hon. Updated Vice Mayor',
            'organization_vice_mayor_role' => 'Municipal Vice Mayor',
            'organization_council_members' => [
                [
                    'id' => 'member-1722768000',
                    'name' => 'New Council Member',
                    'role' => 'Council Member',
                ],
            ],
        ];

        $this->actingAs($user)
            ->post(route('admin.about.update'), $payload)
            ->assertRedirect(route('admin.about.index'));

        $about->refresh();

        $this->assertCount(1, $about->organization_council_members);
        $this->assertSame(
            'New Council Member',
            $about->organization_council_members[0]['name'],
        );
        $this->assertSame(
            'Council Member',
            $about->organization_council_members[0]['role'],
        );
    }

    public function test_admin_about_page_can_save_lgu_tab_independently_with_logo(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();

        $about = About::factory()->create([
            'page_key' => 'about-lgu-mabuhay',
            'hero_title' => 'Keep Existing Hero',
            'organization_mayor_name' => 'Keep Existing Mayor',
        ]);

        $payload = [
            'section' => 'lgu',
            'lgu_badge' => 'Updated LGU Badge',
            'lgu_subtitle' => 'Updated LGU Subtitle',
            'lgu_title' => 'Updated LGU Title',
            'lgu_logo' => UploadedFile::fake()->image('lgu-logo.png'),
            'lgu_barangays' => [
                [
                    'id' => 1,
                    'title' => 'Abunda',
                    'reference' => 'BRGY-001',
                    'population' => 1500,
                    'officials' => [
                        'captain' => 'Captain One',
                        'secretary' => 'Secretary One',
                        'treasurer' => 'Treasurer One',
                        'skChairperson' => 'SK One',
                        'kagawads' => [
                            'Kagawad One',
                            'Kagawad Two',
                        ],
                    ],
                ],
            ],
        ];

        $this->actingAs($user)
            ->post(route('admin.about.update'), $payload)
            ->assertRedirect(route('admin.about.index'));

        $about->refresh();

        $this->assertSame('Keep Existing Hero', $about->hero_title);
        $this->assertSame('Keep Existing Mayor', $about->organization_mayor_name);
        $this->assertSame('Updated LGU Title', $about->lgu_title);
        $this->assertNotNull($about->lgu_logo);

        Storage::disk('public')->assertExists('images/thumbnails/' . $about->lgu_logo);
    }

    public function test_public_about_page_receives_about_cms_data(): void
    {
        About::factory()->create([
            'hero_title' => 'CMS Driven Mabuhay',
            'overview_badge' => 'CMS Overview',
            'media_title' => 'CMS Media Title',
            'priorities_title' => 'CMS Priorities',
        ]);

        $this->get(route('client.category.show', [
            'slug' => 'about-lgu-mabuhay',
        ]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Client/Sub/AboutLguMabuhay')
                ->where('aboutData.hero.title', 'CMS Driven Mabuhay')
                ->where('aboutData.overview.badge', 'CMS Overview')
                ->where('aboutData.media.title', 'CMS Media Title')
                ->where('aboutData.priorities.title', 'CMS Priorities'));
    }
}
