<?php

namespace App\Http\Controllers;
use App\Services\GeminiService;
use Illuminate\Http\Request;

class MusicController extends Controller
{
    public function musicGenres(GeminiService $gemini){

        $musicGenres = request('style');
        if(strlen(trim($musicGenres)) <= 0){
            return response()->json(["res" => 'Campo vazio']);
        }
        $prompt = "Gere uma playlist no gênero $musicGenres, contendo apenas os nomes das músicas e os nomes dos artistas, no formato de um array JSON válido, onde cada item tem as chaves 'Nome' e 'Artista'.
                        Exemplo de estrutura esperada:[{'nome': 'Nome da música', 'artista': 'Nome do artista'},...]O JSON deve estar bem formatado e pronto para uso em uma API (!!!COMECE DIRETO COM OBJETO NENHUMA PALAVARA!!!), Com pelo menos 10 ou 20 musicas.";

        $res = $gemini->generatePlaylist($prompt);

        return ["res"=>$res] ;
    }
    public function artist(GeminiService $gemini){

        $artist = request('artist');
        if(strlen(trim($artist)) <= 0){
            return response()->json(["res" => 'Campo vazio']);
        }
        if(strlen(trim($artist)) > 20){
            return response()->json(["res" => 'Nome muito grande']);
        }
        $prompt = "Gere uma playlist com musicas do artista $artist, contendo apenas os nomes das músicas e os nomes dos artistas, no formato de um array JSON válido, onde cada item tem as chaves 'Nome' e 'Artista'.
                        Exemplo de estrutura esperada:[{'nome': 'Nome da música', 'artista': 'Nome do artista'},...]O JSON deve estar bem formatado e pronto para uso em uma API (!!!COMECE DIRETO COM OBJETO NENHUMA PALAVARA!!!), Com pelo menos 10 ou 20 musicas. caso não encontre nenhum artista faça no formato:{'erro':'artista não encontrado'}";

        $res = $gemini->generatePlaylist($prompt);

        return ["res"=>$res] ;
    }
}
