import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { Puff } from "react-loader-spinner";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
        alert("Usuário cadastrado com sucesso!");
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        alert(
          "Erro ao cadastrar o Usuário. Verifique o console para mais detalhes."
        );
      }

      setIsLoading(false);
    } else {
      alert(
        "Senhas não conferem ou a senha precisa ter no mínimo 8 caracteres"
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }

  return (
    <div className="min-h-[90vh] bg-rose-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-rose-100 rounded-lg shadow-lg p-8">
        <form onSubmit={cadastrarNovoUsuario} className="flex flex-col gap-4.25">
          <h2 className="text-purple text-4xl font-bold text-center">
            Cadastrar
          </h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-gray-600 font-semibold">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              className="border-2 border-pink-200 rounded-lg p-3 focus:outline-none focus:border-blush-100"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="usuario" className="text-gray-600 font-semibold">
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Digite seu usuário"
              className="border-2 border-pink-200 rounded-lg p-3 focus:outline-none focus:border-blush-100"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="foto" className="text-gray-600 font-semibold">
              Foto
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Insira o link da sua foto"
              className="border-2 border-pink-200 rounded-lg p-3 focus:outline-none focus:border-blush-100"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="senha" className="text-gray-600 font-semibold">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              className="border-2 border-pink-200 rounded-lg p-3 focus:outline-none focus:border-blush-100"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmarSenha"
              className="text-gray-600 font-semibold"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              className="border-2 border-pink-200 rounded-lg p-3 focus:outline-none focus:border-blush-100"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
            />
          </div>

          <div className="flex justify-around w-full gap-4">
            <button
              type="button"
              onClick={retornar}
              className="rounded-lg bg-danger hover:bg-danger-100 text-white font-bold py-3 w-full transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blush-100 hover:bg-blush-50 text-white font-bold py-3 w-full transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <Puff
                  height="24"
                  width="24"
                  color="#ffffff"
                  ariaLabel="puff-loading"
                  visible={true}
                />
              ) : (
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;