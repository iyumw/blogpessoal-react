import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormPostagem() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
      // Ordena os temas em ordem alfabética
      setTemas((prevTemas) =>
        [...prevTemas].sort((a, b) => a.descricao.localeCompare(b.descricao))
      );
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("É preciso estar logado para acessar esta página");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const novaPostagem = {
      ...postagem,
      tema: tema,
      usuario: usuario,
    };

    try {
      if (id !== undefined) {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert("Postagem atualizada com sucesso");
      } else {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert("Postagem cadastrada com sucesso");
      }
    } catch (error: any) {
      console.error("Erro completo:", error);
      if (error.response) {
        alert(`Erro: ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        alert("Erro: Nenhuma resposta recebida do servidor.");
      } else {
        alert("Erro ao processar a requisição.");
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === "";

  return (
    <div className="container flex flex-col mx-auto items-center bg-rose-50 p-8 rounded-lg shadow-lg max-w-2xl">
      <h1 className="text-4xl text-center my-8 text-purple font-bold">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form className="flex flex-col w-full gap-6" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="text-gray font-semibold">
            Título da Postagem
          </label>
          <input
            type="text"
            placeholder="Título"
            name="titulo"
            required
            className="border-2 border-pink-200 rounded p-2 focus:outline-none focus:border-blush-100"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="conteudo" className="text-gray font-semibold">
            Texto da Postagem
          </label>
          <textarea
            placeholder="Texto"
            name="conteudo"
            required
            className="border-2 border-pink-200 rounded p-2 focus:outline-none focus:border-blush-100 h-32 resize-none"
            value={postagem.conteudo}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setPostagem({ ...postagem, conteudo: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray font-semibold">Tema da Postagem</p>
          <select
            name="tema"
            id="tema"
            className="border-2 border-pink-200 rounded p-2 focus:outline-none focus:border-blush-100"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione um Tema
            </option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-rose-200 bg-blush-100 hover:bg-blush-50
                               text-white font-bold w-full py-3 flex justify-center transition-colors"
          disabled={carregandoTema}
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
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;