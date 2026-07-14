<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $imageRules = ['nullable', 'image', 'max:5048', 'mimes:png,jpg,jpeg,webp'];
        $pdfRules = ['nullable', 'file', 'mimes:pdf', 'max:10240'];

        if ($this->routeIs('admin.contents.store')) {
            $imageRules[0] = 'required';
        }

        return [
            'category_id' => ['required', 'exists:categories,id'],
            'tab_id' => ['required', 'string', 'max:120'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => $imageRules,
            'pdf' => $pdfRules,
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'The selected category is invalid.',
            'tab_id.required' => 'Please select a tab.',
            'title.required' => 'The content title is required.',
            'image.required' => 'The content image is required.',
            'image.image' => 'The uploaded file must be an image.',
            'image.max' => 'The image size must be less than 5MB.',
            'image.mimes' => 'The image must be a JPG, JPEG, PNG, or WEBP file.',
            'pdf.mimes' => 'The uploaded file must be a PDF.',
            'pdf.max' => 'The PDF size must be less than 10MB.',
        ];
    }
}
