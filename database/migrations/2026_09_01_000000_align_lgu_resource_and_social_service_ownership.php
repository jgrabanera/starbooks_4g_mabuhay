<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('social_service_contents')) {
            Schema::rename('social_service_contents', 'lgu_resource_contents');
        }

        if (Schema::hasTable('resource_contents')) {
            Schema::rename('resource_contents', 'social_service_contents');
        }

        if (! Schema::hasTable('categories')) {
            return;
        }

        DB::table('categories')
            ->where('slug', 'resources')
            ->update(['slug' => 'legacy-resources']);

        DB::table('categories')
            ->where('slug', 'social-services')
            ->update([
                'title' => 'LGU Resources',
                'slug' => 'lgu-resources',
                'description' => 'Awards, budgets, memorandums, and ordinances',
            ]);

        DB::table('categories')
            ->where('slug', 'legacy-resources')
            ->update([
                'title' => 'Social Services',
                'slug' => 'social-services',
                'description' => 'Social Services',
            ]);
    }

    public function down(): void
    {
        if (Schema::hasTable('social_service_contents')) {
            Schema::rename('social_service_contents', 'resource_contents');
        }

        if (Schema::hasTable('lgu_resource_contents')) {
            Schema::rename('lgu_resource_contents', 'social_service_contents');
        }

        if (! Schema::hasTable('categories')) {
            return;
        }

        DB::table('categories')
            ->where('slug', 'social-services')
            ->update(['slug' => 'legacy-social-services']);

        DB::table('categories')
            ->where('slug', 'lgu-resources')
            ->update([
                'title' => 'Social Services',
                'slug' => 'social-services',
                'description' => 'Social Services',
            ]);

        DB::table('categories')
            ->where('slug', 'legacy-social-services')
            ->update([
                'title' => 'Resources',
                'slug' => 'resources',
                'description' => null,
            ]);
    }
};
