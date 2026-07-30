<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\TourismContent;
use Illuminate\Http\JsonResponse;

class TourismController extends Controller
{
    public function content(): JsonResponse
    {
        $category = Category::query()
            ->where('slug', 'tourism')
            ->where('is_active', true)
            ->firstOrFail(['id', 'title', 'slug']);

        $contents = TourismContent::query()
            ->where('is_active', true)
            ->orderByDesc('id')
            ->get()
            ->map(function ($content) {
                return [
                    'id' => $content->id,
                    'title' => $content->title,
                    'slug' => $content->slug,
                    'description' => $content->description,
                    'tab_id' => $content->tab_id,
                    'normalized_tab_id' => $this->normalizeTabId($content->tab_id),
                    'image_url' => $content->image ? asset('storage/images/thumbnails/' . $content->image) : null,
                    'pdf_url' => $content->pdf ? asset('storage/documents/pdfs/' . $content->pdf) : null,
                    'published_at' => optional($content->created_at)?->toDateString(),
                    'published_label' => optional($content->created_at)?->format('F j, Y'),
                ];
            })
            ->values();

        return response()->json([
            'category' => $category,
            'contents' => $contents,
        ]);
    }

    private function normalizeTabId(?string $tabId): ?string
    {
        return match ($tabId) {
            'events', 'events-1' => 'events',
            'festivities', 'festivities-2' => 'festivities',
            'sites', 'tourism-sites-3' => 'sites',
            default => $tabId,
        };
    }
}
