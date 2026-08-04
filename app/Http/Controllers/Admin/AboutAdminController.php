<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AboutContentRequest;
use App\Models\About;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AboutAdminController extends Controller
{
    public function index(): Response
    {
        $about = About::query()
            ->where('page_key', 'about-lgu-mabuhay')
            ->first();

        return Inertia::render('Admin/About', [
            'aboutContent' => $this->buildFormData($about),
        ]);
    }

    public function update(AboutContentRequest $request): RedirectResponse
    {
        $about = About::query()->firstOrNew([
            'page_key' => 'about-lgu-mabuhay',
        ]);

        $validated = $request->validated();
        $payload = [
            'page_key' => 'about-lgu-mabuhay',
            'hero_logo_alt' => $validated['hero_logo_alt'] ?? null,
            'hero_title' => trim($validated['hero_title']),
            'hero_description' => trim($validated['hero_description']),
            'overview_badge' => trim($validated['overview_badge']),
            'overview_title' => trim($validated['overview_title']),
            'overview_paragraphs' => array_values($validated['overview_paragraphs']),
            'overview_highlights' => array_values($validated['overview_highlights']),
            'media_badge' => trim($validated['media_badge']),
            'media_title' => trim($validated['media_title']),
            'media_overlay_title' => trim($validated['media_overlay_title']),
            'media_overlay_description' => trim($validated['media_overlay_description']),
            'media_footer_left' => trim($validated['media_footer_left']),
            'media_footer_right' => trim($validated['media_footer_right']),
            'priorities_title' => trim($validated['priorities_title']),
            'priorities_items' => collect($validated['priorities_items'])
                ->values()
                ->map(fn (array $item, int $index) => [
                    'id' => 'priority-' . ($index + 1),
                    'title' => trim($item['title']),
                    'description' => trim($item['description']),
                ])
                ->all(),
        ];

        if ($request->hasFile('hero_logo')) {
            $heroLogoPath = $request->file('hero_logo')->storeAs(
                'images/thumbnails',
                $this->buildStoredFileName('about-hero-logo', $request->file('hero_logo')->extension()),
                'public',
            );

            if (!empty($about->hero_logo)) {
                Storage::disk('public')->delete('images/thumbnails/' . $about->hero_logo);
            }

            $payload['hero_logo'] = basename($heroLogoPath);
        }

        if ($request->hasFile('media_preview_image')) {
            $mediaPreviewPath = $request->file('media_preview_image')->storeAs(
                'images/thumbnails',
                $this->buildStoredFileName('about-media-preview', $request->file('media_preview_image')->extension()),
                'public',
            );

            if (!empty($about->media_preview_image)) {
                Storage::disk('public')->delete('images/thumbnails/' . $about->media_preview_image);
            }

            $payload['media_preview_image'] = basename($mediaPreviewPath);
        }

        if ($request->hasFile('media_video')) {
            $mediaVideoPath = $request->file('media_video')->storeAs(
                'videos/about',
                $this->buildStoredFileName('about-media-video', $request->file('media_video')->extension()),
                'public',
            );

            if (!empty($about->media_video)) {
                Storage::disk('public')->delete('videos/about/' . $about->media_video);
            }

            $payload['media_video'] = basename($mediaVideoPath);
        }

        $about->fill($payload)->save();

        return to_route('admin.about.index');
    }

    private function buildFormData(?About $about): array
    {
        return [
            'hero_logo' => $about?->hero_logo,
            'hero_logo_alt' => $about?->hero_logo_alt ?? 'LGU Mabuhay',
            'hero_title' => $about?->hero_title ?? 'Municipality of Mabuhay',
            'hero_description' => $about?->hero_description ?? 'A progressive local government unit committed to transparent, efficient, and citizen-centered governance.',
            'overview_badge' => $about?->overview_badge ?? 'Municipality Overview',
            'overview_title' => $about?->overview_title ?? 'About Mabuhay',
            'overview_paragraphs' => $about?->overview_paragraphs ?? [
                'The Municipality of Mabuhay is a 4th class municipality in the province of Zamboanga Sibugay, Philippines. Known for its rich cultural heritage and agricultural community, Mabuhay is committed to progressive governance and sustainable local development.',
                'The municipal government continues to foster economic growth, improve public education and health services, and strengthen environmental stewardship through responsive, people-centered administration.',
                'Through digital governance initiatives and coordinated public service delivery, LGU Mabuhay aims to make government services more accessible, transparent, and empowering for every resident.',
            ],
            'overview_highlights' => $about?->overview_highlights ?? [
                'Digital service access and public information support',
                'Community-based programs for agriculture and livelihoods',
                'Health, education, and inclusive municipal coordination',
            ],
            'media_badge' => $about?->media_badge ?? 'Media Feature',
            'media_title' => $about?->media_title ?? 'Municipal Video Showcase',
            'media_preview_image' => $about?->media_preview_image,
            'media_video' => $about?->media_video,
            'media_overlay_title' => $about?->media_overlay_title ?? 'Mabuhay Overview Video',
            'media_overlay_description' => $about?->media_overlay_description ?? 'Replace this showcase with the official LGU Mabuhay video presentation, tourism reel, or public service introduction when media is ready.',
            'media_footer_left' => $about?->media_footer_left ?? 'Video Player Placeholder',
            'media_footer_right' => $about?->media_footer_right ?? '16:9 Presentation Area',
            'priorities_title' => $about?->priorities_title ?? 'Governance Priorities',
            'priorities_items' => $about?->priorities_items ?? [
                [
                    'id' => 'priority-1',
                    'title' => 'Good Governance',
                    'description' => 'Transparent decision-making and accountable public service systems.',
                ],
                [
                    'id' => 'priority-2',
                    'title' => 'Inclusive Growth',
                    'description' => 'Community development through agriculture, education, health, and livelihood support.',
                ],
                [
                    'id' => 'priority-3',
                    'title' => 'Digital Access',
                    'description' => 'Improved citizen access to information and municipal programs through digital tools.',
                ],
            ],
        ];
    }

    private function buildStoredFileName(string $prefix, string $extension): string
    {
        return now()->timestamp . '_' . $prefix . '.' . $extension;
    }
}
