import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import ListaPostagens from '../../components/postagens/listapostagens/ListaPostagens'

function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    const [postagens, setPostagens] = useState([]); // Estado para armazenar as postagens do usuário
    const [carregando, setCarregando] = useState(true); // Estado para controlar o carregamento

    useEffect(() => {
        if (usuario.token === "") {
            alert('Você precisa estar logado')
            navigate("/")
        } 
    }, [usuario.token])

    return (
        <div className='container mx-auto m-4 rounded-2xl overflow-hidden'>

            <img 
                className='w-full h-72 object-cover border-b-8 border-white' 
                src="https://i.imgur.com/ZZFAmzo.jpg" alt="Capa do Perfil" />

            <img 
                className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10' 
                src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />

            <div 
                className="relative mt-[-6rem] h-105 flex flex-col 
                    bg-pink-100 text-gray text-2xl items-center justify-center"
            >
                
                <p>Nome: {usuario.nome} </p>
                <p>Email: {usuario.usuario}</p>
                
                {/* <h3 className='py-4 font-bold text-3xl text-purple'>Publicações:</h3> */}
                
            </div>

        </div>
    )
}

export default Perfil