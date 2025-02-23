import "../cadastro/Cadastro.css";
import { LoginForm } from "./LoginForm";

function Login() {
  return (
      <div className="min-h-[calc(100vh-6rem-6rem)] bg-rose-50 flex items-center justify-center md:py-12 md:px-6 pb-30 md:pb-35 pt-5">
        <div className=" w-full max-w-2xl bg-rose-100 rounded-lg shadow-lg p-8">
          <LoginForm />
        </div>
      </div>
  );
}

export default Login;
