<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FixedSectionContentRequest;
use App\Models\Category;
use App\Models\TourismContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TourismAdminController extends Controller
{
    public function index(): Response
    {
        $sectionCategory = Category::query()
            ->where('slug', 'tourism')
            ->first(['id', 'title', 'slug']);

        return Inertia::render('Admin/Tourism', [
            'sectionCategory' => $sectionCategory,
            'contents' => TourismContent::query()
                ->orderByDesc('id')
                ->get([
                    'id',
                    'tab_id',
                    'title',
                    'slug',
                    'description',
                    'image',
                    'pdf',
                    'video',
                    'is_active',
                ]),
        ]);
    }

    public function store(FixedSectionContentRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $slug = Str::slug($validated['title']);

        $imageName = $request->file('image')->storeAs(
            'images/thumbnails',
            $this->buildStoredFileName($slug, $request->file('image')->extension()),
            'public',
        );

        $pdfName = $request->hasFile('pdf')
            ? $request->file('pdf')->storeAs(
                'documents/pdfs',
                $this->buildStoredFileName($slug, $request->file('pdf')->extension()),
                'public',
            )
            : null;

        $videoName = $request->hasFile('video')
            ? $request->file('video')->storeAs(
                'videos/tourism',
                $this->buildStoredFileName($slug, $request->file('video')->extension()),
                'public',
            )
            : null;

        TourismContent::create([
            'tab_id' => $validated['tab_id'],
            'title' => trim($validated['title']),
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'image' => basename($imageName),
            'pdf' => $pdfName ? basename($pdfName) : null,
            'video' => $videoName ? basename($videoName) : null,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return to_route('admin.tourism.index');
    }

    public function update(FixedSectionContentRequest $request, TourismContent $tourismContent): RedirectResponse
    {
        $validated = $request->validated();
        $slug = Str::slug($validated['title']);
        $payload = [
            'tab_id' => $validated['tab_id'],
            'title' => trim($validated['title']),
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ];

        if ($request->hasFile('image')) {
            $imageName = $request->file('image')->storeAs(
                'images/thumbnails',
                $this->buildStoredFileName($slug, $request->file('image')->extension()),
                'public',
            );

            if (! empty($tourismContent->image)) {
                Storage::disk('public')->delete('images/thumbnails/'.$tourismContent->image);
            }

            $payload['image'] = basename($imageName);
        }

        if ($request->hasFile('pdf')) {
            $pdfName = $request->file('pdf')->storeAs(
                'documents/pdfs',
                $this->buildStoredFileName($slug, $request->file('pdf')->extension()),
                'public',
            );

            if (! empty($tourismContent->pdf)) {
                Storage::disk('public')->delete('documents/pdfs/'.$tourismContent->pdf);
            }

            $payload['pdf'] = basename($pdfName);
        }

        if ($request->hasFile('video')) {
            $videoName = $request->file('video')->storeAs(
                'videos/tourism',
                $this->buildStoredFileName($slug, $request->file('video')->extension()),
                'public',
            );

            if (! empty($tourismContent->video)) {
                Storage::disk('public')->delete('videos/tourism/'.$tourismContent->video);
            }

            $payload['video'] = basename($videoName);
        }

        $tourismContent->update($payload);

        return to_route('admin.tourism.index');
    }

    public function destroy(TourismContent $tourismContent): RedirectResponse
    {
        if (! empty($tourismContent->image)) {
            Storage::disk('public')->delete('images/thumbnails/'.$tourismContent->image);
        }

        if (! empty($tourismContent->pdf)) {
            Storage::disk('public')->delete('documents/pdfs/'.$tourismContent->pdf);
        }

        if (! empty($tourismContent->video)) {
            Storage::disk('public')->delete('videos/tourism/'.$tourismContent->video);
        }

        $tourismContent->delete();

        return to_route('admin.tourism.index');
    }

    private function buildStoredFileName(string $slug, string $extension): string
    {
        return Str::uuid().'_'.$slug.'.'.$extension;
    }
}
