import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function DeletarPostagem() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.error("Erro ao buscar postagem:", error);
      if (error.toString().includes("403")) {
        alert("Sua sessão expirou. Faça login novamente.");
        handleLogout();
      } else {
        alert("Erro ao carregar a postagem.");
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Postagem deletada com sucesso!");
      navigate("/postagens"); // Redireciona após a deleção
    } catch (error: any) {
      console.error("Erro ao deletar postagem:", error);
      if (error.toString().includes("403")) {
        alert("Sua sessão expirou. Faça login novamente.");
        handleLogout();
      } else {
        alert("Erro ao deletar a postagem.");
      }
    }

    setIsLoading(false);
  }

  function retornar() {
    navigate("/postagens");
  }

  if (!postagem.titulo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RotatingLines
          strokeColor="purple"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="container w-full max-w-2xl mx-auto p-6 bg-rose-50 rounded-lg shadow-lg">
      <h1 className="text-4xl text-center my-6 text-purple font-bold">
        Deletar Postagem
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className="border border-pink-200 rounded-lg overflow-hidden bg-rose-100">
        <header className="py-3 px-6 bg-pink-100 text-purple font-bold text-2xl">
          {postagem.titulo}
        </header>
        <div className="p-6">
          <p className="text-gray-600 text-lg mb-4">{postagem.conteudo}</p>
          <p className="text-gray-600">
            <span className="font-semibold">Tema:</span> {postagem.tema?.descricao}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Data:</span>{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "full",
              timeStyle: "short",
            }).format(new Date(postagem.data))}
          </p>
        </div>
        <div className="flex">
          <button
            className="flex-1 bg-blush-100 hover:bg-blush-50 text-white font-bold py-3 transition-colors"
            onClick={retornar}
          >
            Não, voltar
          </button>
          <button
            className="flex-1 bg-danger hover:bg-danger-100 text-white font-bold py-3 flex items-center justify-center transition-colors"
            onClick={deletarPostagem}
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

export default DeletarPostagem;