<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('abouts', function (Blueprint $table) {
            $table->string('media_video')->nullable()->after('media_preview_image');
        });
    }

    public function down(): void
    {
        Schema::table('abouts', function (Blueprint $table) {
            $table->dropColumn('media_video');
        });
    }
};
