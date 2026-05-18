<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'title' => ['nullable', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:2048'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'label.required' => 'The category label is required.',
            'label.max' => 'The category label must not be greater than 255 characters.',
            'title.max' => 'The short title must not be greater than 255 characters.',
            'image.max' => 'The image path or URL must not be greater than 2048 characters.',
            'sort_order.required' => 'The sort order is required.',
            'sort_order.integer' => 'The sort order must be a whole number.',
            'sort_order.min' => 'The sort order must be at least 0.',
        ];
    }
}
