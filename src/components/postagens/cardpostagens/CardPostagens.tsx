import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";

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
        </div>
        <div className="p-4 bg-rose-100">
          <h4 className="text-lg font-semibold uppercase text-purple">{postagem.titulo}</h4>
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
      <div className="flex">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="w-full text-slate-100 bg-blush-100 hover:bg-blush-50 
    flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="text-white bg-danger hover:bg-danger-100 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;