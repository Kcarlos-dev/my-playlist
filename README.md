# My Playlist

Um webApp que cria playlists no Spotify usando a IA Gemini.

## Descrição

Este projeto é uma aplicação web desenvolvida com Laravel que permite aos usuários criar playlists no Spotify utilizando a inteligência artificial Gemini para gerar recomendações de músicas com base em gêneros ou artistas específicos. A aplicação utiliza o pacote `laravel/socialite` para autenticação com o Spotify e `google-gemini-php/laravel` para integração com a API da Gemini.

## Pré-requisitos

- PHP >= 8.1
- Composer
- Node.js e npm
- MySQL ou outro banco de dados compatível com Laravel
- Conta no Spotify Developer Dashboard
- Conta no Google AI Studio

## Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Kcarlos-dev/my-playlist.git
   ```

2. **Navegue até o diretório do projeto**:
   ```bash
   cd my-playlist
   ```

3. **Instale as dependências PHP**:
   ```bash
   composer install
   ```

4. **Instale as dependências JavaScript**:
   ```bash
   npm install
   ```

5. **Copie o arquivo de ambiente**:
   ```bash
   cp .env.example .env
   ```
6. **Configure as chaves de API** (veja a seção Configuração abaixo).

7. **Inicie o servidor de desenvolvimento**:
    ```bash
    php artisan serve
    ```

8. **Execute o servidor de assets** (em outro terminal):
    ```bash
    npm run dev
    ```

## Configuração

### Spotify API

Para integrar a autenticação e criação de playlists no Spotify, você precisa configurar uma aplicação no Spotify Developer Dashboard.

1. Acesse o [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Faça login ou crie uma conta.
3. Clique em "Create an App" e preencha as informações solicitadas.
4. Anote o **Client ID** e o **Client Secret**.
5. Configure o **Redirect URI** para `http://127.0.0.1:8000/spotify/callback` (ou a URL apropriada para sua aplicação).
6. No arquivo `.env`, adicione as seguintes variáveis:
   ```
   SPOTIFY_CLIENT_ID=seu_client_id
   SPOTIFY_CLIENT_SECRET=seu_client_secret
   SPOTIFY_REDIRECT_URI=http://127.0.0.1:8000/spotify/callback
   ```

### Gemini API

Para utilizar a IA Gemini na geração de playlists, é necessário obter uma chave de API no Google AI Studio.

1. Acesse o [Google AI Studio](https://aistudio.google.com/).
2. Crie uma chave de API.
3. No arquivo `.env`, adicione a variável:
   ```
   GEMINI_API_KEY=sua_chave_api
   ```

## Uso

1. Acesse a aplicação em `http://127.0.0.1:8000` (ou a URL fornecida pelo `php artisan serve`).
2. Autentique-se com o Spotify clicando no link de autenticação, que redirecionará para o Spotify e, após a autorização, de volta para a aplicação.
3. Utilize a interface da aplicação para:
   - Gerar playlists com base em gêneros musicais (acessível via `/music-genres`).
   - Gerar playlists com base em artistas (acessível via `/music-artist`).
   - Visualizar e gerenciar playlists criadas no Spotify.

A IA Gemini processa as entradas do usuário (como gênero ou nome do artista) e retorna uma lista de músicas recomendadas, que são então usadas para criar playlists no Spotify.

## Estrutura do Projeto

| Diretório/Arquivo | Descrição |
|-------------------|-----------|
| `app/Http/Controllers/SocialiteController.php` | Gerencia a autenticação com o Spotify via Socialite. |
| `app/Http/Controllers/MusicController.php` | Lida com a geração de playlists com base em gêneros ou artistas. |
| `app/Services/GeminiService.php` | Interage com a API da Gemini para gerar recomendações de músicas. |
| `app/Services/SpotifyService.php` | Gerencia a interação com a API do Spotify para criar playlists. |
| `routes/web.php` | Define as rotas da aplicação, incluindo autenticação e geração de playlists. |
| `config/services.php` | Contém a configuração do Spotify para o Socialite. |
| `.env.example` | Modelo para o arquivo `.env` com variáveis de ambiente necessárias. |

## Contribuições

Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para o repositório remoto (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

Por favor, relate quaisquer problemas ou sugestões na seção de Issues do repositório.

## MELHORIAS FUTURAS
1. Criar tela de login/cadastro
2. Ajustar frontend para dispositivos moveis
3. Persistência de dados com Mysql
