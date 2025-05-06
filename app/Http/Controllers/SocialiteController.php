<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use Illuminate\Support\Facades\Log;

use App\Services\SpotifyService;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;

class SocialiteController extends Controller
{
    public function clientSpotify()
    {
        return Socialite::driver('spotify')
            ->scopes(['playlist-modify-private', 'playlist-modify-public'])
            ->redirect();
    }

    public function authSpotify()
    {
        $res = Socialite::driver('spotify')->user();
        session([
            "spotify_user" => [
                "name" => $res->name,
                "user_id" => $res->id,
                "token" => $res->accessTokenResponseBody["access_token"]
            ]
        ]);
        //session("spotify_user")
        return redirect("http://127.0.0.1:8000/") ;
    }
    public function userSpotify(){
        return session("spotify_user");
    }
    public function playlistSpotify(Request $request)
    {
        $playlist = $request->input('playlist');
        if (strlen(trim($playlist)) <= 0) {
            return response()->json(["res" => 'sem parametros']);
        }
        $musics = json_decode(session("musics"), true);
        $musicsNames = array_column($musics, 'nome');
        //log::info($musicsNames);
        $data = session("spotify_user");

        if(empty($data)){
            return response()->json(["token" => 'sem parametros']);
        }
        $track_uris = [];
        $Spotify = new SpotifyService($data["token"],$data["user_id"],$playlist);

        for ($i=0; $i < count($musicsNames); $i++) {
            $track = $Spotify->ShowIdMusic($musicsNames[$i]);
            array_push($track_uris,$track);
        }

        return $Spotify->createPlaylist($track_uris);
    }
}
//http://127.0.0.1:8000/spotify

