<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Categories');
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $slug = Str::slug($validated['title']);
        $imageName = $request->file('image')->storeAs(
            'images/thumbnails',
            $this->buildImageName($slug, $request->file('image')->extension()),
            'public',
        );

        Category::create([
            'title' => trim($validated['title']),
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'image' => basename($imageName),
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return to_route('admin.categories.index');
    }

    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        $validated = $request->validated();
        $slug = Str::slug($validated['title']);
        $payload = [
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

            if (!empty($category->image)) {
                Storage::disk('public')->delete('images/thumbnails/' . $category->image);
            }

            $payload['image'] = basename($imageName);
        }

        $category->update($payload);

        return to_route('admin.categories.index');
    }

    public function destroy(Category $category): RedirectResponse
    {
        if (!empty($category->image)) {
            Storage::disk('public')->delete('images/thumbnails/' . $category->image);
        }

        $category->delete();

        return to_route('admin.categories.index');
    }

    private function buildImageName(string $slug, string $extension): string
    {
        return now()->timestamp . '_' . $slug . '.' . $extension;
    }
}
