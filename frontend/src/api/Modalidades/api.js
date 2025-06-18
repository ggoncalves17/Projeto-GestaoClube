import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "http://localhost:8000/api"

// FUNÇÃO PARA LISTAR TODAS AS MODALIDADES ------------------------------------------------------
export const listaModalidades = (id_clube, setDesportos, setLoading=null, listaNomes=false) => {
  axios
  .get(
    `${url}/listaModalidades/${id_clube}/`,
    {
      withCredentials: true,
    }
  )
  .then((res) => {
    console.log("Resposta do Backend: ", res.data);

    let dados = res.data;

    if(listaNomes) {
      dados = dados.map((elemento) => elemento.nome);
    }
    setDesportos(dados);

    if(setLoading != null) {
      setLoading(false);
    }
  })
  .catch((err) => {
    console.log("Mensagem do erro:", err.response.data.mensagem);
  });
}

// FUNÇÃO PARA ADICIONAR MODALIDADE ------------------------------------------------------
export const adicionaModalidade = (nome, id_clube, setDesportos, setModo, setErro) => {
  axios
  .post(
    `${url}/adiciona-modalidade/`,
    {
      nome: nome,
      id_clube: id_clube,
    },
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "multipart/form-data",
      },
    }
  )
  .then((res) => {
    console.log("Resposta do Backend: ", res.data);
    
    setDesportos((prev) => [...prev, res.data.modalidade]);
    setModo(null);
    
    toast.success("Modalidade Adicionada com Sucesso!");

  })
  .catch((err) => {
    console.log("Código do erro:", err.response.status);
    console.log("Mensagem do erro:", err.response.data.mensagem);

    if (err.response.status == 404) {
      setErro(err.response.data.mensagem);
    }
  })
}

// FUNÇÃO PARA EDITAR MODALIDADE ------------------------------------------------------
export const editaModalidade = (nome, id_modalidade, setDesportos, setModo, setErro) => {
  axios
  .put(
    `${url}/edita-modalidade/${id_modalidade}/`,
    {
      nome: nome,
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
    
    setDesportos((prev) =>
      prev.map((modalidade) =>
        modalidade.id == id_modalidade
          ? { ...modalidade, nome: res.data.modalidade.nome }
          : modalidade
      )
    );
    setModo(null);

    toast.success(`Modalidade Editada com Sucesso!`);

  })
  .catch((err) => {
    console.log("Código do erro:", err.response.status);
    console.log("Mensagem do erro:", err.response.data.mensagem);

    if (err.response.status == 404) {
      setErro(err.response.data.mensagem);
    }
    
  })
}

// FUNÇÃO PARA REMOVER MODALIDADE ------------------------------------------------------
export const removeModalidade = (id_modalidade, setDesportos, setModalRemover) => {
  axios
  .delete(
    `${url}/remove-modalidade/${id_modalidade}/`,
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      
      setDesportos((prev) => prev.filter((modalidade) => modalidade.id != id_modalidade))

      setModalRemover(false)
      toast.success(`Modalidade Removida com Sucesso!`);

    })
    .catch((err) => {
      console.log("Código do erro:", err.response.status);
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
}

