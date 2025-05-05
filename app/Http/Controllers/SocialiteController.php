<?php

namespace App\Http\Controllers;

use App\Services\SpotifyService;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;

class SocialiteController extends Controller
{
    public function clientSpotify(){
        return Socialite::driver('spotify')
        ->scopes(['playlist-modify-private', 'playlist-modify-public'])
        ->redirect();
    }

    public function authSpotify(){
        $res = Socialite::driver('spotify')->user();
        session([
            "spotify_user" => [
                "name"=>$res->name,
                "user_id"=>$res->id,
                "token"=>$res->accessTokenResponseBody["access_token"]
            ]
            ]);
        return session("spotify_user");
    }
    public function playlistSpotify(Request $request){
        $playlist = $request->input('playlist');
        $musics = $request->input('musics');
        if(strlen(trim($playlist)) <= 0 || strlen(trim($musics)) <= 0){
            return response()->json(["res" => 'sem parametros']);
        }
        /*$track_uris = [
            'spotify:track:2m3ObD945KvpE5y9A1eUWm',  # Jump Then Fall (Taylor's Version)
            'spotify:track:4P9Q0GojKVXpRTJCaL3kyy',  # All of the Girls You Loved Before
            'spotify:track:1fzAuUVbzlhZ1lJAx9PtY6',  # Daylight
            'spotify:track:4OAuvHryIVv4kMDNSLuPt6',  # Red (Taylor's Version)
            'spotify:track:6YvqWjhGD8mB5QXcbcUKtx',  # Love Story (Taylor's Version)
            'spotify:track:1qrpoAMXodY6895hGKoUpA',  # You Belong With Me (Taylor's Version)
            'spotify:track:1HCdems7PQZRj42QDWLA0A',  # Timeless (Taylor's Version) (From The Vault)
            'spotify:track:1GwMQaZz6Au3QLDbjbMdme',  # Call It What You Want
            'spotify:track:6NFyWDv5CjfwuzoCkw47Xf',  # Delicate
            'spotify:track:6oVxXO5oQ4pTpO8RSnkzvv',  # Dress
            'spotify:track:3sW3oSbzsfecv9XoUdGs7h',  # Enchanted (Taylor's Version)
            'spotify:track:1dGr1c8CrMLDpV6mPbImSI',  # Lover
            'spotify:track:2x0WlnmfG39ZuDmstl9xfX',  # End Game (feat. Ed Sheeran & Future)
            'spotify:track:4hqJ4bSlYJOXb6Z4SRmzxs',  # Long Live (Taylor's Version)
            'spotify:track:1ZY1PqizIl78geGM4xWlEA'   # Gorgeous
        ];*/
        $data = session("spotify_user");
        if(empty($data)){
            return response()->json(["token" => 'sem parametros']);
        }
        $Spotify = new SpotifyService($data["token"],$data["user_id"],$playlist,$musics);
        return $Spotify->createPlaylist();
    }


}
//http://127.0.0.1:8000/spotify


