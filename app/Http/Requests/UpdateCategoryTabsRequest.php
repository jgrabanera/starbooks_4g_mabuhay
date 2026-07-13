<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryTabsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tabs' => ['array', 'min:1', 'max:12'],
            'tabs.*.label' => ['required', 'string', 'max:80'],
        ];
    }

    public function messages(): array
    {
        return [
            'tabs.min' => 'Add at least one tab for this category.',
            'tabs.max' => 'You can add up to 12 tabs per category.',
            'tabs.*.label.required' => 'Each tab needs a label.',
            'tabs.*.label.max' => 'Each tab label must not be greater than 80 characters.',
        ];
    }
}
