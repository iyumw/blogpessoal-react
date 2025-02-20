import { Link } from "react-router-dom";
import Tema from "../../../models/Tema";

interface CardTemasProps {
  tema: Tema;
}

function CardTemas({ tema }: CardTemasProps) {
  return (
    <div className="border border-pink-200 flex flex-col rounded-2xl overflow-hidden shadow-lg bg-rose-100">
      <header className="py-4 px-6 bg-pink-100 text-purple font-bold text-2xl text-center">
        Tema
      </header>
      <p className="p-8 text-gray-600 text-2xl bg-rose-50 h-full text-center">
        {tema.descricao}
      </p>

      <div className="flex">
        <Link
          to={`/editartema/${tema.id}`}
          className="w-full text-white bg-blush-100 hover:bg-blush-50 
                        flex items-center justify-center py-3 transition-colors"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletartema/${tema.id}`}
          className="w-full text-white bg-danger hover:bg-danger-100 
                    flex items-center justify-center py-3 transition-colors"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardTemas;