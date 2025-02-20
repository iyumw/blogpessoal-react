import { Link, useNavigate } from "react-router-dom";
import "../cadastro/Cadastro.css";
import UsuarioLogin from "../../models/UsuarioLogin";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Puff } from "react-loader-spinner";

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="min-h-[85vh] bg-rose-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-rose-100 rounded-lg shadow-lg p-8">
        <form onSubmit={login} className="flex flex-col gap-6">
          <h2 className="text-purple text-4xl font-bold text-center">
            Entrar
          </h2>

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
              value={usuarioLogin.usuario}
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
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blush-100 hover:bg-blush-50 text-white font-bold py-3 transition-colors"
            disabled={isLoading}
          >
            <div className="flex justify-center items-center">
              {isLoading ? (
              <Puff
                height="24"
                width="24"
                color="#ffffff"
                ariaLabel="puff-loading"
                visible={true}
              />
            ) : (
              <span>Entrar</span>
            )}
            </div>
            
          </button>

          <hr className="border-pink-200" />

          <p className="text-center text-gray-600">
            Ainda não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-purple hover:text-blush-100 hover:underline font-semibold"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;