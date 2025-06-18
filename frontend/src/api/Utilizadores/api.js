import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "http://localhost:8000/api";

// FUNÇÃO PARA LISTAR TODOS OS UTILIZADORES GERAIS ------------------------------------------------------
export const listaUtilizadoresGerais = (
  setUtilizadoresGerais,
  setLoading
) => {
  axios
    .get(`${url}/utilizadores/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      setUtilizadoresGerais(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};

// FUNÇÃO PARA LISTAR TODOS OS ELEMENTOS DO STAFF ------------------------------------------------------
export const listaStaff = (
  setStaff,
  setLoading
) => {
  axios
    .get(`${url}/staff/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      setStaff(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};

// FUNÇÃO PARA LISTAR TODOS OS ELEMENTOS (JOGADORES / TREINADORES) ------------------------------------------------------
export const listaElementos = (
  setJogadores,
  setLoading
) => {
  axios
    .get(`${url}/elementos/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      setJogadores(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};

// FUNÇÃO PARA LISTAR TODOS AS INSCRIÇÕES DE UM ELEMENTO (JOGADOR / TREINADOR) ------------------------------------------------------
export const listaInscricoesJogador = (
  id_elemento,
  setInscricoes,
  setLoading
) => {
  axios
    .get(`${url}/elementos/${id_elemento}/inscricoes/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);

      setInscricoes(res.data);

      setLoading(false);
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};

// FUNÇÃO PARA ADICIONAR NOVA INSCRIÇÃO DE UMA DETERMINADA ÉPOCA DE UM JOGADOR ------------------------------------------------------
export const adicionaInscricaoEpoca = (
  id_jogador,
  id_epoca,
  setInscricoes,
  setModo,
  setErro
) => {
  axios
    .post(
      `${url}/elementos/${id_jogador}/inscricoes/adicionar/`,
      {
        id_epoca: id_epoca,
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

      console.log("DATA INSCRICAO: ", res.data.inscricao);

      setInscricoes((prev) =>
        [...prev, res.data.inscricao].sort((a, b) =>
          b.epoca.localeCompare(a.epoca)
        )
      );

      setModo(null);

      toast.success("Inscrição Adicionada com Sucesso!");
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);

      if (err.response.status == 404) {
        setErro(err.response.data.mensagem);
      }
    });
};

// FUNÇÃO PARA REMOVER INSCRIÇÃO ------------------------------------------------------
export const removeInscricao = (
  id_inscricao,
  setInscricoes,
  setModalRemover
) => {
  axios
    .delete(`${url}/inscricoes/${id_inscricao}/remover/`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);

      setInscricoes((prev) =>
        prev.filter((inscricao) => inscricao.id != id_inscricao)
      );

      setModalRemover(false);
      toast.success(`Inscrição Removida com Sucesso!`);
    })
    .catch((err) => {
      console.log("Código do erro:", err.response.status);
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};

// FUNÇÃO PARA EDITAR EPOCA INSCRICAO ------------------------------------------------------
export const editaInscricaoEpoca = (
  novaInscricao,
  setInscricoes,
  setModo,
  setErro
) => {
  const id_inscricao = novaInscricao.id;

  axios
    .put(
      `${url}/inscricoes/${id_inscricao}/editar/`,
      {
        epoca: novaInscricao.epoca,
        estado: novaInscricao.estado,
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

      setInscricoes((prev) =>
        prev
          .map((inscricao) =>
            inscricao.id == id_inscricao
              ? {
                  ...inscricao,
                  epoca: res.data.inscricao.epoca,
                  estado: res.data.inscricao.estado,
                }
              : inscricao
          )
          .sort((a, b) => b.epoca.localeCompare(a.epoca))
      );
      setModo(null);

      toast.success(`Inscrição Editada com Sucesso!`);
    })
    .catch((err) => {
      console.log("Código do erro:", err.response.status);
      console.log("Mensagem do erro:", err.response.data.mensagem);

      if (err.response.status == 404) {
        setErro(err.response.data.mensagem);
      }
    });
};

// FUNÇÃO PARA EDITAR EPOCA INSCRICAO ------------------------------------------------------
export const uploadDocumentosInscricao = (
  id_inscricao,
  documentos,
  setInscricoes,
  setModo,
  setErro
) => {
  const formData = new FormData();

  console.log("DOCUMENTOS A SEREM ENVIADOS: ", documentos);

  if (documentos.cartao_cidadao) {
    formData.append("cartao_cidadao", documentos.cartao_cidadao);
  }
  if (documentos.exames_medicos) {
    formData.append("exames_medicos", documentos.exames_medicos);
  }

  axios
    .put(`${url}/inscricoes/${id_inscricao}/documentos/upload/`, formData, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);

      setInscricoes((prev) =>
        prev.map((inscricao) =>
          inscricao.id == id_inscricao
            ? {
                ...inscricao,
                cartao_cidadao: res.data.inscricao.cartao_cidadao,
                exames_medicos: res.data.inscricao.exames_medico,
              }
            : inscricao
        )
      );
      setModo(null);

      toast.success(`Documentos Inseridos com Sucesso!`);
    })
    .catch((err) => {
      console.log("DOCUMENTOS ERROS: ", err);

      console.log("Código do erro:", err.response.status);
      console.log("Mensagem do erro:", err.response.data.mensagem);

      if (err.response.status == 404) {
        setErro(err.response.data.mensagem);
      }
    });
};
