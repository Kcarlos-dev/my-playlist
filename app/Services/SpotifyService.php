<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class SpotifyService
{
    protected $token;
    protected $user_id;
    protected $playlistName;
    protected $trackUris = [];

    public function __construct($token, $user_id, $playlistName, array $trackUris)
    {
        $this->token = $token;
        $this->user_id = $user_id;
        $this->playlistName = $playlistName;
        $this->trackUris = $trackUris;
    }

    public function createPlaylist()
    {

        $url = "https://api.spotify.com/v1/users/{$this->user_id}/playlists";
        $data = [
            'name' => $this->playlistName,
            'description'=> "Playlist criada automaticamente",
            'public' => false
        ];

        $res = Http::withHeaders([
            'Authorization' => "Bearer {$this->token}",
            'Content-Type' => 'application/json'
        ])->post($url, $data);

        if (!$res->successful()) {
            return 'Erro ao criar playlist: ' . $res . "\n";
        }

        $playlist_id = $res->json()['id'];
        echo 'Playlist criada com sucesso! ID: ' . $playlist_id . "\n";

        $addUrl = "https://api.spotify.com/v1/playlists/{$playlist_id}/tracks";

        $addTracksRes = Http::withHeaders([
            'Authorization' => "Bearer {$this->token}",
            'Content-Type' => 'application/json'
        ])->post($addUrl, [
            'uris' => $this->trackUris
        ]);

        if ($addTracksRes->successful()) {
            return "Músicas adicionadas com sucesso!\n";
        } else {
            return 'Erro ao adicionar músicas: ' . $addTracksRes->status() . "\n";
        }

    }
}
