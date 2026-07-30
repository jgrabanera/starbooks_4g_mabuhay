<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_contents', function (Blueprint $table) {
            $table->id();
            $table->string('tab_id', 120);
            $table->string('title');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('pdf')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['tab_id', 'is_active']);
        });

        $this->copyLegacyRecords('lgu-mabuhay-projects', 'project_contents');
    }

    public function down(): void
    {
        Schema::dropIfExists('project_contents');
    }

    private function copyLegacyRecords(string $categorySlug, string $table): void
    {
        if (!Schema::hasTable('categories') || !Schema::hasTable('subcategories')) {
            return;
        }

        $categoryId = DB::table('categories')->where('slug', $categorySlug)->value('id');

        if ($categoryId === null) {
            return;
        }

        $records = DB::table('subcategories')
            ->where('category_id', $categoryId)
            ->get([
                'tab_id',
                'title',
                'slug',
                'description',
                'image',
                'pdf',
                'is_active',
                'created_at',
                'updated_at',
            ])
            ->map(fn ($record) => (array) $record)
            ->all();

        if ($records !== []) {
            DB::table($table)->insert($records);
        }
    }
};
