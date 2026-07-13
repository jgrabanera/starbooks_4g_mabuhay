<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'image',
        'tabs',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'tabs' => 'array',
    ];

}
