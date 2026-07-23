<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\UpdateCategoryTabsRequest;
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
        return Inertia::render('Admin/Categories', [
            'categories' => $this->categories(),
        ]);
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
            'display_order' => $validated['display_order'] ?? $this->nextDisplayOrder(),
            'tabs' => $this->defaultTabs(),
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
            'display_order' => $validated['display_order'] ?? $category->display_order,
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

    public function updateTabs(UpdateCategoryTabsRequest $request, Category $category): RedirectResponse
    {
        $validated = $request->validated();

        $category->update([
            'tabs' => $this->normalizeTabs($validated['tabs']),
        ]);

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

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, Category>
     */
    private function categories()
    {
        return Category::query()
            ->orderBy('display_order')
            ->orderByDesc('id')
            ->get(['id', 'title', 'slug', 'description', 'image', 'display_order', 'tabs', 'is_active']);
    }

    private function nextDisplayOrder(): int
    {
        return (int) Category::query()->max('display_order') + 1;
    }

    /**
     * @return array<int, array{id: string, label: string}>
     */
    private function defaultTabs(): array
    {
        return [
            [
                'id' => 'memorandum',
                'label' => 'Memorandum',
            ],
        ];
    }

    /**
     * @param  array<int, array{label: string}>  $tabs
     * @return array<int, array{id: string, label: string}>
     */
    private function normalizeTabs(array $tabs): array
    {
        return collect($tabs)
            ->map(function (array $tab, int $index): array {
                $label = trim($tab['label']);
                $slug = Str::slug($label);

                return [
                    'id' => $slug !== '' ? $slug . '-' . ($index + 1) : 'tab-' . ($index + 1),
                    'label' => $label,
                ];
            })
            ->values()
            ->all();
    }
}
