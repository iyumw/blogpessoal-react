import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

export function DropdownUsuario() {
  const navigate = useNavigate();
  const { handleLogout, usuario } = useContext(AuthContext);
  const [temaDropdown, setTemaDropdown] = useState(false);
  const [usuarioDropdown, setUsuarioDropdown] = useState(false);
  const [postagemDropdown, setPostagemDropdown] = useState(false);

  // Referências para os dropdowns
  const temaDropdownRef = useRef<HTMLDivElement>(null);
  const usuarioDropdownRef = useRef<HTMLDivElement>(null);
  const postagemDropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        temaDropdownRef.current &&
        !temaDropdownRef.current.contains(event.target as Node)
      ) {
        setTemaDropdown(false);
      }
      if (
        usuarioDropdownRef.current &&
        !usuarioDropdownRef.current.contains(event.target as Node)
      ) {
        setUsuarioDropdown(false);
      }
      if (
        postagemDropdownRef.current &&
        !postagemDropdownRef.current.contains(event.target as Node)
      ) {
        setPostagemDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function logout() {
    handleLogout();
    ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
    navigate("/");
  }

  return (
    <div className="relative" ref={usuarioDropdownRef}>
      <button
        onClick={() => {
          setUsuarioDropdown(!usuarioDropdown);
          setTemaDropdown(false);
          setPostagemDropdown(false); // Fecha os outros dropdowns
        }}
        className="hover:text-pink-50 transition duration-300 ease-in-out hover:-translate-y-1 flex items-center gap-1"
      >
        {usuario ? `Olá, ${usuario.nome}!` : "Olá!"}
        <i className="bi bi-caret-down-fill text-sm"></i>
      </button>
      {usuarioDropdown && (
        <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40 right-0">
          {usuario && (
            <>
              <Link
                to="/perfil"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setUsuarioDropdown(false)}
              >
                Perfil
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Sair
              </button>
            </>
          )}
          {!usuario && (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-200"
              onClick={() => setUsuarioDropdown(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
