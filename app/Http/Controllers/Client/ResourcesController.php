<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class ResourcesController extends Controller
{
    public function content(): JsonResponse
    {
        $category = Category::query()
            ->where('slug', 'resources')
            ->where('is_active', true)
            ->firstOrFail(['id', 'title', 'slug']);

        $contents = $category->subCategories()
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
            'resources', 'memorandum' => 'resources',
            default => $tabId,
        };
    }
}
