import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { Pencil, Trash } from "@phosphor-icons/react";

interface CardPostagensProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
  return (
    <div
      className="border border-pink-200 
            flex flex-col rounded overflow-hidden justify-between bg-rose-50"
    >
      <div>
        <div className="flex w-full bg-pink-100 py-2 px-4 items-center gap-4">
          <img
            src={postagem.usuario?.foto}
            className="h-12 rounded-full"
            alt={postagem.usuario?.nome}
          />
          <h3 className="text-lg font-bold text-center uppercase text-gray">
            {postagem.usuario?.nome}
          </h3>

          <div className="flex flex-grow justify-end gap-1">
            <Link
              to={`/editarpostagem/${postagem.id}`}
              className="text-white bg-blush-100 hover:bg-blush-50
                        flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out mr-2"
            >
              <Pencil size={20} />
            </Link>
            <Link
              to={`/deletarpostagem/${postagem.id}`}
              className="text-white bg-danger hover:bg-danger-100 flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out"
            >
              <Trash size={20} />
            </Link>
          </div>
        </div>
        <div className="p-4 bg-rose-100">
          <h4 className="text-lg font-semibold uppercase text-purple">
            {postagem.titulo}
          </h4>
          <p className="text-gray-50">{postagem.conteudo}</p>
          <p className="text-gray-50">Tema: {postagem.tema?.descricao}</p>
          <p className="text-gray-50">
            Data:{" "}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(postagem.data))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardPostagem;