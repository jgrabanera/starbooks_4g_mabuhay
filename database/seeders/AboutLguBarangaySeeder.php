<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;

class AboutLguBarangaySeeder extends Seeder
{
    public function run(): void
    {
        if (! Schema::hasTable('about_barangays') || ! Schema::hasTable('about_barangay_kagawads')) {
            return;
        }

        $about = About::query()->find(1);

        if ($about === null) {
            return;
        }

        $barangays = $this->loadBarangays();

        $about->barangays()->delete();

        $barangays->each(function (array $barangay, int $index) use ($about): void {
            $barangayRecord = $about->barangays()->create([
                'id' => $barangay['id'],
                'title' => $barangay['title'],
                'reference' => $barangay['reference'],
                'population' => (int) $barangay['population'],
                'captain_image' => null,
                'captain_name' => $barangay['barangayCaptain'],
                'secretary_name' => $barangay['secretary'],
                'treasurer_name' => $barangay['treasurer'],
                'sk_chairperson_name' => $barangay['skChairperson'],
                'display_order' => $index,
            ]);

            collect($barangay['kagawads'] ?? [])
                ->values()
                ->each(function (string $kagawad, int $kagawadIndex) use ($barangayRecord): void {
                    $barangayRecord->kagawads()->create([
                        'name' => $kagawad,
                        'display_order' => $kagawadIndex,
                    ]);
                });
        });
    }

    private function loadBarangays(): Collection
    {
        return collect((new AboutSeeder())->runBarangaySeedData());
    }
}
