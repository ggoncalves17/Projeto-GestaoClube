import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "http://localhost:8000/api"

// FUNÇÃO PARA LISTAR TODAS AS EQUIPAS DE UMA DETERMINADA MODALIDADE ------------------------------------------------------
export const listaEquipas = (id_modalidade, setEquipas, setLoading) => {
  axios
  .get(
    `${url}/listaEquipas/${id_modalidade}/`,
    {
      withCredentials: true,
    }
  )
  .then((res) => {
    console.log("Resposta do Backend: ", res.data);

    setEquipas(res.data);
    setLoading(false);
  })
  .catch((err) => {
    console.log("Mensagem do erro:", err.response.data.mensagem);
  });
}