import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#99616c] p-4 shadow-lg text-[#fceff0]">
      <div className="container mx-auto flex justify-between items-center px-25">
        <Link
          to="/"
          className=" text-2xl font-bold transition duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:text-[#e0a3ad]"
        >
          Blog Pessoal
        </Link>

        <div className="flex space-x-6">
          <Link
            to="/"
            className="hover:text-[#e0a3ad] transition duration-300 ease-in-out hover:-translate-y-1"
          >
            Postagens
          </Link>

          <Link
            to="/"
            className="hover:text-[#e0a3ad] transition duration-300 ease-in-out hover:-translate-y-1"
          >
            Temas
          </Link>

          <Link
            to="/"
            className="hover:text-[#e0a3ad] transition duration-300 ease-in-out hover:-translate-y-1"
          >
            Perfil
          </Link>

          <Link
            to="/"
            className="hover:text-[#e0a3ad] transition duration-300 ease-in-out hover:-translate-y-1"
          >
            Cadastrar Tema
          </Link>

          <Link
            to="/"
            className="hover:text-[#e0a3ad] transition duration-300 ease-in-out hover:-translate-y-1"
          >
            Sair
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
