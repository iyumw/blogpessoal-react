import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export function DropdownTemas() {
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

  return (
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
        <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40 right-0">
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
  );
}
