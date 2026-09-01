<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/lgu-mabuhay-projects/contents', [App\Http\Controllers\Client\LguMabuhayProjectsController::class, 'content'])
    ->name('api.projects.contents');
Route::get('/lgu-resources/contents', [App\Http\Controllers\Client\LguResourcesController::class, 'content'])
    ->name('api.lgu-resources.contents');
Route::redirect('/resources/contents', '/api/lgu-resources/contents', 301)
    ->name('legacy.api.resources.contents');
Route::get('/social-services/contents', [App\Http\Controllers\Client\SocialServicesController::class, 'content'])
    ->name('api.social-services.contents');
Route::get('/tourism/contents', [App\Http\Controllers\Client\TourismController::class, 'content'])
    ->name('api.tourism.contents');
Route::get('/dost-services/contents', [App\Http\Controllers\Client\DostServicesController::class, 'content'])
    ->name('api.dost-services.contents');
