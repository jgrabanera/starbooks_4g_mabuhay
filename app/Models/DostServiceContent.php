<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DostServiceContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'tab_id',
        'title',
        'slug',
        'description',
        'image',
        'pdf',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
