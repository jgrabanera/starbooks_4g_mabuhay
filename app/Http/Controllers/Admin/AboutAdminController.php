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
            'organization_mayor_name' => trim($validated['organization_mayor_name']),
            'organization_mayor_role' => trim($validated['organization_mayor_role']),
            'organization_vice_mayor_name' => trim($validated['organization_vice_mayor_name']),
            'organization_vice_mayor_role' => trim($validated['organization_vice_mayor_role']),
            'organization_council_members' => collect($validated['organization_council_members'])
                ->values()
                ->map(fn (array $member, int $index) => [
                    'id' => $member['id'] ?? 'member-' . ($index + 1),
                    'name' => trim($member['name']),
                    'role' => trim($member['role']),
                    'image' => $member['image'] ?? null,
                ])
                ->all(),
            'lgu_badge' => trim($validated['lgu_badge']),
            'lgu_subtitle' => trim($validated['lgu_subtitle']),
            'lgu_title' => trim($validated['lgu_title']),
            'lgu_barangays' => collect($validated['lgu_barangays'])
                ->values()
                ->map(fn (array $barangay, int $index) => [
                    'id' => $barangay['id'] ?? ($index + 1),
                    'title' => trim($barangay['title']),
                    'reference' => trim($barangay['reference']),
                    'population' => (int) $barangay['population'],
                    'captain_image' => $barangay['captain_image'] ?? null,
                    'officials' => [
                        'captain' => trim($barangay['officials']['captain']),
                        'secretary' => trim($barangay['officials']['secretary']),
                        'treasurer' => trim($barangay['officials']['treasurer']),
                        'skChairperson' => trim($barangay['officials']['skChairperson']),
                        'kagawads' => array_values($barangay['officials']['kagawads']),
                    ],
                ])
                ->all(),
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

        if ($request->hasFile('organization_mayor_image')) {
            $storedPath = $request->file('organization_mayor_image')->storeAs(
                'images/thumbnails',
                $this->buildStoredFileName('organization-mayor', $request->file('organization_mayor_image')->extension()),
                'public',
            );

            if (!empty($about->organization_mayor_image)) {
                Storage::disk('public')->delete('images/thumbnails/' . $about->organization_mayor_image);
            }

            $payload['organization_mayor_image'] = basename($storedPath);
        }

        if ($request->hasFile('organization_vice_mayor_image')) {
            $storedPath = $request->file('organization_vice_mayor_image')->storeAs(
                'images/thumbnails',
                $this->buildStoredFileName('organization-vice-mayor', $request->file('organization_vice_mayor_image')->extension()),
                'public',
            );

            if (!empty($about->organization_vice_mayor_image)) {
                Storage::disk('public')->delete('images/thumbnails/' . $about->organization_vice_mayor_image);
            }

            $payload['organization_vice_mayor_image'] = basename($storedPath);
        }

        if ($request->hasFile('lgu_logo')) {
            $storedPath = $request->file('lgu_logo')->storeAs(
                'images/thumbnails',
                $this->buildStoredFileName('lgu-logo', $request->file('lgu_logo')->extension()),
                'public',
            );

            if (!empty($about->lgu_logo)) {
                Storage::disk('public')->delete('images/thumbnails/' . $about->lgu_logo);
            }

            $payload['lgu_logo'] = basename($storedPath);
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
            'organization_mayor_name' => $about?->organization_mayor_name ?? 'Hon. Edrelusa "Lulu" Calonge',
            'organization_mayor_role' => $about?->organization_mayor_role ?? 'Municipal Mayor',
            'organization_mayor_image' => $about?->organization_mayor_image,
            'organization_vice_mayor_name' => $about?->organization_vice_mayor_name ?? 'Hon. Joval John B. Samonte',
            'organization_vice_mayor_role' => $about?->organization_vice_mayor_role ?? 'Municipal Vice Mayor',
            'organization_vice_mayor_image' => $about?->organization_vice_mayor_image,
            'organization_council_members' => $about?->organization_council_members ?? [
                ['id' => 'member-1', 'name' => 'Maria Pilar T. Adlaon', 'role' => 'Council Member', 'image' => null],
                ['id' => 'member-2', 'name' => 'Majin V. Andak Sr.', 'role' => 'Council Member', 'image' => null],
                ['id' => 'member-3', 'name' => 'Alvarez H. Dammang', 'role' => 'Council Member', 'image' => null],
            ],
            'lgu_badge' => $about?->lgu_badge ?? 'Barangay Reference Collection',
            'lgu_subtitle' => $about?->lgu_subtitle ?? 'Municipal Directory Layout Preview',
            'lgu_title' => $about?->lgu_title ?? 'Municipality of Mabuhay',
            'lgu_logo' => $about?->lgu_logo,
            'lgu_barangays' => $about?->lgu_barangays ?? [
                [
                    'id' => 1,
                    'title' => 'Abunda',
                    'reference' => 'BRGY-001',
                    'population' => 893,
                    'captain_image' => null,
                    'officials' => [
                        'captain' => 'Juan Dela Cruz',
                        'secretary' => 'Maria Santos',
                        'treasurer' => 'Pedro Reyes',
                        'skChairperson' => 'Angela Flores',
                        'kagawads' => ['Ramon Garcia', 'Liza Mendoza'],
                    ],
                ],
            ],
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
