import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import CardPostagens from "../cardpostagens/CardPostagens";
import { BeatLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";

interface ListaPostagensUsuarioProps {
    postagens: Postagem[];
}

function ListaPostagensUsuario({ postagens }: ListaPostagensUsuarioProps) {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("É preciso estar logado para acessar esta página", "info");
            navigate("/");
        } else {
            setCarregando(false);
        }
    }, [usuario.token, navigate]);

    return (
        <>
            {carregando ? (
                <div className="flex justify-center items-center h-screen">
                    <BeatLoader color="#4a154b" />
                </div>
            ) : postagens.length > 0 ? (
                <div className="flex justify-center w-full my-4 p-3">
                    <div className="container flex flex-col mx-2">
                        <div
                            className="container mx-auto my-4 
                                      grid grid-cols-1 md:grid-cols-2 
                                      lg:grid-cols-3 gap-4"
                        >
                            {postagens.map((postagem) => (
                                <CardPostagens key={postagem.id} postagem={postagem} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 text-center">
                    Nenhuma postagem encontrada.
                </p>
            )}
        </>
    );
}

export default ListaPostagensUsuario;