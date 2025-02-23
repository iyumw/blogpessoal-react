import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export function DropdownPostagens() {

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

    return(
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
              <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40 right-0">
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
    )
}