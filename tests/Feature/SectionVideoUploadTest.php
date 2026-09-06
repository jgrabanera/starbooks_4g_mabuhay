<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\SocialServiceContent;
use App\Models\TourismContent;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SectionVideoUploadTest extends TestCase
{
    use RefreshDatabase;

    public static function sections(): array
    {
        return [
            ['tourism', TourismContent::class, 'events'],
            ['tourism', TourismContent::class, 'festivities'],
            ['tourism', TourismContent::class, 'sites'],
            ['social-services', SocialServiceContent::class, 'social-services'],
        ];
    }

    /** @dataProvider sections */
    public function test_video_lifecycle(string $section, string $model, string $tab): void
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());
        Category::create([
            'title' => $section, 'slug' => $section, 'image' => 'category.jpg',
            'description' => 'Section', 'display_order' => 1, 'is_active' => true,
        ]);
        $payload = ['tab_id' => $tab, 'title' => 'Video entry', 'is_active' => true];
        $this->post(route("admin.{$section}.store"), $payload + [
            'image' => UploadedFile::fake()->image('thumbnail.jpg'),
            'video' => UploadedFile::fake()->create('clip.mp4', 71680, 'video/mp4'),
        ])->assertSessionHasNoErrors()->assertRedirect();
        $content = $model::query()->firstOrFail();
        $original = 'videos/'.$section.'/'.$content->video;
        Storage::disk('public')->assertExists($original);
        $this->getJson(route("api.{$section}.contents"))
            ->assertOk()->assertJsonPath('contents.0.video_url', asset('storage/'.$original));
        $this->post(route("admin.{$section}.update", $content), $payload)
            ->assertSessionHasNoErrors()->assertRedirect();
        $this->assertSame($original, 'videos/'.$section.'/'.$content->fresh()->video);
        $this->post(route("admin.{$section}.update", $content), $payload + [
            'video' => UploadedFile::fake()->create('replacement.mp4', 100, 'video/mp4'),
        ])->assertSessionHasNoErrors()->assertRedirect();
        $replacement = 'videos/'.$section.'/'.$content->fresh()->video;
        $this->assertNotSame($original, $replacement);
        Storage::disk('public')->assertMissing($original);
        Storage::disk('public')->assertExists($replacement);
        $this->delete(route("admin.{$section}.destroy", $content))->assertRedirect();
        Storage::disk('public')->assertMissing($replacement);
        $this->assertModelMissing($content);
    }

    /** @dataProvider sections */
    public function test_invalid_and_oversized_videos_are_rejected(string $section, string $model, string $tab): void
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());
        foreach ([UploadedFile::fake()->create('bad.txt', 10, 'text/plain'), UploadedFile::fake()->create('large.mp4', 71681, 'video/mp4')] as $video) {
            $this->post(route("admin.{$section}.store"), [
                'tab_id' => $tab, 'title' => 'Invalid entry',
                'image' => UploadedFile::fake()->image('thumbnail.jpg'), 'video' => $video,
            ])->assertSessionHasErrors('video');
        }
        $this->assertSame(0, $model::query()->count());
    }
}
