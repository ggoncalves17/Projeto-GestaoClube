import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "http://localhost:8000/api";

// FUNÇÃO PARA LISTAR TODOS OS SÓCIOS ------------------------------------------------------
export const listaDisponivelSocios = (
  setSocios,
  setLoading
) => {
  axios
    .get(`${url}/socios/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      setSocios(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};

// FUNÇÃO PARA LISTAR TODOS AS CATEGORIAS ------------------------------------------------------
export const listaCategorias = (
  setCategorias,
  setLoading
) => {
  axios
    .get(`${url}/categorias/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      setCategorias(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};