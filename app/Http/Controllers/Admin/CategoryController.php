<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CategoryController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Categories');
    }

    public function getData(Request $request)
    {
        $category = Category::orderBy('id', 'desc')->get();

        return response()->json($category);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate(

            [
                'title' => ['required', 'string', 'unique:categories'],
                'image' => ['required', 'image', 'max:5048', 'mimes:png,jpg,jpeg,webp'],
                'description' => ['required', 'string'],
                'is_active' => 'boolean',
            ],
            [
                'title.required' => 'Category title is required.',
                'title.unique' => 'Category title already exists. Please try other title.',
                'description.required' => 'Description is required in new category.',
                'image.required' => 'Image is required in new category.',
                'image.image' => 'File must be an image.',
                'image.max' => 'Image size should be less than 5MB.',
                'image.mimes' => 'Image file should be JPG, JPEG, PNG, or WEBP.',
            ]
        );

        $slug = Str::slug($validatedData['title']);
        $imagePath = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $slug . '.' . $file->getClientOriginalExtension();
            $file->storeAs('images/thumbnails', $filename, 'public');
            $imagePath = $filename;
        }


        $category = Category::create([
            'title' => $validatedData['title'],
            'slug' => $slug,
            'description' => $validatedData['description'] ?? null,
            'status' => $validatedData['status'] ?? null,
            'image' => $imagePath,
        ]);

        return response()->json([
            'status' => 'saved',
            'message' => 'Category created successfully',
            'data' => $category,
        ], 200);
    }

    public function update(Request $request, $id)
    {

        //return $request;
        $validated = $request->validate(
            [
                'title' => ['required', 'string', 'unique:categories,title,' . $id],
                'image' => ['nullable', 'image', 'mimes:png,jpg,jpeg', 'max:5048'],
                'description' => ['nullable', 'string'],
                'is_active' => 'boolean',
            ],
            [
                'title.required' => 'Category title is required.',
                'title.unique' => 'Category title already exists. ',
                'image.max' => 'Image size should be less than 5MB.',
            ]
        );

        $category = Category::findOrFail($id);
        $slug = Str::slug($validated['title']);
        $payload = [
            'title' => $validated['title'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'status' => $validated['status'] ?? null,
        ];
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $slug . '.' . $file->getClientOriginalExtension();
            $file->storeAs('images/thumbnails', $filename, 'public');

            if (!empty($category->image)) {
                Storage::disk('public')->delete('images/thumbnails/' . $category->image);
            }

            $payload['image'] = $filename;
        }
        $category->update($payload);
        return response()->json([
            'status' => 'updated',
            'message' => 'Category updated successfully',
        ], 200);
    }

    public function delete($id)
    {
        Categories::destroy($id);

        return response()->json([
            'status' => 'deleted',
            'message' => '',
        ], 200);
    }

}
