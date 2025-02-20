import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function DeletarTema() {
  const navigate = useNavigate();
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  // Verifica se o usuário está logado
  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  // Busca o tema pelo ID quando o componente é montado ou o ID muda
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  // Deleta o tema
  async function deletarTema() {
    setIsLoading(true);

    try {
      await deletar(`/temas/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      alert("Tema apagado com sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Não foi possível apagar o tema. Tente novamente.");
      }
    }
    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/temas");
  }

  return (
    <div className="min-h-[85vh] bg-rose-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl text-purple font-bold text-center mb-8">
        Deletar Tema
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>

      <div className="w-full max-w-2xl bg-rose-100 rounded-lg shadow-lg overflow-hidden">
        <header className="py-4 px-6 bg-pink-100 text-purple font-bold text-2xl text-center">
          Tema
        </header>
        <p className="p-8 text-gray-600 text-2xl bg-rose-50 text-center">
          {tema.descricao}
        </p>
        <div className="flex">
          <button
            className="flex-1 bg-blush-100 hover:bg-blush-50 text-white font-bold py-3 transition-colors"
            onClick={retornar}
          >
            Não, voltar
          </button>
          <button
            className="flex-1 bg-danger hover:bg-danger-100 text-white font-bold py-3 flex items-center justify-center transition-colors"
            onClick={deletarTema}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>Sim, deletar</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
