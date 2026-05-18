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

Route::get('/sub-categories', [App\Http\Controllers\Client\SubCategoryController::class, 'getData'])->name('client.sub-categories');

// Route::get('/', function () {
//     return Inertia::render('Home', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::middleware(['auth'])->group(function () {
    Route::get('/admin', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/get-categories', [App\Http\Controllers\Admin\DashboardController::class, 'getData'])->name('admin.get-categories');

    Route::get('/dashboard', fn() => redirect('/admin'))->name('dashboard');

    Route::get('/admin/categories', [App\Http\Controllers\Client\CategoryController::class, 'adminIndex'])
        ->name('admin.categories.index');


    Route::post('/admin/categories', [App\Http\Controllers\Client\CategoryController::class, 'store'])
        ->name('admin.categories.store');
    Route::put('/admin/categories/{category}', [App\Http\Controllers\Client\CategoryController::class, 'update'])
        ->name('admin.categories.update');
    Route::delete('/admin/categories/{category}', [App\Http\Controllers\Client\CategoryController::class, 'destroy'])
        ->name('admin.categories.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
