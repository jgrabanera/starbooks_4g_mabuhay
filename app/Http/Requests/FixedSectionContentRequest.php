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
        $pdfRules = ['nullable', 'file', 'mimes:pdf', 'max:20480'];
        $videoRules = ['nullable', 'file', 'mimes:mp4,webm,mov', 'max:71680'];

        if ($this->routeIs(
            'admin.projects.store',
            'admin.lgu-resources.store',
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
            'video' => $videoRules,
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'video.max' => 'The video file must not be larger than 70 MB.',
            'pdf.max' => 'The PDF file must not be larger than 20 MB.',
        ];
    }
}
