<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FixedSectionContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $imageRules = ['nullable', 'image', 'max:5048', 'mimes:png,jpg,jpeg,webp'];
        $pdfRules = ['nullable', 'file', 'mimes:pdf', 'max:10240'];

        if ($this->routeIs(
            'admin.projects.store',
            'admin.resources.store',
            'admin.social-services.store',
            'admin.tourism.store',
            'admin.dost-services.store',
        )) {
            $imageRules[0] = 'required';
        }

        return [
            'tab_id' => ['required', 'string', 'max:120'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => $imageRules,
            'pdf' => $pdfRules,
            'is_active' => ['boolean'],
        ];
    }
}
