<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AboutBarangayKagawad extends Model
{
    use HasFactory;

    protected $fillable = [
        'about_barangay_id',
        'name',
        'display_order',
    ];

    public function barangay(): BelongsTo
    {
        return $this->belongsTo(AboutBarangay::class, 'about_barangay_id');
    }
}
