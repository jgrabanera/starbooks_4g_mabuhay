<?php

namespace App\Support;

class PublicSectionTabs
{
    /**
     * @return array<string, array<int, array{id: string, aliases: array<int, string>}>>
     */
    public static function definitions(): array
    {
        return [
            'lgu-mabuhay-projects' => [
                ['id' => 'completed', 'aliases' => ['completed', 'completed-1']],
                ['id' => 'ongoing', 'aliases' => ['ongoing', 'on-going-2']],
            ],
            'resources' => [
                ['id' => 'resources', 'aliases' => ['resources', 'memorandum']],
            ],
            'social-services' => [
                ['id' => 'award', 'aliases' => ['award', 'posting-of-awardings-3']],
                ['id' => 'budget', 'aliases' => ['budget', 'nta-budget-per-month-4']],
                ['id' => 'memorandum', 'aliases' => ['memorandum', 'memorandum-1']],
                ['id' => 'ordinance', 'aliases' => ['ordinance', 'ordinance-2']],
            ],
            'tourism' => [
                ['id' => 'events', 'aliases' => ['events', 'events-1']],
                ['id' => 'festivities', 'aliases' => ['festivities', 'festivities-2']],
                ['id' => 'sites', 'aliases' => ['sites', 'tourism-sites-3']],
            ],
            'dost-services' => [
                ['id' => 'Dost-ix', 'aliases' => ['Dost-ix', 'dost-ix-1']],
                ['id' => 'ProgramsServices', 'aliases' => ['ProgramsServices', 'programs-services-2']],
                ['id' => 'FacebookPosts', 'aliases' => ['FacebookPosts', 'facebook-posts-3']],
            ],
        ];
    }

    public static function normalize(string $slug, ?string $tabId): ?string
    {
        if ($tabId === null) {
            return null;
        }

        foreach (self::definitions()[$slug] ?? [] as $tab) {
            if (in_array($tabId, $tab['aliases'], true)) {
                return $tab['id'];
            }
        }

        return $tabId;
    }
}
