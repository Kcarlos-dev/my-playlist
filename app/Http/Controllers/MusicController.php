<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class MusicController extends Controller
{
    public function musicGenres(GeminiService $gemini)
    {

        $musicGenres = request('style');
        if (strlen(trim($musicGenres)) <= 0) {
            return response()->json(["res" => 'Campo vazio']);
        }
        $prompt = 'Gere uma playlist no gênero ' . $musicGenres .', a resposta deve usar EXATAMENTE esse modelo [{"nome": "Nome da música", "artista": "Nome do artista"},...] escreva direto com [], deve conter pelo menos de 10 a 20 musicas';

        session([
            "musics" => $gemini->generatePlaylist($prompt)
        ]);



        return session("musics");
    }
    public function artist(GeminiService $gemini)
    {

        $artist = request('artist');
        if (strlen(trim($artist)) <= 0) {
            return response()->json(["res" => 'Campo vazio']);
        }
        if (strlen(trim($artist)) > 20) {
            return response()->json(["res" => 'Nome muito grande']);
        }
        $prompt = 'Gere uma playlist do artista' . $artist .', a resposta deve usar EXATAMENTE esse modelo [{"nome": "Nome da música", "artista": "Nome do artista"},...] escreva direto com [], deve conter pelo menos de 10 a 20 musicas caso não ache o arista gere um {"mensagem": "artista não encontrado"}';
        log::info(session("musics"));
        session([
            "musics" => $gemini->generatePlaylist($prompt)
        ]);



        return session("musics");
    }
}
