import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "http://localhost:8000/api"

// FUNÇÃO PARA LISTAR TODOS OS JOGOS DO CLUBE ------------------------------------------------------
export const listaTodosJogos = (setJogos) => {
  axios
    .get(`${url}/jogos/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);

      setJogos(res.data);
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};