<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class DashboardController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function getData(Request $request)
    {
        $category = Category::orderBy('id', 'desc')->get();

        return response()->json($category);
    }

    // public function dashboard(): Response
    // {
    //     if (!$this->categoriesTableIsReady()) {
    //         return Inertia::render('Admin/Dashboard', [
    //             'stats' => [
    //                 'categories' => 0,
    //                 'active_categories' => 0,
    //             ],
    //             'latestCategories' => [],
    //             'setupNeeded' => true,
    //         ]);
    //     }

    //     return Inertia::render('Admin/Dashboard', [
    //         'stats' => [
    //             'categories' => Category::count(),
    //             'active_categories' => Category::where('is_active', true)->count(),
    //         ],
    //         'latestCategories' => Category::query()
    //             ->latest()
    //             ->take(5)
    //             ->get(['id', 'title', 'label', 'is_active']),
    //         'setupNeeded' => false,
    //     ]);
    // }

    // private function categoriesTableIsReady(): bool
    // {
    //     if (!$this->databaseConnectionLooksAvailable()) {
    //         return false;
    //     }

    //     try {
    //         return Schema::hasTable('categories')
    //             && Schema::hasColumn('categories', 'slug')
    //             && Schema::hasColumn('categories', 'image');
    //     } catch (Throwable) {
    //         return false;
    //     }
    // }

    // private function databaseConnectionLooksAvailable(): bool
    // {
    //     $connection = config('database.default');
    //     $config = config("database.connections.{$connection}");

    //     if (($config['driver'] ?? null) !== 'mysql') {
    //         return true;
    //     }

    //     $socket = @fsockopen(
    //         $config['host'] ?? '127.0.0.1',
    //         (int) ($config['port'] ?? 3306),
    //         $errorCode,
    //         $errorMessage,
    //         0.2,
    //     );

    //     if ($socket === false) {
    //         return false;
    //     }

    //     fclose($socket);

    //     return true;
    // }
}
