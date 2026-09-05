<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AboutCouncilMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'about_id',
        'name',
        'role',
        'category',
        'area_of_expertise',
        'image',
        'display_order',
    ];

    public function about(): BelongsTo
    {
        return $this->belongsTo(About::class);
    }
}
