<?php

namespace Tests\Feature;

use App\Models\DostServiceContent;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DostServiceVideoUploadTest extends TestCase
{
    public function test_video_can_be_uploaded_for_every_dost_service_tab(): void
    {
        $this->withoutExceptionHandling();
        Storage::fake('public');

        $user = User::factory()->create();
        $tabs = ['Dost-ix', 'ProgramsServices', 'FacebookPosts'];

        foreach ($tabs as $index => $tabId) {
            $this->actingAs($user)
                ->post(route('admin.dost-services.store'), [
                    'tab_id' => $tabId,
                    'title' => "DOST service video {$index}",
                    'description' => 'Service with a video attachment.',
                    'image' => UploadedFile::fake()->image("service-{$index}.jpg"),
                    'video' => UploadedFile::fake()->create("service-{$index}.mp4", 1024, 'video/mp4'),
                    'is_active' => true,
                ])
                ->assertRedirect(route('admin.dost-services.index'));

            $service = DostServiceContent::query()
                ->where('tab_id', $tabId)
                ->firstOrFail();

            $this->assertNotNull($service->video);
            Storage::disk('public')->assertExists('videos/dost-services/'.$service->video);
        }
    }
}
