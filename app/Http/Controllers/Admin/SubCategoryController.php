<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubCategoryRequest;
use App\Models\Category;
use App\Models\SubCategory;
use App\Support\FixedCmsSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SubCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Contents', [
            'categories' => Category::query()
                ->orderBy('title')
                ->get(['id', 'title', 'tabs']),
            'contents' => $this->contents(),
        ]);
    }

    public function store(SubCategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $category = Category::query()->findOrFail($validated['category_id']);
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

        SubCategory::create([
            'category_id' => (int) $validated['category_id'],
            'tab_id' => $validated['tab_id'],
            'title' => trim($validated['title']),
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'image' => basename($imageName),
            'pdf' => $pdfName ? basename($pdfName) : null,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return to_route($this->resolveAdminIndexRoute($category->slug));
    }

    public function update(SubCategoryRequest $request, SubCategory $content): RedirectResponse
    {
        $validated = $request->validated();
        $category = Category::query()->findOrFail($validated['category_id']);
        $slug = Str::slug($validated['title']);
        $payload = [
            'category_id' => (int) $validated['category_id'],
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

            if (!empty($content->image)) {
                Storage::disk('public')->delete('images/thumbnails/' . $content->image);
            }

            $payload['image'] = basename($imageName);
        }

        if ($request->hasFile('pdf')) {
            $pdfName = $request->file('pdf')->storeAs(
                'documents/pdfs',
                $this->buildStoredFileName($slug, $request->file('pdf')->extension()),
                'public',
            );

            if (!empty($content->pdf)) {
                Storage::disk('public')->delete('documents/pdfs/' . $content->pdf);
            }

            $payload['pdf'] = basename($pdfName);
        }

        $content->update($payload);

        return to_route($this->resolveAdminIndexRoute($category->slug));
    }

    public function destroy(SubCategory $content): RedirectResponse
    {
        $content->loadMissing('category:id,slug');

        if (!empty($content->image)) {
            Storage::disk('public')->delete('images/thumbnails/' . $content->image);
        }

        if (!empty($content->pdf)) {
            Storage::disk('public')->delete('documents/pdfs/' . $content->pdf);
        }

        $content->delete();

        return to_route($this->resolveAdminIndexRoute($content->category?->slug));
    }

    private function buildStoredFileName(string $slug, string $extension): string
    {
        return now()->timestamp . '_' . $slug . '.' . $extension;
    }

    private function resolveAdminIndexRoute(?string $categorySlug): string
    {
        return FixedCmsSection::resolveAdminIndexRoute($categorySlug);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, SubCategory>
     */
    private function contents()
    {
        return SubCategory::query()
            ->with('category:id,title,tabs')
            ->orderByDesc('id')
            ->get();
    }
}
