<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AboutBarangay extends Model
{
    use HasFactory;

    protected $fillable = [
        'about_id',
        'title',
        'reference',
        'population',
        'captain_image',
        'captain_name',
        'secretary_name',
        'treasurer_name',
        'sk_chairperson_name',
        'display_order',
    ];

    public function about(): BelongsTo
    {
        return $this->belongsTo(About::class);
    }

    public function kagawads(): HasMany
    {
        return $this->hasMany(AboutBarangayKagawad::class)->orderBy('display_order');
    }
}
