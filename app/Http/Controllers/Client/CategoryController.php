<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            'about-lgu-mabuhay' => 'Client/Sub/AboutLguMabuhay',
            'dost-services' => 'Client/Sub/DostServices',
            'lgu-mabuhay-projects' => 'Client/Sub/LguMabuhayProjects',
            'resources' => 'Client/Sub/Resources',
            'social-services' => 'Client/Sub/SocialServices',
            'tourism' => 'Client/Sub/Tourism',
        ];
    }

}
