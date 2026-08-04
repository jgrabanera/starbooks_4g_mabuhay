<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutContentRequest extends FormRequest
{
    private const SECTION_ABOUT = 'about';

    private const SECTION_ORGANIZATION = 'organization';

    private const SECTION_LGU = 'lgu';

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
        $section = $this->input('section');

        return match ($section) {
            self::SECTION_ABOUT => $this->aboutRules(),
            self::SECTION_ORGANIZATION => $this->organizationRules(),
            self::SECTION_LGU => $this->lguRules(),
            default => array_merge(
                ['section' => ['nullable', 'string', 'in:about,organization,lgu']],
                $this->aboutRules(),
                $this->organizationRules(),
                $this->lguRules(),
            ),
        };
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
            'organization_council_members.required' => 'Add at least one council member.',
            'organization_council_members.*.name.required' => 'Each council member needs a name.',
            'organization_council_members.*.role.required' => 'Each council member needs a role.',
            'organization_council_members.*.image.mimes' => 'Council member images must be JPG, JPEG, PNG, or WEBP files.',
            'lgu_barangays.required' => 'Add at least one barangay.',
            'lgu_barangays.*.title.required' => 'Each barangay needs a title.',
            'lgu_barangays.*.reference.required' => 'Each barangay needs a reference code.',
            'lgu_barangays.*.population.required' => 'Each barangay needs a population value.',
            'lgu_barangays.*.officials.captain.required' => 'Each barangay needs a captain.',
            'lgu_barangays.*.officials.kagawads.required' => 'Each barangay needs at least one kagawad.',
            'priorities_items.required' => 'Add at least one governance priority.',
            'priorities_items.*.title.required' => 'Each priority needs a title.',
            'priorities_items.*.description.required' => 'Each priority needs a description.',
        ];
    }

    private function aboutRules(): array
    {
        return [
            'section' => ['required', 'string', 'in:about'],
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

    private function organizationRules(): array
    {
        return [
            'section' => ['required', 'string', 'in:organization'],
            'organization_mayor_name' => ['required', 'string', 'max:255'],
            'organization_mayor_role' => ['required', 'string', 'max:255'],
            'organization_mayor_image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'organization_vice_mayor_name' => ['required', 'string', 'max:255'],
            'organization_vice_mayor_role' => ['required', 'string', 'max:255'],
            'organization_vice_mayor_image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'organization_council_members' => ['required', 'array', 'min:1'],
            'organization_council_members.*.name' => ['required', 'string', 'max:255'],
            'organization_council_members.*.role' => ['required', 'string', 'max:255'],
            'organization_council_members.*.image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ];
    }

    private function lguRules(): array
    {
        return [
            'section' => ['required', 'string', 'in:lgu'],
            'lgu_badge' => ['required', 'string', 'max:255'],
            'lgu_subtitle' => ['required', 'string', 'max:255'],
            'lgu_title' => ['required', 'string', 'max:255'],
            'lgu_logo' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'lgu_barangays' => ['required', 'array', 'min:1'],
            'lgu_barangays.*.title' => ['required', 'string', 'max:255'],
            'lgu_barangays.*.reference' => ['required', 'string', 'max:255'],
            'lgu_barangays.*.population' => ['required', 'integer', 'min:0'],
            'lgu_barangays.*.officials.captain' => ['required', 'string', 'max:255'],
            'lgu_barangays.*.officials.secretary' => ['required', 'string', 'max:255'],
            'lgu_barangays.*.officials.treasurer' => ['required', 'string', 'max:255'],
            'lgu_barangays.*.officials.skChairperson' => ['required', 'string', 'max:255'],
            'lgu_barangays.*.officials.kagawads' => ['required', 'array', 'min:1'],
            'lgu_barangays.*.officials.kagawads.*' => ['required', 'string', 'max:255'],
        ];
    }
}
