<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubCategoryRequest;
use App\Models\Category;
use App\Models\SubCategory;
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
        ]);
    }

    public function getData()
    {
        $contents = SubCategory::query()
            ->with('category:id,title,tabs')
            ->orderByDesc('id')
            ->get();

        return response()->json($contents);
    }

    public function store(SubCategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $slug = Str::slug($validated['title']);
        $imageName = $request->file('image')->storeAs(
            'images/thumbnails',
            $this->buildImageName($slug, $request->file('image')->extension()),
            'public',
        );

        SubCategory::create([
            'category_id' => (int) $validated['category_id'],
            'tab_id' => $validated['tab_id'],
            'title' => trim($validated['title']),
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'image' => basename($imageName),
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return to_route('admin.contents.index');
    }

    public function update(SubCategoryRequest $request, SubCategory $content): RedirectResponse
    {
        $validated = $request->validated();
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
                $this->buildImageName($slug, $request->file('image')->extension()),
                'public',
            );

            if (!empty($content->image)) {
                Storage::disk('public')->delete('images/thumbnails/' . $content->image);
            }

            $payload['image'] = basename($imageName);
        }

        $content->update($payload);

        return to_route('admin.contents.index');
    }

    public function destroy(SubCategory $content): RedirectResponse
    {
        if (!empty($content->image)) {
            Storage::disk('public')->delete('images/thumbnails/' . $content->image);
        }

        $content->delete();

        return to_route('admin.contents.index');
    }

    private function buildImageName(string $slug, string $extension): string
    {
        return now()->timestamp . '_' . $slug . '.' . $extension;
    }
}
