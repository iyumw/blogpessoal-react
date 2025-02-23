import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";

export function FormCadastro() {
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
      alert("Senhas não conferem ou a senha precisa ter no mínimo 8 caracteres");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }

  return (
    <form onSubmit={cadastrarNovoUsuario} className="flex flex-col gap-4.25">
      <h2 className="text-purple text-4xl font-bold text-center">Cadastrar</h2>

      <InputField
        label="Nome"
        type="text"
        id="nome"
        name="nome"
        placeholder="Digite seu nome"
        value={usuario.nome}
        onChange={atualizarEstado}
      />

      <InputField
        label="Usuário"
        type="text"
        id="usuario"
        name="usuario"
        placeholder="Digite seu usuário"
        value={usuario.usuario}
        onChange={atualizarEstado}
      />

      <InputField
        label="Foto"
        type="text"
        id="foto"
        name="foto"
        placeholder="Insira o link da sua foto"
        value={usuario.foto}
        onChange={atualizarEstado}
      />

      <PasswordField
        label="Senha"
        id="senha"
        name="senha"
        placeholder="Digite sua senha"
        value={usuario.senha}
        onChange={atualizarEstado}
      />

      <PasswordField
        label="Confirmar Senha"
        id="confirmarSenha"
        name="confirmarSenha"
        placeholder="Confirme sua senha"
        value={confirmarSenha}
        onChange={handleConfirmarSenha}
      />

      <div className="flex justify-around w-full gap-4">
        <button
          type="button"
          onClick={retornar}
          className="rounded-lg bg-danger hover:bg-danger-100 text-white font-bold py-3 w-full transition-colors"
        >
          Cancelar
        </button>
        <SubmitButton isLoading={isLoading} text="Cadastrar" />
      </div>
    </form>
  );
}
