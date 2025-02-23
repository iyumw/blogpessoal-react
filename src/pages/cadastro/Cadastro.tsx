import "./Cadastro.css";
import { FormCadastro } from "./FormCadastro";

function Cadastro() {


  return (
    <div className="min-h-[calc(100vh-6rem-6rem)] bg-rose-50 flex items-center justify-center p-6 py-12 pb-30 px-6">
      <div className="w-full max-w-2xl bg-rose-100 rounded-lg shadow-lg p-8">
        <FormCadastro />
      </div>
    </div>
  );
}

export default Cadastro;