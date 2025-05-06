<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\MusicController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/music-genres',[MusicController::class,'musicGenres']);
Route::get('/music-artist',[MusicController::class,'artist']);


Route::get('/spotify',[SocialiteController::class,'clientSpotify'])->name('spotify');
Route::get('/spotify/callback',[SocialiteController::class, 'authSpotify'])->name('spotify.callback');
Route::get('/spotify/user',[SocialiteController::class,'userSpotify'])->name('spotify.user');
Route::get('/spotify/playlist',[SocialiteController::class, 'playlistSpotify'])->name('spotify.playlist');
