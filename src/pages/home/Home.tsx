function Home() {
  return (
    <div className="flex justify-center bg-[#fceff0]">
      <div className="container grid grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <h2 className="text-4xl font-bold text-gray-800">
            Seja Bem Vindo!
          </h2>
          <p className="text-x">
            Expresse aqui seus pensamentos e opiniões
          </p>
          <div className="flex justify-around gap-4">
            <button className="rounded-lg bg-[#FFC0CB] border-[#FFC0CB] hover:bg-[#FFB6C1] hover:border[#985863] hover:text-[#4A154B] border-solid border-2 py-2 px-4 delay-100 duration-300 ease-in-out ">
              Nova Postagem
            </button>
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
  );
}

export default Home;
