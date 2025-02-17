import axios from "axios"

const api = axios.create({
    baseURL: 'https://blog-pessoal-1-cdf2.onrender.com/',
    headers: {
      "Content-Type": "application/json",
    },
})

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    try {
      const resposta = await api.post(url, dados);
      setDados(resposta.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  };

  export const login = async (url: string, dados: Object, setDados: Function) => {
    try {
      const resposta = await api.post(url, dados); // Usar método POST explicitamente
      setDados(resposta.data);
    } catch (error) {
      console.error('Erro ao logar:', error);
      throw error;
    }
  }