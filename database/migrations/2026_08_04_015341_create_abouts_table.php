<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->string('page_key')->unique();
            $table->string('hero_logo')->nullable();
            $table->string('hero_logo_alt')->nullable();
            $table->string('hero_title');
            $table->text('hero_description');
            $table->string('overview_badge');
            $table->string('overview_title');
            $table->json('overview_paragraphs')->nullable();
            $table->json('overview_highlights')->nullable();
            $table->string('media_badge');
            $table->string('media_title');
            $table->string('media_preview_image')->nullable();
            $table->string('media_overlay_title');
            $table->text('media_overlay_description');
            $table->string('media_footer_left');
            $table->string('media_footer_right');
            $table->string('priorities_title');
            $table->json('priorities_items')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abouts');
    }
};
