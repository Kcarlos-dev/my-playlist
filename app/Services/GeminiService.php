<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeminiService
{
    protected $apiKey;
    protected $modelName;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key');
        $this->modelName = 'gemini-2.5-flash-preview-04-17';
    }

    public function generatePlaylist(string $prompt): ?string
    {
        $url = "https://generativelanguage.googleapis.com/v1beta/models/{$this->modelName}:generateContent?key={$this->apiKey}";

        $response = Http::post($url, [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
        ]);

        if ($response->successful()) {
            return $response->json('candidates.0.content.parts.0.text');
        }
        return $response->json('Erro na API Gemini: ' . $response->body());
    }
}
