import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "http://localhost:8000/api";

// FUNÇÃO PARA LISTAR TODAS AS EQUIPAS DE UMA DETERMINADA MODALIDADE ------------------------------------------------------
export const listaEquipas = (id_modalidade, setEquipas, setLoading) => {
  axios
    .get(`${url}/listaEquipas/${id_modalidade}/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);

      setEquipas(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};

// FUNÇÃO PARA ADICIONAR NOVA EQUIPA DE UMA DETERMINADA MODALIDADE ------------------------------------------------------
export const adicionaEquipa = (
  id_modalidade,
  equipa,
  setEquipas,
  setModo,
  setErro
) => {
  axios
    .post(
      `${url}/adiciona-equipa/${id_modalidade}/`,
      {
        nome: equipa.nome,
        epoca: equipa.epoca,
        categoria: equipa.categoria,
      },
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);

      setEquipas((prev) => [...prev, res.data.equipa]);
      setModo(null);

      toast.success("Equipa Adicionada com Sucesso!");

    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);

      if (err.response.status == 404) {
        setErro(err.response.data.mensagem);
      }
    });
};
