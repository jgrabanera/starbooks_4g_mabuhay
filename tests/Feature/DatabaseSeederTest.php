<?php

namespace Tests\Feature;

use Database\Seeders\CurrentDatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DatabaseSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_current_database_seeder_restores_the_saved_data_and_is_idempotent(): void
    {
        $expected = [
            'App\\Models\\User' => [
                0 => 1,
                1 => '39e135619eb53aa0338d63a8ca732dcf1f661f1b946927e986bf10ce7537daab',
            ],
            'App\\Models\\Category' => [
                0 => 6,
                1 => 'd3f3e82812dd4743ff3c518dba5b5b349ecdfce7d2c233d63ced03330f2278ee',
            ],
            'App\\Models\\About' => [
                0 => 1,
                1 => '9d9a451de096aa98b94ec8f9c1bb7b5f2cfafdc6c129a03cd8f48ed1dbf48538',
            ],
            'App\\Models\\AboutPriority' => [
                0 => 3,
                1 => '6d9154b3bd72fecd70050f934be82ce64adc5044a5b1f55768409f790b0355c7',
            ],
            'App\\Models\\AboutCouncilMember' => [
                0 => 12,
                1 => 'b238e5d942b5a18fd2eecd619b4a183605d479eba09ccda72acfb6dcbe2108c4',
            ],
            'App\\Models\\AboutBarangay' => [
                0 => 18,
                1 => '27b88bf100cb6061b02d32cc4425792af107a77d437dcb845277bbd4ff02d96a',
            ],
            'App\\Models\\AboutBarangayKagawad' => [
                0 => 126,
                1 => '666526f0123fd2a918ff844b0974ab018d41071b0b406c614febbea0dbc90502',
            ],
            'App\\Models\\DostServiceContent' => [
                0 => 10,
                1 => '2384892d2e73f4b211e3eebb2fb8ac543e6cdb2439b5d4714033f6b141af408e',
            ],
            'App\\Models\\TourismContent' => [
                0 => 1,
                1 => '1ebc3db48970887b548b1498626c848be8cea63023a6b9f856a0d8d73aaf1e9a',
            ],
            'App\\Models\\SocialServiceContent' => [
                0 => 1,
                1 => '381efedd6006d1cc4a81b81b71e28be8953741b3a891fdde894ca2613b6e2686',
            ],
            'App\\Models\\ProjectContent' => [
                0 => 1,
                1 => 'ec96cf2cb32a043f9e3aaab875bc06cd45e55a785cbd35fd1a31c4188f41f4e3',
            ],
            'App\\Models\\LguResourceContent' => [
                0 => 9,
                1 => '992bae51523ac05f45e29bae2dde8422a4c5eaabe4ca90908c037bcec7729b4e',
            ],
            'App\\Models\\SubCategory' => [
                0 => 0,
                1 => '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
            ],
        ];

        for ($run = 0; $run < 2; $run++) {
            $this->seed(CurrentDatabaseSeeder::class);

            foreach ($expected as $model => [$count, $checksum]) {
                $rows = $model::query()->orderBy('id')->get()->map(function ($record): array {
                    $attributes = $record->getAttributes();
                    ksort($attributes);

                    return array_map(fn ($value) => $value === null ? null : (string) $value, $attributes);
                })->all();

                $this->assertCount($count, $rows, $model);
                $this->assertSame($checksum, hash('sha256', json_encode($rows, JSON_THROW_ON_ERROR)), $model);
            }
        }
    }
}
