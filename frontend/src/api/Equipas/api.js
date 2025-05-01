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

// FUNÇÃO PARA EDITAR EQUIPA ------------------------------------------------------
export const editaEquipa = (id_equipa, equipa, setEquipas, setModo, setErro) => {
  axios
  .put(
    `${url}/edita-equipa/${id_equipa}/`,
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

    console.log("EPOCA APOS EDIÇÃO: ", res.data.equipa.epoca.nome);
    
    
    setEquipas((prev) =>
      prev.map((equipa) =>
        equipa.id == id_equipa
          ? {...equipa, nome: res.data.equipa.nome, categoria: res.data.equipa.categoria, epoca: {...equipa.epoca, nome: res.data.equipa.epoca.nome} }
          : equipa
      )
    );
    setModo(null);

    toast.success(`Equipa Editada com Sucesso!`);

  })
  .catch((err) => {
    console.log("Código do erro:", err.response.status);
    console.log("Mensagem do erro:", err.response.data.mensagem);

    if (err.response.status == 404) {
      setErro(err.response.data.mensagem);
    }
    
  })
}

// FUNÇÃO PARA REMOVER EQUIPA ------------------------------------------------------
export const removeEquipa = (id_equipa, setEquipas, setModalRemover) => {
  axios
  .delete(
    `${url}/remove-equipa/${id_equipa}/`,
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      
      setEquipas((prev) => prev.filter((equipa) => equipa.id != id_equipa));

      setModalRemover(false)
      toast.success(`Equipa Removida com Sucesso!`);

    })
    .catch((err) => {
      console.log("Código do erro:", err.response.status);
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
}