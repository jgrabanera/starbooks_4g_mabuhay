<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/categories', [App\Http\Controllers\Client\CategoryController::class, 'index'])->name('client.categories');  // Page
Route::get('/get-categories', [App\Http\Controllers\Client\CategoryController::class, 'getData'])->name('client.get-categories'); // API Data

Route::get('/categories/sub-categories/{slug}', [App\Http\Controllers\Client\SubCategoryController::class, 'index'])->name('client.sub-categories');


// Route::get('/', function () {
//     return Inertia::render('Home', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);l
// });

Route::middleware(['auth'])->group(function () {
    Route::get('/admin', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/get-categories', [App\Http\Controllers\Admin\DashboardController::class, 'getData'])->name('admin.get-categories');

    Route::get('/dashboard', fn() => redirect('/admin'))->name('dashboard');

    Route::get('/admin/categories', [App\Http\Controllers\Admin\CategoryController::class, 'index'])
        ->name('admin.categories.index');
    Route::get('/admin/contents', [App\Http\Controllers\Admin\SubCategoryController::class, 'index'])
        ->name('admin.contents.index');
    Route::get('/admin/get-contents', [App\Http\Controllers\Admin\SubCategoryController::class, 'getData'])
        ->name('admin.get-contents');

    Route::post('/admin/categories', [App\Http\Controllers\Admin\CategoryController::class, 'store'])
        ->name('admin.categories.store');
    Route::post('/admin/categories/{category}', [App\Http\Controllers\Admin\CategoryController::class, 'update'])
        ->name('admin.categories.update');
    Route::post('/admin/categories/{category}/tabs', [App\Http\Controllers\Admin\CategoryController::class, 'updateTabs'])
        ->name('admin.categories.tabs.update');
    Route::delete('/admin/categories/{category}', [App\Http\Controllers\Admin\CategoryController::class, 'destroy'])
        ->name('admin.categories.destroy');

    Route::post('/admin/contents', [App\Http\Controllers\Admin\SubCategoryController::class, 'store'])
        ->name('admin.contents.store');
    Route::post('/admin/contents/{content}', [App\Http\Controllers\Admin\SubCategoryController::class, 'update'])
        ->name('admin.contents.update');
    Route::delete('/admin/contents/{content}', [App\Http\Controllers\Admin\SubCategoryController::class, 'destroy'])
        ->name('admin.contents.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
