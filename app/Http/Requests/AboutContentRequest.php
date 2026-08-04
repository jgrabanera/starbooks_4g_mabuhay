<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutContentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'hero_logo' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'hero_logo_alt' => ['nullable', 'string', 'max:255'],
            'hero_title' => ['required', 'string', 'max:255'],
            'hero_description' => ['required', 'string'],
            'overview_badge' => ['required', 'string', 'max:255'],
            'overview_title' => ['required', 'string', 'max:255'],
            'overview_paragraphs' => ['required', 'array', 'min:1'],
            'overview_paragraphs.*' => ['required', 'string'],
            'overview_highlights' => ['required', 'array', 'min:1'],
            'overview_highlights.*' => ['required', 'string', 'max:255'],
            'media_badge' => ['required', 'string', 'max:255'],
            'media_title' => ['required', 'string', 'max:255'],
            'media_preview_image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'media_video' => ['nullable', 'file', 'mimetypes:video/mp4,video/webm,video/quicktime', 'max:51200'],
            'media_overlay_title' => ['required', 'string', 'max:255'],
            'media_overlay_description' => ['required', 'string'],
            'media_footer_left' => ['required', 'string', 'max:255'],
            'media_footer_right' => ['required', 'string', 'max:255'],
            'priorities_title' => ['required', 'string', 'max:255'],
            'priorities_items' => ['required', 'array', 'min:1'],
            'priorities_items.*.title' => ['required', 'string', 'max:255'],
            'priorities_items.*.description' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'overview_paragraphs.required' => 'Add at least one overview paragraph.',
            'overview_paragraphs.*.required' => 'Overview paragraph fields cannot be empty.',
            'overview_highlights.required' => 'Add at least one highlight item.',
            'overview_highlights.*.required' => 'Highlight fields cannot be empty.',
            'media_video.mimetypes' => 'The uploaded video must be an MP4, WEBM, or MOV file.',
            'media_video.max' => 'The uploaded video must not be larger than 50 MB.',
            'priorities_items.required' => 'Add at least one governance priority.',
            'priorities_items.*.title.required' => 'Each priority needs a title.',
            'priorities_items.*.description.required' => 'Each priority needs a description.',
        ];
    }
}
