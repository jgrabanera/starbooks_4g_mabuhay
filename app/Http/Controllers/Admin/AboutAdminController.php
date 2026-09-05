<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AboutContentRequest;
use App\Models\About;
use App\Models\AboutBarangay;
use App\Models\AboutCouncilMember;
use App\Models\AboutPriority;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AboutAdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/About', [
            'aboutContent' => $this->buildFormData($this->loadAboutRecord()),
        ]);
    }

    public function update(AboutContentRequest $request): RedirectResponse
    {
        $about = About::query()->firstOrNew([
            'page_key' => 'about-lgu-mabuhay',
        ]);

        $validated = $request->validated();
        $payload = ['page_key' => 'about-lgu-mabuhay'];
        $section = $validated['section'] ?? null;

        if ($section === 'lgu' || $section === null) {
            $validated['lgu_barangays'] = $this->storeBarangayCaptainImages(
                $request,
                $about,
                $validated['lgu_barangays'],
            );
        }

        if ($section === 'about' || $section === null) {
            $payload = array_merge($payload, $this->buildAboutPayload($request, $about, $validated));
        }

        if ($section === 'organization' || $section === null) {
            $payload = array_merge($payload, $this->buildOrganizationPayload($request, $about, $validated));
        }

        if ($section === 'lgu' || $section === null) {
            $payload = array_merge($payload, $this->buildLguPayload($request, $about, $validated));
        }

        $about->fill($payload)->save();

        if ($this->prioritiesTableExists() && ($section === 'about' || $section === null)) {
            $this->syncPriorities($about, $validated);
        }

        if ($this->councilMembersTableExists() && ($section === 'organization' || $section === null)) {
            $this->syncCouncilMembers($request, $about, $validated);
        }

        if ($this->barangaysTablesExist() && ($section === 'lgu' || $section === null)) {
            $this->syncBarangays($about, $validated);
        }

        if ($this->usesNormalizedTables()) {
            $about->refresh()->load([
                'priorities',
                'councilMembers',
                'barangays.kagawads',
            ]);

            $about->forceFill([
                'priorities_items' => $this->buildPriorityItemsFromRelations($about),
                'organization_council_members' => $this->buildCouncilMembersFromRelations($about),
                'lgu_barangays' => $this->buildBarangaysFromRelations($about),
            ])->save();
        }

        return to_route('admin.about.index');
    }

    private function buildAboutPayload(AboutContentRequest $request, About $about, array $validated): array
    {
        $priorityItems = collect($validated['priorities_items'])
            ->values()
            ->map(fn (array $item, int $index) => [
                'id' => $item['id'] ?? 'priority-' . ($index + 1),
                'title' => trim($item['title']),
                'description' => trim($item['description']),
            ])
            ->all();

        $payload = [
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
            'priorities_items' => $priorityItems,
        ];

        if ($request->hasFile('hero_logo')) {
            $heroLogoPath = $request->file('hero_logo')->storeAs(
                'images/thumbnails',
                $this->buildStoredFileName('about-hero-logo', $request->file('hero_logo')->extension()),
                'public',
            );

            if (! empty($about->hero_logo)) {
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

            if (! empty($about->media_preview_image)) {
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

            if (! empty($about->media_video)) {
                Storage::disk('public')->delete('videos/about/' . $about->media_video);
            }

            $payload['media_video'] = basename($mediaVideoPath);
        }

        return $payload;
    }

    private function buildOrganizationPayload(AboutContentRequest $request, About $about, array $validated): array
    {
        $existingMembers = collect($about->organization_council_members ?? [])
            ->keyBy(fn (array $member) => (string) ($member['id'] ?? ''));

        $councilMembers = collect($validated['organization_council_members'])
            ->values()
            ->map(function (array $member, int $index) use ($request, $existingMembers) {
                $memberId = (string) ($member['id'] ?? 'member-' . ($index + 1));
                $storedImage = $existingMembers->get($memberId)['image'] ?? null;

                if ($request->hasFile("organization_council_members.$index.image")) {
                    $uploadedImage = $request->file("organization_council_members.$index.image");
                    $storedPath = $uploadedImage->storeAs(
                        'images/thumbnails',
                        $this->buildStoredFileName('organization-council-member-' . ($index + 1), $uploadedImage->extension()),
                        'public',
                    );

                    if (! empty($storedImage)) {
                        Storage::disk('public')->delete('images/thumbnails/' . $storedImage);
                    }

                    $storedImage = basename($storedPath);
                }

                return [
                    'id' => $memberId,
                    'name' => trim($member['name']),
                    'role' => trim($member['role']),
                    'category' => $member['category'],
                    'area_of_expertise' => filled($member['area_of_expertise'] ?? null)
                        ? trim($member['area_of_expertise'])
                        : null,
                    'display_order' => (int) $member['display_order'],
                    'image' => $storedImage,
                ];
            })
            ->all();

        $payload = [
            'organization_mayor_name' => trim($validated['organization_mayor_name']),
            'organization_mayor_role' => trim($validated['organization_mayor_role']),
            'organization_vice_mayor_name' => trim($validated['organization_vice_mayor_name']),
            'organization_vice_mayor_role' => trim($validated['organization_vice_mayor_role']),
            'organization_council_members' => $councilMembers,
        ];

        if ($request->hasFile('organization_mayor_image')) {
            $storedPath = $request->file('organization_mayor_image')->storeAs(
                'images/thumbnails',
                $this->buildStoredFileName('organization-mayor', $request->file('organization_mayor_image')->extension()),
                'public',
            );

            if (! empty($about->organization_mayor_image)) {
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

            if (! empty($about->organization_vice_mayor_image)) {
                Storage::disk('public')->delete('images/thumbnails/' . $about->organization_vice_mayor_image);
            }

            $payload['organization_vice_mayor_image'] = basename($storedPath);
        }

        return $payload;
    }

    private function buildLguPayload(AboutContentRequest $request, About $about, array $validated): array
    {
        $existingBarangays = collect($about->lgu_barangays ?? []);

        $payload = [
            'lgu_badge' => trim($validated['lgu_badge']),
            'lgu_subtitle' => trim($validated['lgu_subtitle']),
            'lgu_title' => trim($validated['lgu_title']),
            'lgu_barangays' => collect($validated['lgu_barangays'])
                ->values()
                ->map(function (array $barangay, int $index) use ($existingBarangays) {
                    $matchedBarangay = $this->findMatchingLegacyBarangay(
                        $existingBarangays,
                        [
                            'id' => $barangay['id'] ?? ($index + 1),
                            'reference' => trim($barangay['reference']),
                            'title' => trim($barangay['title']),
                        ],
                    );

                    return array_merge(
                        $matchedBarangay ?? [],
                        [
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
                        ],
                    );
                })
                ->all(),
        ];

        if ($request->hasFile('lgu_logo')) {
            $storedPath = $request->file('lgu_logo')->storeAs(
                'images/thumbnails',
                $this->buildStoredFileName('lgu-logo', $request->file('lgu_logo')->extension()),
                'public',
            );

            if (! empty($about->lgu_logo)) {
                Storage::disk('public')->delete('images/thumbnails/' . $about->lgu_logo);
            }

            $payload['lgu_logo'] = basename($storedPath);
        }

        return $payload;
    }

    private function storeBarangayCaptainImages(AboutContentRequest $request, About $about, array $barangays): array
    {
        $existingBarangays = collect($about->lgu_barangays ?? []);

        return collect(array_values($barangays))
            ->map(function (array $barangay, int $index) use ($request, $existingBarangays): array {
                $matchedBarangay = $this->findMatchingLegacyBarangay(
                    $existingBarangays,
                    [
                        'id' => $barangay['id'] ?? ($index + 1),
                        'reference' => trim($barangay['reference']),
                        'title' => trim($barangay['title']),
                    ],
                );
                $storedImage = $matchedBarangay['captain_image'] ?? ($barangay['captain_image'] ?? null);

                if ($request->hasFile("lgu_barangays.$index.captain_image_file")) {
                    $uploadedImage = $request->file("lgu_barangays.$index.captain_image_file");
                    $storedPath = $uploadedImage->storeAs(
                        'images/thumbnails',
                        $this->buildStoredFileName('barangay-captain-' . ($index + 1), $uploadedImage->extension()),
                        'public',
                    );

                    if (! empty($storedImage)) {
                        Storage::disk('public')->delete('images/thumbnails/' . $storedImage);
                    }

                    $storedImage = basename($storedPath);
                }

                $barangay['captain_image'] = $storedImage;
                unset($barangay['captain_image_file']);

                return $barangay;
            })
            ->all();
    }

    private function buildFormData(?About $about): array
    {
        $priorityItems = $this->buildPriorityItemsForForm($about);
        $councilMembers = $this->buildCouncilMembersForForm($about);
        $barangays = $this->buildBarangaysForForm($about);

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
            'organization_council_members' => $councilMembers,
            'lgu_badge' => $about?->lgu_badge ?? 'Barangay Reference Collection',
            'lgu_subtitle' => $about?->lgu_subtitle ?? 'Municipal Directory Layout Preview',
            'lgu_title' => $about?->lgu_title ?? 'Municipality of Mabuhay',
            'lgu_logo' => $about?->lgu_logo,
            'lgu_barangays' => $barangays,
            'media_overlay_title' => $about?->media_overlay_title ?? 'Mabuhay Overview Video',
            'media_overlay_description' => $about?->media_overlay_description ?? 'Replace this showcase with the official LGU Mabuhay video presentation, tourism reel, or public service introduction when media is ready.',
            'media_footer_left' => $about?->media_footer_left ?? 'Video Player Placeholder',
            'media_footer_right' => $about?->media_footer_right ?? '16:9 Presentation Area',
            'priorities_title' => $about?->priorities_title ?? 'Governance Priorities',
            'priorities_items' => $priorityItems,
        ];
    }

    private function buildPriorityItemsForForm(?About $about): array
    {
        if ($about !== null && $this->prioritiesTableExists() && $about->relationLoaded('priorities') && $about->priorities->isNotEmpty()) {
            return $about->priorities
                ->map(fn (AboutPriority $priority) => [
                    'id' => (string) $priority->id,
                    'title' => $priority->title,
                    'description' => $priority->description,
                ])
                ->all();
        }

        return $about?->priorities_items ?? [
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
        ];
    }

    private function buildCouncilMembersForForm(?About $about): array
    {
        if ($about !== null && $this->councilMembersTableExists() && $about->relationLoaded('councilMembers') && $about->councilMembers->isNotEmpty()) {
            return $about->councilMembers
                ->map(fn (AboutCouncilMember $member) => [
                    'id' => (string) $member->id,
                    'name' => $member->name,
                    'role' => $member->role,
                    'category' => $member->category,
                    'area_of_expertise' => $member->area_of_expertise,
                    'display_order' => max(1, $member->display_order),
                    'image' => null,
                    'current_image' => $member->image,
                ])
                ->all();
        }

        return collect($about?->organization_council_members ?? [
            ['id' => 'member-1', 'name' => 'Maria Pilar T. Adlaon', 'role' => 'Council Member', 'image' => null],
            ['id' => 'member-2', 'name' => 'Majin V. Andak Sr.', 'role' => 'Council Member', 'image' => null],
            ['id' => 'member-3', 'name' => 'Alvarez H. Dammang', 'role' => 'Council Member', 'image' => null],
        ])
            ->map(fn (array $member, int $index) => [
                'id' => (string) ($member['id'] ?? 'member-' . ($index + 1)),
                'name' => $member['name'] ?? '',
                'role' => $member['role'] ?? 'Council Member',
                'category' => $member['category'] ?? 'sangguniang_bayan',
                'area_of_expertise' => $member['area_of_expertise'] ?? '',
                'display_order' => max(1, (int) ($member['display_order'] ?? $index + 1)),
                'image' => null,
                'current_image' => $member['image'] ?? null,
            ])
            ->values()
            ->all();
    }

    private function buildBarangaysForForm(?About $about): array
    {
        if ($about !== null && $this->barangaysTablesExist() && $about->relationLoaded('barangays') && $about->barangays->isNotEmpty()) {
            $legacyBarangays = collect($about->lgu_barangays ?? []);

            return $about->barangays
                ->map(function (AboutBarangay $barangay) use ($legacyBarangays) {
                    $matchedBarangay = $this->findMatchingLegacyBarangay(
                        $legacyBarangays,
                        [
                            'id' => $barangay->id,
                            'reference' => $barangay->reference,
                            'title' => $barangay->title,
                        ],
                    );

                    return array_merge(
                        $matchedBarangay ?? [],
                        [
                            'id' => $barangay->id,
                            'title' => $barangay->title,
                            'reference' => $barangay->reference,
                            'population' => $barangay->population,
                            'captain_image' => $barangay->captain_image,
                            'officials' => [
                                'captain' => $barangay->captain_name,
                                'secretary' => $barangay->secretary_name,
                                'treasurer' => $barangay->treasurer_name,
                                'skChairperson' => $barangay->sk_chairperson_name,
                                'kagawads' => $barangay->kagawads->pluck('name')->values()->all(),
                            ],
                        ],
                    );
                })
                ->all();
        }

        return $about?->lgu_barangays ?? [
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
        ];
    }

    private function syncPriorities(About $about, array $validated): void
    {
        $existingPriorities = $about->priorities()->get()->keyBy('id');
        $keptPriorityIds = [];

        foreach (array_values($validated['priorities_items']) as $index => $item) {
            $priorityId = is_numeric($item['id'] ?? null) ? (int) $item['id'] : null;
            $priority = $priorityId !== null ? $existingPriorities->get($priorityId) : null;

            if ($priority === null) {
                $priority = new AboutPriority();
                $priority->about()->associate($about);
            }

            $priority->fill([
                'title' => trim($item['title']),
                'description' => trim($item['description']),
                'display_order' => $index,
            ])->save();

            $keptPriorityIds[] = $priority->id;
        }

        $query = $about->priorities();

        if ($keptPriorityIds !== []) {
            $query->whereNotIn('id', $keptPriorityIds)->delete();

            return;
        }

        $query->delete();
    }

    private function syncCouncilMembers(AboutContentRequest $request, About $about, array $validated): void
    {
        $existingMembers = $about->councilMembers()->get()->keyBy('id');
        $keptMemberIds = [];

        foreach (array_values($validated['organization_council_members']) as $index => $item) {
            $memberId = is_numeric($item['id'] ?? null) ? (int) $item['id'] : null;
            $member = $memberId !== null ? $existingMembers->get($memberId) : null;
            $storedImage = $member?->image;

            if ($request->hasFile("organization_council_members.$index.image")) {
                $uploadedImage = $request->file("organization_council_members.$index.image");
                $storedPath = $uploadedImage->storeAs(
                    'images/thumbnails',
                    $this->buildStoredFileName('organization-council-member-' . ($index + 1), $uploadedImage->extension()),
                    'public',
                );

                if (! empty($storedImage)) {
                    Storage::disk('public')->delete('images/thumbnails/' . $storedImage);
                }

                $storedImage = basename($storedPath);
            }

            if ($member === null) {
                $member = new AboutCouncilMember();
                $member->about()->associate($about);
            }

            $member->fill([
                'name' => trim($item['name']),
                'role' => trim($item['role']),
                'category' => $item['category'],
                'area_of_expertise' => filled($item['area_of_expertise'] ?? null)
                    ? trim($item['area_of_expertise'])
                    : null,
                'image' => $storedImage,
                'display_order' => (int) $item['display_order'],
            ])->save();

            $keptMemberIds[] = $member->id;
        }

        $membersToDelete = $about->councilMembers()
            ->when($keptMemberIds !== [], fn ($query) => $query->whereNotIn('id', $keptMemberIds))
            ->when($keptMemberIds === [], fn ($query) => $query)
            ->get();

        $membersToDelete->each(function (AboutCouncilMember $member): void {
            if (! empty($member->image)) {
                Storage::disk('public')->delete('images/thumbnails/' . $member->image);
            }

            $member->delete();
        });
    }

    private function syncBarangays(About $about, array $validated): void
    {
        $existingBarangays = $about->barangays()->with('kagawads')->get()->keyBy('id');
        $keptBarangayIds = [];

        foreach (array_values($validated['lgu_barangays']) as $index => $item) {
            $barangayId = is_numeric($item['id'] ?? null) ? (int) $item['id'] : null;
            $barangay = $barangayId !== null ? $existingBarangays->get($barangayId) : null;

            if ($barangay === null) {
                $barangay = new AboutBarangay();
                $barangay->about()->associate($about);
            }

            $barangay->fill([
                'title' => trim($item['title']),
                'reference' => trim($item['reference']),
                'population' => (int) $item['population'],
                'captain_image' => $item['captain_image'] ?? null,
                'captain_name' => trim($item['officials']['captain']),
                'secretary_name' => trim($item['officials']['secretary']),
                'treasurer_name' => trim($item['officials']['treasurer']),
                'sk_chairperson_name' => trim($item['officials']['skChairperson']),
                'display_order' => $index,
            ])->save();

            $keptBarangayIds[] = $barangay->id;
            $this->syncBarangayKagawads($barangay, collect($item['officials']['kagawads'] ?? []));
        }

        $query = $about->barangays();

        if ($keptBarangayIds !== []) {
            $query->whereNotIn('id', $keptBarangayIds)->delete();

            return;
        }

        $query->delete();
    }

    private function syncBarangayKagawads(AboutBarangay $barangay, Collection $kagawads): void
    {
        $barangay->kagawads()->delete();

        $kagawads
            ->map(fn ($name) => trim((string) $name))
            ->filter()
            ->values()
            ->each(function (string $name, int $index) use ($barangay): void {
                $barangay->kagawads()->create([
                    'name' => $name,
                    'display_order' => $index,
                ]);
            });
    }

    private function buildPriorityItemsFromRelations(About $about): array
    {
        return $about->priorities
            ->map(fn (AboutPriority $priority) => [
                'id' => (string) $priority->id,
                'title' => $priority->title,
                'description' => $priority->description,
            ])
            ->values()
            ->all();
    }

    private function buildCouncilMembersFromRelations(About $about): array
    {
        return $about->councilMembers
            ->map(fn (AboutCouncilMember $member) => [
                'id' => (string) $member->id,
                'name' => $member->name,
                'role' => $member->role,
                'category' => $member->category,
                'area_of_expertise' => $member->area_of_expertise,
                'display_order' => $member->display_order,
                'image' => $member->image,
            ])
            ->values()
            ->all();
    }

    private function buildBarangaysFromRelations(About $about): array
    {
        $legacyBarangays = collect($about->lgu_barangays ?? []);

        return $about->barangays
            ->map(function (AboutBarangay $barangay) use ($legacyBarangays) {
                $matchedBarangay = $this->findMatchingLegacyBarangay(
                    $legacyBarangays,
                    [
                        'id' => $barangay->id,
                        'reference' => $barangay->reference,
                        'title' => $barangay->title,
                    ],
                );

                return array_merge(
                    $matchedBarangay ?? [],
                    [
                        'id' => $barangay->id,
                        'title' => $barangay->title,
                        'reference' => $barangay->reference,
                        'population' => $barangay->population,
                        'captain_image' => $barangay->captain_image,
                        'officials' => [
                            'captain' => $barangay->captain_name,
                            'secretary' => $barangay->secretary_name,
                            'treasurer' => $barangay->treasurer_name,
                            'skChairperson' => $barangay->sk_chairperson_name,
                            'kagawads' => $barangay->kagawads->pluck('name')->values()->all(),
                        ],
                    ],
                );
            })
            ->values()
            ->all();
    }

    private function findMatchingLegacyBarangay(Collection $legacyBarangays, array $match): ?array
    {
        $matchedBarangay = $legacyBarangays->first(function ($barangay) use ($match) {
            return (string) ($barangay['id'] ?? '') === (string) ($match['id'] ?? '')
                || (! empty($match['reference']) && ($barangay['reference'] ?? null) === $match['reference'])
                || (! empty($match['title']) && ($barangay['title'] ?? null) === $match['title']);
        });

        return is_array($matchedBarangay) ? $matchedBarangay : null;
    }

    private function loadAboutRecord(): ?About
    {
        $query = About::query()->where('page_key', 'about-lgu-mabuhay');

        if ($this->usesNormalizedTables()) {
            $query->with([
                'priorities',
                'councilMembers',
                'barangays.kagawads',
            ]);
        }

        return $query->first();
    }

    private function usesNormalizedTables(): bool
    {
        return $this->prioritiesTableExists()
            && $this->councilMembersTableExists()
            && $this->barangaysTablesExist();
    }

    private function prioritiesTableExists(): bool
    {
        return Schema::hasTable('about_priorities');
    }

    private function councilMembersTableExists(): bool
    {
        return Schema::hasTable('about_council_members');
    }

    private function barangaysTablesExist(): bool
    {
        return Schema::hasTable('about_barangays')
            && Schema::hasTable('about_barangay_kagawads');
    }

    private function buildStoredFileName(string $prefix, string $extension): string
    {
        return now()->timestamp . '_' . $prefix . '.' . $extension;
    }
}
