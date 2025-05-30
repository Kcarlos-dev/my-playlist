import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [getNum, setNum] = useState(1)
    const [getType, setType] = useState("MusicGen")
    const [getMusic, setMusic] = useState("")
    const [getPlaylist, setPlaylist] = useState([{ nome: "", artista: "" }])
    const [getLoading, setLoading] = useState(false)
    const [getSpotify, setSpotify] = useState(false)
    const url = "http://127.0.0.1:8000"
    useEffect(() => {
        if (getType == "MusicGen") {
            document.getElementById('RadioMusicGenero').checked = true
        }
        if (sessionStorage.getItem("spotify")) {
            setSpotify(true)
            /* axios
             .get(`${url}/spotify/user`)
             .then((res)=>{
                 sessionStorage.setItem("user",JSON.stringify(res.data))
                 console.log(JSON.parse(sessionStorage.getItem("user")))
             })
             .catch((err)=>{
                 console.log(err)
             })*/
        }
    }, [])
    function generosMusicais(num) {
        const generosMusicaisArray = [
            "Rock",
            "Pop",
            "Hip Hop",
            "Rap",
            "R&B",
            "Reggae",
            "Ska",
            "Funk",
            "Soul",
            "Jazz",
            "Blues",
            "Country",
            "Sertanejo",
            "Forró",
            "Axé",
            "Samba",
            "Pagode",
            "MPB",
            "Bossa Nova",
            "Choro",
            "Tropicalia",
            "Eletrônica",
            "House",
            "Techno",
            "Trance",
            "Drum and Bass",
            "Dubstep",
            "Lo-fi",
            "K-pop",
            "J-pop",
            "C-pop",
            "Clássica",
            "Ópera",
            "Gospel",
            "Cristã",
            "New Age",
            "Indie",
            "Alternativa",
            "Emo",
            "Punk",
            "Hardcore",
            "Grunge",
            "Metal",
            "Heavy Metal",
            "Death Metal",
            "Black Metal",
            "Trash Metal",
            "Industrial",
            "Trap",
            "Reggaeton",
            "Bachata",
            "Salsa",
            "Cumbia",
            "Merengue",
            "Flamenco",
            "Fado",
            "Tango",
            "Disco",
            "Dance",
            "Ambient",
            "Chillout",
            "Experimental",
            "World Music",
            "Afrobeat",
            "Kuduro",
            "Zouk",
            "Brega",
            "Piseiro",
            "Arrocha",
            "Tecnobrega",
            "Lambada",
            "Maracatu",
            "Frevo",
            "Lo-fi Hip Hop"
        ];

        const itemsPorPagina = 8;
        const totalItems = generosMusicaisArray.length;
        const inicio = ((num - 1) * itemsPorPagina) % totalItems;
        const fim = inicio + itemsPorPagina;

        if (fim <= totalItems) {
            return generosMusicaisArray.slice(inicio, fim);
        } else {
            return generosMusicaisArray.slice(inicio, totalItems).concat(
                generosMusicaisArray.slice(0, fim % totalItems)
            );
        }
    }
    function CreatePlaylis(type) {
        if (getLoading == true) {
            return
        }
        setPlaylist("")
        const NameArtist = document.getElementById("NameArtist")
        let paramsRouter = ""
        let router = ""
        if (type == "MusicGen") {
            paramsRouter = { style: `${getMusic}` }
            router = "music-genres"
        } else {
            paramsRouter = { artist: `${NameArtist.value}` }
            router = "music-artist"
        }
        setLoading(true)
        axios
            .get(`${url}/${router}`, { params: paramsRouter })
            .then((res) => {
                setPlaylist(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
        return
    }
    function LoginSpotify() {
        if (getLoading == true) {
            return
        }
        if (getSpotify == false) {
            sessionStorage.setItem("spotify", !getSpotify)
            window.location.href = `${url}/spotify`
        }
        const myPlaylist = document.getElementById("NamePlaylist")
        if (myPlaylist.value.length < 1) {
            return alert("Escreva o nome da playlist")
        }
        setLoading(true)
        axios
            .get(`${url}/spotify/playlist`, { params: { playlist: `${myPlaylist.value}` } })
            .then((res) => {
                alert(res.data)
            })
            .catch((err) => {
                alert(`Erro de conexão, tente gerar novamente`)
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <main className='container mx-auto '>
            <nav className='flex justify-between'>
                <h1 className='text-xl text-white py-5'>Crie sua playlist com IA</h1>
                <button onClick={() => { LoginSpotify() }} className=" w-[10vw] h-[8vh] my-1 bg-lime-500 hover:bg-lime-400 text-white font-bold py-2 px-4 border-b-4 border-lime-700 hover:border-lime-500 rounded">
                    {getSpotify == false ? "Spotify" : "Salvar playlist"}
                </button>
            </nav>
            <div className='w-[60vw] overflow-y-auto container mx-auto h-[80vh] bg-white rounded-md p-10'>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input onClick={() => { setType(''); setPlaylist("") }} id="RadioArtist" type="radio" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Artista</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input onClick={() => { setType('MusicGen'); setPlaylist("") }} id="RadioMusicGenero" type="radio" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label for="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Genero musical</label>
                        </div>
                    </li>
                </ul>
                <div className='p-5 grid grid-cols-3'>
                    {getType == "MusicGen" ? (

                        <div className='w-[30vw]'>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Selecione um estilo musical</label>
                            <div className="grid grid-cols-2">
                                <select id="SelectMusics" onChange={
                                    (e) => {
                                        if (e.target.value === "more") {
                                            setNum(getNum + 1);
                                            document.getElementById('SelectMusics').value = 0;
                                            return
                                        }
                                        setMusic(e.target.value)


                                    }
                                } className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="0"></option>
                                    {
                                        generosMusicais(getNum).map((genero, i) => (
                                            <option className='h-10' key={i} value={genero}>{genero}</option>
                                        ))}
                                    <option value="more">Mostrar mais</option>

                                </select>
                                <button onClick={() => CreatePlaylis("MusicGen")} className="mx-2 w-[10vw] bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Gerar playlist
                                </button>

                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Nome do artista</label>
                            <div className='w-[30vw]'>
                                <input type="text" id="NameArtist" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex:. Seu jorge" required />
                                <button onClick={() => CreatePlaylis("Artist")} className="my-2 w-[10vw] bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Gerar playlist
                                </button>

                            </div>
                        </div>

                    )
                    }
                </div>
                {getLoading && (
                    <div className="mt-4 w-6 h-6 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                )}
                <div >
                    {getPlaylist.length > 1 && (
                        <div className='bg-slate-700 text-center flex flex-col justify-center items-center rounded-md p-10 text-white'>
                            <div >
                                {
                                    getSpotify && (
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-white">Nome da playlist</label>

                                            <input type="text" id="NamePlaylist" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex:. Minha playlist de rock" required />
                                        </div>
                                    )
                                }

                            </div>
                            <div className='bg-white p-5 rounded-full m-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-15 text-slate-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                                </svg>

                            </div>
                            {
                                getPlaylist.map((music, i) => (
                                    <div className='p-1 m-1' key={i}>
                                        <h1 ><b>{music.nome}</b></h1>
                                        <p >{music.artista}</p>
                                    </div>
                                ))
                            }
                        </div>

                    )
                    }

                </div>


            </div>

        </main>
    )

}
