import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DropdownPostagens } from "./DropdownPostagens";
import { DropdownTemas } from "./DropdownTemas";
import { DropdownUsuario } from "./DropdownUsuario";

const Navbar = () => {
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
          <DropdownPostagens />

          <DropdownTemas />

          <DropdownUsuario />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
