import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormTema() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  // Função para atualizar o estado do tema
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  // Função para buscar um tema pelo ID
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

  // Função para cadastrar ou atualizar um tema
  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar("/temas", tema, setTema, {
          headers: { Authorization: token },
        });

        alert("O tema foi atualizado com sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert(
            "Ocorreu um erro ao atualizar o tema. Verifique o console para mais detalhes."
          );
        }
      }
    } else {
      try {
        await cadastrar("/temas", tema, setTema, {
          headers: { Authorization: token },
        });

        alert("O tema foi cadastrado com sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert(
            "Ocorreu um erro ao cadastrar o tema. Verifique o console para mais detalhes."
          );
        }
      }
    }
    setIsLoading(false);
    retornar();
  }

  // Função para retornar à lista de temas
  function retornar() {
    navigate("/temas");
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

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      {/* Título condicional */}
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Tema" : "Cadastrar Tema"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Tema</label>
          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2"
            value={tema.descricao || ""} // Exibe a descrição existente ou uma string vazia
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
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

export default FormTema;