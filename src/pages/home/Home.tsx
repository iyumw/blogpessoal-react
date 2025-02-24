import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem";

function Home() {
  return (
    <>
      <div className="flex justify-center bg-[#fceff0] mb-5">
        <div className="container grid grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <h2 className="text-4xl font-bold text-gray-800">Seja Bem Vindo!</h2>
            <p className="text-x">Expresse aqui seus pensamentos e opiniões</p>
            <div className="flex justify-around gap-4">
              <div className="flex justify-around gap-4">
                <ModalPostagem />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="https://ik.imagekit.io/iyume/Blog/Blog%20post-bro.png?updatedAt=1739564577839"
              alt="Imagem da Página Home"
              className="w-2/3"
            />
          </div>
        </div>
      </div>
      <ListaPostagens />
    </>
  );
}

export default Home;