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
    public function authSpotify( ){
        $res = Socialite::driver('spotify')->user();
        $token = $res->accessTokenResponseBody["access_token"];
        $track_uris = [
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
        ];
        $Spotify = new SpotifyService($token,$res->id,"Playlist automatica",$track_uris);
        //return response()->json($res) ;
        return $Spotify->createPlaylist();
    }


}
//http://127.0.0.1:8000/spotify
