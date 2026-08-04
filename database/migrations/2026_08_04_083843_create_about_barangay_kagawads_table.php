<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_barangay_kagawads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('about_barangay_id')->constrained('about_barangays')->cascadeOnDelete();
            $table->string('name');
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

                foreach (array_values($barangays) as $barangayIndex => $barangay) {
                    $barangayRow = DB::table('about_barangays')
                        ->where('about_id', $about->id)
                        ->where('display_order', $barangayIndex)
                        ->first();

                    if ($barangayRow === null) {
                        continue;
                    }

                    $kagawads = $barangay['officials']['kagawads'] ?? [];

                    if (! is_array($kagawads)) {
                        continue;
                    }

                    foreach (array_values($kagawads) as $kagawadIndex => $kagawad) {
                        DB::table('about_barangay_kagawads')->insert([
                            'about_barangay_id' => $barangayRow->id,
                            'name' => trim((string) $kagawad),
                            'display_order' => $kagawadIndex,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_barangay_kagawads');
    }
};
