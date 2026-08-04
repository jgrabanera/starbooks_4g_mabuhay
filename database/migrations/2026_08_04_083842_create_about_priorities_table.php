<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_priorities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('about_id')->constrained('abouts')->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->unsignedInteger('display_order')->default(0);
            $table->timestamps();
        });

        if (! Schema::hasColumn('abouts', 'priorities_items')) {
            return;
        }

        DB::table('abouts')
            ->select(['id', 'priorities_items'])
            ->orderBy('id')
            ->get()
            ->each(function (object $about): void {
                $items = json_decode($about->priorities_items ?? '[]', true);

                if (! is_array($items)) {
                    return;
                }

                foreach (array_values($items) as $index => $item) {
                    DB::table('about_priorities')->insert([
                        'about_id' => $about->id,
                        'title' => trim((string) ($item['title'] ?? '')),
                        'description' => trim((string) ($item['description'] ?? '')),
                        'display_order' => $index,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_priorities');
    }
};
