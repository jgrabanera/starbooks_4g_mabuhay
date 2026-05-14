<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    //
    public function publicIndex()
    {
        $subCategories = $this->subCategoriesTableIsReady()
            ? SubCategory::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('label')
                ->get($this->publicSubCategoryColumns())
            : [];

        return Inertia::render('Client/SubCategories', [
            'subCategories' => $subCategories
        ]);
    }

}
