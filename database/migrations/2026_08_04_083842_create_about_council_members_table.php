<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_council_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('about_id')->constrained('abouts')->cascadeOnDelete();
            $table->string('name');
            $table->string('role');
            $table->string('image')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestamps();
        });

        if (! Schema::hasColumn('abouts', 'organization_council_members')) {
            return;
        }

        DB::table('abouts')
            ->select(['id', 'organization_council_members'])
            ->orderBy('id')
            ->get()
            ->each(function (object $about): void {
                $members = json_decode($about->organization_council_members ?? '[]', true);

                if (! is_array($members)) {
                    return;
                }

                foreach (array_values($members) as $index => $member) {
                    DB::table('about_council_members')->insert([
                        'about_id' => $about->id,
                        'name' => trim((string) ($member['name'] ?? '')),
                        'role' => trim((string) ($member['role'] ?? 'Council Member')),
                        'image' => $member['image'] ?? null,
                        'display_order' => $index,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_council_members');
    }
};
