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
            $table->string('organization_mayor_name')->nullable()->after('media_video');
            $table->string('organization_mayor_role')->nullable()->after('organization_mayor_name');
            $table->string('organization_mayor_image')->nullable()->after('organization_mayor_role');
            $table->string('organization_vice_mayor_name')->nullable()->after('organization_mayor_image');
            $table->string('organization_vice_mayor_role')->nullable()->after('organization_vice_mayor_name');
            $table->string('organization_vice_mayor_image')->nullable()->after('organization_vice_mayor_role');
            $table->json('organization_council_members')->nullable()->after('organization_vice_mayor_image');
            $table->string('lgu_badge')->nullable()->after('organization_council_members');
            $table->string('lgu_subtitle')->nullable()->after('lgu_badge');
            $table->string('lgu_title')->nullable()->after('lgu_subtitle');
            $table->string('lgu_logo')->nullable()->after('lgu_title');
            $table->json('lgu_barangays')->nullable()->after('lgu_logo');
        });
    }

    public function down(): void
    {
        Schema::table('abouts', function (Blueprint $table) {
            $table->dropColumn([
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
            ]);
        });
    }
};
