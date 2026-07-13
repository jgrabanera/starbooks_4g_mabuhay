<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $categoryId = $this->route('category')?->id ?? $this->route('category');
        $imageRules = ['nullable', 'image', 'max:5048', 'mimes:png,jpg,jpeg,webp'];

        if ($this->isMethod('post')) {
            $imageRules[0] = 'required';
        }

        return [
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'title')->ignore($categoryId),
            ],
            'image' => $imageRules,
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The category title is required.',
            'title.unique' => 'The category title already exists.',
            'title.max' => 'The category title must not be greater than 255 characters.',
            'image.required' => 'The category image is required.',
            'image.image' => 'The uploaded file must be an image.',
            'image.max' => 'The image size must be less than 5MB.',
            'image.mimes' => 'The image must be a JPG, JPEG, PNG, or WEBP file.',
        ];
    }
}
