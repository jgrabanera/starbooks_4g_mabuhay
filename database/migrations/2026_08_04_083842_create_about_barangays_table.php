<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_barangays', function (Blueprint $table) {
            $table->id();
            $table->foreignId('about_id')->constrained('abouts')->cascadeOnDelete();
            $table->string('title');
            $table->string('reference');
            $table->unsignedInteger('population')->default(0);
            $table->string('captain_image')->nullable();
            $table->string('captain_name');
            $table->string('secretary_name');
            $table->string('treasurer_name');
            $table->string('sk_chairperson_name');
            $table->unsignedInteger('display_order')->default(0);
            $table->timestamps();
        });

        if (! Schema::hasColumn('abouts', 'lgu_barangays')) {
            return;
        }

        DB::table('abouts')
            ->select(['id', 'lgu_barangays'])
            ->orderBy('id')
            ->get()
            ->each(function (object $about): void {
                $barangays = json_decode($about->lgu_barangays ?? '[]', true);

                if (! is_array($barangays)) {
                    return;
                }

                foreach (array_values($barangays) as $index => $barangay) {
                    DB::table('about_barangays')->insert([
                        'about_id' => $about->id,
                        'title' => trim((string) ($barangay['title'] ?? '')),
                        'reference' => trim((string) ($barangay['reference'] ?? '')),
                        'population' => (int) ($barangay['population'] ?? 0),
                        'captain_image' => $barangay['captain_image'] ?? null,
                        'captain_name' => trim((string) ($barangay['officials']['captain'] ?? '')),
                        'secretary_name' => trim((string) ($barangay['officials']['secretary'] ?? '')),
                        'treasurer_name' => trim((string) ($barangay['officials']['treasurer'] ?? '')),
                        'sk_chairperson_name' => trim((string) ($barangay['officials']['skChairperson'] ?? '')),
                        'display_order' => $index,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_barangays');
    }
};
