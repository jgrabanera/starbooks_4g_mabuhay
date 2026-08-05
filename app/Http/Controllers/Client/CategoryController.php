<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\AboutBarangay;
use App\Models\AboutCouncilMember;
use App\Models\AboutPriority;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Client/Categories');
    }

    public function getData(Request $request)
    {
        $category = Category::query()
            ->orderBy('display_order')
            ->orderByDesc('id')
            ->get();

        return response()->json($category);
    }

    public function show(string $slug): Response|RedirectResponse
    {
        if ($slug === 'about-lgu-mabuhay') {
            $about = $this->loadAboutRecord();

            return Inertia::render('Client/Sub/AboutLguMabuhay', [
                'aboutData' => $this->buildAboutData($about),
                'organizationData' => $this->buildOrganizationData($about),
                'lguData' => $this->buildLguData($about),
            ]);
        }

        $page = $this->categoryPages()[$slug] ?? null;

        if ($page === null) {
            return to_route('client.sub-categories', ['slug' => $slug]);
        }

        return Inertia::render($page);
    }

    public function store(Request $request)
    {
        $payload = $request->validate([
            'name' => ['required', 'string', 'max:100'],
        ]);

        $category = Category::create([
            'name' => trim($payload['name']),
        ]);

        $request->session()->put('username', $payload['name']);

        return response()->json([
            'message' => 'Category recorded successfully.',
            'category' => $category,
        ], 201);
    }

    /**
     * @return array<string, string>
     */
    private function categoryPages(): array
    {
        return [
            'dost-services' => 'Client/Sub/DostServices',
            'lgu-mabuhay-projects' => 'Client/Sub/LguMabuhayProjects',
            'resources' => 'Client/Sub/Resources',
            'social-services' => 'Client/Sub/SocialServices',
            'tourism' => 'Client/Sub/Tourism',
        ];
    }

    private function buildAboutData(?About $about): ?array
    {
        if ($about === null) {
            return null;
        }

        return [
            'hero' => [
                'logo' => $about->hero_logo
                    ? '/storage/images/thumbnails/' . $about->hero_logo
                    : '/assets/images/logos/lgu-mabuhay.png',
                'logoAlt' => $about->hero_logo_alt,
                'title' => $about->hero_title,
                'description' => $about->hero_description,
            ],
            'overview' => [
                'badge' => $about->overview_badge,
                'title' => $about->overview_title,
                'paragraphs' => $about->overview_paragraphs ?? [],
                'highlights' => $about->overview_highlights ?? [],
            ],
            'media' => [
                'badge' => $about->media_badge,
                'title' => $about->media_title,
                'previewImage' => $about->media_preview_image
                    ? '/storage/images/thumbnails/' . $about->media_preview_image
                    : '/assets/images/lgu_mabuhay.jpg',
                'videoUrl' => $about->media_video
                    ? '/storage/videos/about/' . $about->media_video
                    : null,
                'overlayTitle' => $about->media_overlay_title,
                'overlayDescription' => $about->media_overlay_description,
                'footerLeft' => $about->media_footer_left,
                'footerRight' => $about->media_footer_right,
            ],
            'priorities' => [
                'title' => $about->priorities_title,
                'items' => $this->buildPriorityItems($about),
            ],
        ];
    }

    private function buildOrganizationData(?About $about): ?array
    {
        if ($about === null) {
            return null;
        }

        return [
            'mayor' => [
                'name' => $about->organization_mayor_name,
                'role' => $about->organization_mayor_role,
                'image' => $about->organization_mayor_image
                    ? '/storage/images/thumbnails/' . $about->organization_mayor_image
                    : null,
            ],
            'viceMayor' => [
                'name' => $about->organization_vice_mayor_name,
                'role' => $about->organization_vice_mayor_role,
                'image' => $about->organization_vice_mayor_image
                    ? '/storage/images/thumbnails/' . $about->organization_vice_mayor_image
                    : null,
            ],
            'councilMembers' => $this->buildCouncilMembers($about),
        ];
    }

    private function buildLguData(?About $about): ?array
    {
        if ($about === null) {
            return null;
        }

        return [
            'badge' => $about->lgu_badge,
            'subtitle' => $about->lgu_subtitle,
            'title' => $about->lgu_title,
            'logo' => $about->lgu_logo
                ? '/storage/images/thumbnails/' . $about->lgu_logo
                : null,
            'barangays' => $this->buildBarangays($about),
        ];
    }

    private function buildPriorityItems(About $about): array
    {
        if ($this->prioritiesTableExists() && $about->relationLoaded('priorities') && $about->priorities->isNotEmpty()) {
            return $about->priorities
                ->map(fn (AboutPriority $priority) => [
                    'id' => $priority->id,
                    'title' => $priority->title,
                    'description' => $priority->description,
                ])
                ->values()
                ->all();
        }

        return $about->priorities_items ?? [];
    }

    private function buildCouncilMembers(About $about): array
    {
        if ($this->councilMembersTableExists() && $about->relationLoaded('councilMembers') && $about->councilMembers->isNotEmpty()) {
            return $about->councilMembers
                ->map(fn (AboutCouncilMember $member) => [
                    'id' => $member->id,
                    'name' => $member->name,
                    'role' => $member->role,
                    'image' => $member->image
                        ? '/storage/images/thumbnails/' . $member->image
                        : null,
                ])
                ->values()
                ->all();
        }

        return collect($about->organization_council_members ?? [])
            ->map(fn (array $member) => [
                'id' => $member['id'] ?? null,
                'name' => $member['name'] ?? null,
                'role' => $member['role'] ?? 'Council Member',
                'image' => ! empty($member['image'])
                    ? '/storage/images/thumbnails/' . $member['image']
                    : null,
            ])
            ->values()
            ->all();
    }

    private function buildBarangays(About $about): array
    {
        if ($this->barangaysTablesExist() && $about->relationLoaded('barangays') && $about->barangays->isNotEmpty()) {
            $legacyBarangays = collect($about->lgu_barangays ?? []);

            return $about->barangays
                ->map(function (AboutBarangay $barangay) use ($legacyBarangays) {
                    $matchedLegacyBarangay = $this->findMatchingLegacyBarangay(
                        $legacyBarangays,
                        [
                            'id' => $barangay->id,
                            'reference' => $barangay->reference,
                            'title' => $barangay->title,
                        ],
                    );

                    return array_merge(
                        $matchedLegacyBarangay ?? [],
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

        return $about->lgu_barangays ?? [];
    }

    private function findMatchingLegacyBarangay($legacyBarangays, array $match): ?array
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
}
