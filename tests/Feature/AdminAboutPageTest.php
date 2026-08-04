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
