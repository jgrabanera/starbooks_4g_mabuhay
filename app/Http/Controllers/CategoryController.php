<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CategoryController extends Controller
{
    public function publicIndex(): Response
    {
        $categories = $this->categoriesTableIsReady()
            ? Category::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('label')
                ->get(['id', 'title', 'label', 'description', 'image'])
            : [];

        return Inertia::render('Client/Categories', [
            'categories' => $categories,
        ]);
    }

    public function adminIndex(): Response
    {
        if (!$this->categoriesTableIsReady()) {
            return Inertia::render('Admin/Categories', [
                'categories' => [],
                'setupNeeded' => true,
            ]);
        }

        return Inertia::render('Admin/Categories', [
            'categories' => Category::query()
                ->orderBy('sort_order')
                ->orderBy('label')
                ->get(),
            'setupNeeded' => false,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Category::create($this->validatedCategory($request));

        return back();
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $category->update($this->validatedCategory($request));

        return back();
    }

    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();

        return back();
    }

    private function validatedCategory(Request $request): array
    {
        return $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);
    }

    private function categoriesTableIsReady(): bool
    {
        if (!$this->databaseConnectionLooksAvailable()) {
            return false;
        }

        try {
            return Schema::hasTable('categories');
        } catch (Throwable) {
            return false;
        }
    }

    private function databaseConnectionLooksAvailable(): bool
    {
        $connection = config('database.default');
        $config = config("database.connections.{$connection}");

        if (($config['driver'] ?? null) !== 'mysql') {
            return true;
        }

        $socket = @fsockopen(
            $config['host'] ?? '127.0.0.1',
            (int) ($config['port'] ?? 3306),
            $errorCode,
            $errorMessage,
            0.2,
        );

        if ($socket === false) {
            return false;
        }

        fclose($socket);

        return true;
    }
}
