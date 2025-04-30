import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "http://localhost:8000/api"

// FUNÇÃO PARA LISTAR TODAS AS EPOCAS DE UMA DETERMINADA MODALIDADE ------------------------------------------------------
export const listaEpocas = (id_modalidade, setEpocas, setLoading) => {
  axios
  .get(
    `${url}/listaEpocas/${id_modalidade}/`,
    {
      withCredentials: true,
    }
  )
  .then((res) => {
    console.log("Resposta do Backend: ", res.data);

    setEpocas(res.data);
    setLoading(false);
  })
  .catch((err) => {
    console.log("Mensagem do erro:", err.response.data.mensagem);
  });
}