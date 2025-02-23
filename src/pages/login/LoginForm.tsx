import { Link, useNavigate } from "react-router-dom";
import "../cadastro/Cadastro.css";
import UsuarioLogin from "../../models/UsuarioLogin";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { InputField } from "../cadastro/InputField";
import { PasswordField } from "../cadastro/PasswordField";
import { SubmitButton } from "../cadastro/SubmitButton";


export function LoginForm() {
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
    <form onSubmit={login} className="flex flex-col gap-6">
      <h2 className="text-purple text-4xl font-bold text-center">Entrar</h2>

      <InputField
        label="Usuário"
        type="text"
        id="usuario"
        name="usuario"
        placeholder="Digite seu usuário"
        value={usuarioLogin.usuario}
        onChange={atualizarEstado}
      />

      <PasswordField
        label="Senha"
        id="senha"
        name="senha"
        placeholder="Digite sua senha"
        value={usuarioLogin.senha}
        onChange={atualizarEstado}
      />

      <SubmitButton isLoading={isLoading} text="Entrar" />

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
  );
}
