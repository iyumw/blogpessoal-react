import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
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
    alert("O usuário foi desconectado com sucesso");
    navigate("/");
  }

  return (
    <nav className="bg-pink-200 p-4 shadow-lg text-rose-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          to="/home"
          className="text-3xl font-bold transition duration-300 ease-in-out hover:text-pink-50 hover:scale-105"
        >
          Blog Pessoal
        </Link>

        <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
          {/* Dropdown Postagens */}
          <div className="relative" ref={postagemDropdownRef}>
            <button
              onClick={() => {
                setPostagemDropdown(!postagemDropdown);
                setUsuarioDropdown(false);
                setTemaDropdown(false); // Fecha os outros dropdowns
              }}
              className="hover:text-pink-50 transition duration-300 ease-in-out hover:-translate-y-1 flex items-center gap-1"
            >
              Postagens
              <i className="bi bi-caret-down-fill text-sm"></i>
            </button>
            {postagemDropdown && (
              <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40">
                <Link
                  to="/postagens"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setPostagemDropdown(false)}
                >
                  Postagens
                </Link>
                <Link
                  to="/cadastrarpostagem"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setPostagemDropdown(false)}
                >
                  Cadastrar Postagem
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown Temas */}
          <div className="relative" ref={temaDropdownRef}>
            <button
              onClick={() => {
                setTemaDropdown(!temaDropdown);
                setUsuarioDropdown(false);
                setPostagemDropdown(false); // Fecha os outros dropdowns
              }}
              className="hover:text-pink-50 transition duration-300 ease-in-out hover:-translate-y-1 flex items-center gap-1"
            >
              Temas
              <i className="bi bi-caret-down-fill text-sm"></i>
            </button>
            {temaDropdown && (
              <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40">
                <Link
                  to="/temas"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setTemaDropdown(false)}
                >
                  Temas
                </Link>
                <Link
                  to="/cadastrartema"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setTemaDropdown(false)}
                >
                  Cadastrar Tema
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown Usuário */}
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
              <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;