<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_key',
        'hero_logo',
        'hero_logo_alt',
        'hero_title',
        'hero_description',
        'overview_badge',
        'overview_title',
        'overview_paragraphs',
        'overview_highlights',
        'media_badge',
        'media_title',
        'media_preview_image',
        'media_video',
        'organization_mayor_name',
        'organization_mayor_role',
        'organization_mayor_image',
        'organization_vice_mayor_name',
        'organization_vice_mayor_role',
        'organization_vice_mayor_image',
        'organization_council_members',
        'lgu_badge',
        'lgu_subtitle',
        'lgu_title',
        'lgu_logo',
        'lgu_barangays',
        'media_overlay_title',
        'media_overlay_description',
        'media_footer_left',
        'media_footer_right',
        'priorities_title',
        'priorities_items',
    ];

    protected $casts = [
        'overview_paragraphs' => 'array',
        'overview_highlights' => 'array',
        'organization_council_members' => 'array',
        'lgu_barangays' => 'array',
        'priorities_items' => 'array',
    ];
}
