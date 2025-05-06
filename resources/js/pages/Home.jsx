import React, { useEffect, useState } from 'react';

export default function Home() {
    const [getNum, setNum] = useState(1)
    const [getType, setType] = useState("MusicGen")
    useEffect(() => {
        if (getType == "MusicGen") {
            document.getElementById('RadioMusicGenero').checked = true
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


    return (
        <main className='container mx-auto '>
            <h1 className='text-xl text-white py-5'>Crie sua playlist com IA</h1>
            <div className='w-[60vw] container mx-auto h-[80vh] bg-white rounded-md p-10'>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input onClick={() => { setType('') }} id="RadioArtist" type="radio" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Artista</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input onClick={() => { setType('MusicGen') }} id="RadioMusicGenero" type="radio" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
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
                                        }
                                    }
                                } className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {
                                        generosMusicais(getNum).map((genero, i) => (
                                            <option className='h-10' key={i} value={genero}>{genero}</option>
                                        ))}
                                    <option value="more">Mostrar mais</option>

                                </select>
                                <button class="mx-2 w-[10vw] bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Gerar playlist
                                </button>

                            </div>
                        </div>
                    ) : (
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Nome do artista</label>
                            <div className='w-[30vw]'>
                            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex:. Seu jorge" required />
                            <button class="my-2 w-[10vw] bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Gerar playlist
                                </button>

                            </div>
                        </div>

                    )
                    }
                </div>



            </div>

        </main>
    )

}
