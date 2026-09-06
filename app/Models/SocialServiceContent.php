<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialServiceContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'tab_id',
        'title',
        'slug',
        'description',
        'image',
        'pdf',
        'video',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
