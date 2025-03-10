import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import DeletarPostagem from "../../components/postagens/deletarpostagem/DeletarPostagem";
import FormPostagem from "../../components/postagens/formpostagem/FormPostagem";
import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import DeletarTema from "../../components/temas/deletartema/DeletarTema";
import FormTema from "../../components/temas/formtema/FormTema";
import ListaTemas from "../../components/temas/listatemas/ListaTemas";
import Cadastro from "../cadastro/Cadastro";
import Home from "../home/Home";
import Login from "../login/Login";
import Perfil from "../perfil/Perfil";


function AppRoutes() {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="min-h-[80vh] flex-grow items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastrartema" element={<FormTema />} />
          <Route path="/editartema/:id" element={<FormTema />} />
          <Route path="/deletartema/:id" element={<DeletarTema />} />
          <Route path="/temas" element={<ListaTemas />} />
          <Route path="/postagens" element={<ListaPostagens />} />
          <Route path="/cadastrarpostagem" element={<FormPostagem />} />
          <Route path="/editarpostagem/:id" element={<FormPostagem />} />
          <Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
      <Footer isFixed={!isHome} />
    </div>
      
      
    </>
  );
}

export default AppRoutes;
