import { useNavigate } from "react-router-dom";
import CardTemas from "../cardtemas/CardTemas";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import { BeatLoader } from "react-spinners";

function ListaTemas() {
  const navigate = useNavigate();
  const [temas, setTemas] = useState<Tema[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: {
          Authorization: token,
        },
      });
      setTemas((prevTemas) =>
        [...prevTemas].sort((a, b) => a.descricao.localeCompare(b.descricao))
      );
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("É preciso estar logado para acessar esta página");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [temas.length]);

  return (
    <div className="min-h-screen bg-rose-50 p-6">
      {temas.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="#4a154b" />
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-4xl text-purple font-bold text-center my-8">
            Lista de Temas
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {temas.map((tema) => (
              <CardTemas key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaTemas;
