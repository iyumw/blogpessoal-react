import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// import { buscarPostagensPorUsuario } from "../../services/Service";

function Perfil() {
//   const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
//   const [postagens, setPostagens] = useState<Postagem[]>([]);
//   const [carregando, setCarregando] = useState(true);
//   const token = usuario.token;

  // useEffect(() => {
  //     if (usuario.token === "") {
  //         ToastAlerta("Você precisa estar logado", "info");
  //         navigate("/");
  //     } else {
  //         carregarPostagensDoUsuario();
  //     }
  // }, [usuario.token, navigate]);

  // async function carregarPostagensDoUsuario() {
  //     setCarregando(true);
  //     console.log("Token atual:", token);
  //     try {
  //         await buscarPostagensPorUsuario(usuario.id, setPostagens, {
  //             headers: { Authorization: `Bearer ${token}` },
  //         });
  //     } catch (error: any) {
  //         if (error.toString().includes("403")) {
  //             ToastAlerta("Sua sessão expirou. Por favor, faça login novamente.", "erro");
  //             navigate("/login");
  //         } else {
  //             ToastAlerta("Erro ao carregar postagens.", "erro");
  //         }
  //     } finally {
  //         setCarregando(false);
  //     }
  // }

  return (
    <div className="container mx-auto my-8 rounded-2xl overflow-hidden shadow-lg">
      {/* Imagem de capa */}
      <img
        className="w-full h-72 object-cover border-b-8 border-white"
        src="https://i.imgur.com/ZZFAmzo.jpg"
        alt="Capa do Perfil"
      />

      {/* Foto de perfil */}
      <img
        className="rounded-full w-48 h-48 mx-auto mt-[-8rem] border-8 border-white relative z-10"
        src={usuario.foto}
        alt={`Foto de perfil de ${usuario.nome}`}
      />

      {/* Informações do usuário */}
      <div className="relative mt-[-4rem] bg-pink-100 py-18 px-4 text-center">
        <h1 className="text-3xl font-bold text-purple">{usuario.nome}</h1>
        <p className="text-gray-600 mt-2">{usuario.usuario}</p>
      </div>

      {/* Seção de postagens
            <div className="bg-white p-8">
                <h2 className="text-2xl font-bold text-purple mb-6">
                    Minhas Postagens
                </h2>

                {carregando ? (
                    <div className="flex justify-center">
                        <RotatingLines
                            strokeColor="purple"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                        />
                    </div>
                ) : postagens.length > 0 ? (
                    <ListaPostagensUsuario postagens={postagens} />
                ) : (
                    <p className="text-gray-600 text-center">
                        Nenhuma postagem encontrada.
                    </p>
                )}
            </div> */}
    </div>
  );
}

export default Perfil;
