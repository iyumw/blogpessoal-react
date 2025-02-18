import { Link, useNavigate } from "react-router-dom";
import "../cadastro/Cadastro.css";
import UsuarioLogin from "../../models/UsuarioLogin";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

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

  console.log(JSON.stringify(usuarioLogin));

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <form
          onSubmit={login}
          className="flex justify-center items-center flex-col w-1/2 gap-4"
        >
          <h2 className="text-blush-100 text-5xl">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-gray-50 rounded p-2"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-gray-50 rounded p-2"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <button
            type="submit"
            className="rounded bg-pink-50 flex justify-center hover:bg-blush-50 text-purple w-1/2 py-2 px-5"
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
              <span>Entrar</span>
            )}
          </button>

          <hr className="border-gray w-full" />

          <p>
            Ainda não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-blue hover:text-blush-100 hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
        <div className="fundoCadastro hidden lg:block"></div>
      </div>
    </>
  );
}

export default Login;
