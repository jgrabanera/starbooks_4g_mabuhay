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
        'priorities_items' => 'array',
    ];
}
