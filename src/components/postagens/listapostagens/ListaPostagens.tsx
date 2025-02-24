import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { useContext, useEffect, useState } from "react";
import Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { BeatLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {
  const navigate = useNavigate();
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagens() {
    try {
      await buscar("/postagens", setPostagens, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    buscarPostagens();
  }, [postagens.length]);

  useEffect(() => {
    if (token === "") {
      ToastAlerta("É preciso estar logado para acessar esta página", "info");
      navigate("/");
    }
  }, [token]);

  return (
    <>
      {postagens.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="#4a154b" />
        </div>
      )}
      <div className="flex justify-center w-full my-4 p-3">
        <div className="container flex flex-col mx-2">
          <div
            className="container mx-auto my-4 
                          grid grid-cols-1 md:grid-cols-2 
                          lg:grid-cols-3 gap-4"
          >
            {postagens.map((postagem) => (
              <CardPostagens key={postagem.id} postagem={postagem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaPostagens;
