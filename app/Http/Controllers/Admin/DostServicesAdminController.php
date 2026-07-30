<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FixedSectionContentRequest;
use App\Models\Category;
use App\Models\DostServiceContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DostServicesAdminController extends Controller
{
    public function index(): Response
    {
        $sectionCategory = Category::query()
            ->where('slug', 'dost-services')
            ->first(['id', 'title', 'slug']);

        return Inertia::render('Admin/DostServices', [
            'sectionCategory' => $sectionCategory,
            'contents' => DostServiceContent::query()
                ->orderByDesc('id')
                ->get([
                    'id',
                    'tab_id',
                    'title',
                    'slug',
                    'description',
                    'image',
                    'pdf',
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

        DostServiceContent::create([
            'tab_id' => $validated['tab_id'],
            'title' => trim($validated['title']),
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'image' => basename($imageName),
            'pdf' => $pdfName ? basename($pdfName) : null,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return to_route('admin.dost-services.index');
    }

    public function update(FixedSectionContentRequest $request, DostServiceContent $dostService): RedirectResponse
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

            if (!empty($dostService->image)) {
                Storage::disk('public')->delete('images/thumbnails/' . $dostService->image);
            }

            $payload['image'] = basename($imageName);
        }

        if ($request->hasFile('pdf')) {
            $pdfName = $request->file('pdf')->storeAs(
                'documents/pdfs',
                $this->buildStoredFileName($slug, $request->file('pdf')->extension()),
                'public',
            );

            if (!empty($dostService->pdf)) {
                Storage::disk('public')->delete('documents/pdfs/' . $dostService->pdf);
            }

            $payload['pdf'] = basename($pdfName);
        }

        $dostService->update($payload);

        return to_route('admin.dost-services.index');
    }

    public function destroy(DostServiceContent $dostService): RedirectResponse
    {
        if (!empty($dostService->image)) {
            Storage::disk('public')->delete('images/thumbnails/' . $dostService->image);
        }

        if (!empty($dostService->pdf)) {
            Storage::disk('public')->delete('documents/pdfs/' . $dostService->pdf);
        }

        $dostService->delete();

        return to_route('admin.dost-services.index');
    }

    private function buildStoredFileName(string $slug, string $extension): string
    {
        return now()->timestamp . '_' . $slug . '.' . $extension;
    }
}
