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

    setEpocas(res.data.sort((a, b) => b.nome.localeCompare(a.nome)));

    setLoading(false);
  })
  .catch((err) => {
    console.log("Mensagem do erro:", err.response.data.mensagem);
  });
}

// FUNÇÃO PARA ADICIONAR NOVA ÉPOCA DE UMA DETERMINADA MODALIDADE ------------------------------------------------------
export const adicionaEpoca = (
  id_modalidade,
  epoca,
  setEpocas,
  setModo,
  setErro
) => {
  axios
    .post(
      `${url}/adiciona-epoca/${id_modalidade}/`,
      {
        nome: epoca.nome,
        data_inicio: epoca.data_inicial,
        data_fim: epoca.data_final,
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

      setEpocas((prev) =>
        [...prev, res.data.epoca].sort((a, b) => b.nome.localeCompare(a.nome))
      );
      
      setModo(null);

      toast.success("Época Adicionada com Sucesso!");

    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);

      if (err.response.status == 404) {
        setErro(err.response.data.mensagem);
      }
    });
};

// FUNÇÃO PARA REMOVER ÉPOCA ------------------------------------------------------
export const removeEpoca = (id_epoca, setEpocas, setModalRemover) => {
  axios
  .delete(
    `${url}/remove-epoca/${id_epoca}/`,
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      
      setEpocas((prev) => prev.filter((epoca) => epoca.id != id_epoca));

      setModalRemover(false)
      toast.success(`Época Removida com Sucesso!`);

    })
    .catch((err) => {
      console.log("Código do erro:", err.response.status);
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
}