import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "http://localhost:8000/api";

// FUNÇÃO PARA LISTAR TODOS OS SÓCIOS ------------------------------------------------------
export const listaDisponivelSocios = (setSocios, setLoading) => {
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

// FUNÇÃO PARA LISTAR TODAS AS CATEGORIAS ------------------------------------------------------
export const listaCategorias = (setCategorias, setLoading) => {
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

// FUNÇÃO PARA ADICIONAR CATEGORIA ------------------------------------------------------
export const adicionaCategoria = (
  categoria,
  setCategorias,
  setModo,
  setErro
) => {
  axios
    .post(
      `${url}/categorias/adicionar/`,
      {
        categoria: categoria,
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

      setCategorias((prev) => [...prev, res.data.categoria]);
      setModo(null);

      toast.success("Categoria Adicionada com Sucesso!");
    })
    .catch((err) => {
      console.log("Código do erro:", err.response.status);
      console.log("Mensagem do erro:", err.response.data.mensagem);

      if (err.response.status == 404) {
        setErro(err.response.data.mensagem);
      }
    });
};

// FUNÇÃO PARA LISTAR O HISTÓRICO DE TODAS AS CATEGORIAS ------------------------------------------------------
export const listaHistoricoCategorias = (setCategorias, setLoading) => {
  axios
    .get(`${url}/categorias/historico/`, {
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

// FUNÇÃO PARA EDITAR CATEGORIA ------------------------------------------------------
export const editaCategoria = (categoria, setCategorias, setModo, setErro) => {
  const id_categoria = categoria.id;

  axios
    .put(
      `${url}/categorias/editar/`,
      {
        categoria: categoria,
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

      setCategorias((prev) =>
        prev.map((categoria) =>
          categoria.id == id_categoria ? res.data.categoria : categoria
        )
      );
      setModo(null);

      toast.success("Categoria Atualizada com Sucesso!");
    })
    .catch((err) => {
      console.log("Código do erro:", err.response.status);
      console.log("Mensagem do erro:", err.response.data.mensagem);

      if (err.response.status == 404) {
        setErro(err.response.data.mensagem);
      }
    });
};

// FUNÇÃO PARA ALTERAR ESTADO CATEGORIA ------------------------------------------------------
export const alteraEstadoCategoria = (
  id_categoria,
  setCategorias,
  setModalEstadoAberta
) => {
  axios
    .put(
      `${url}/categorias/altera-estado/${id_categoria}/`,
      {},
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

      setCategorias((prev) =>
        prev.map((categoria) =>
          categoria.id == id_categoria
            ? { ...categoria, estado: categoria.estado == 1 ? 0 : 1 }
            : categoria
        )
      );
      setModalEstadoAberta(false);

      toast.success("Estado da Categoria Alterado com Sucesso!");
    })
    .catch((err) => {
      console.log("Código do erro:", err.response.status);
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};

// FUNÇÃO PARA LISTAR TODAS AS CATEGORIAS DISPONÍVEIS ------------------------------------------------------
export const listaCategoriasDisponiveis = (setCategorias) => {
  axios
    .get(`${url}/categorias/`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      setCategorias(res.data);
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};

// FUNÇÃO PARA LISTAR TODAS OS UTILIZADORES DISPONÍVEIS ------------------------------------------------------
export const listaUtilizadoresDisponiveis = (nome, setOpcoes, setLoading) => {
  setLoading(true);
  axios
    .get(`${url}/utilizadores/pesquisa/?pesquisa=${nome}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      setOpcoes(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
    });
};

// FUNÇÃO PARA ADICIONAR NOVO SOCIO ------------------------------------------------------
export const adicionaNovoSocio = (
  novoSocio,
  setSocios,
  setModo,
  setErro
) => {
  axios
    .post(
      `${url}/socios/adicionar/`,
      {
        socio: novoSocio,
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

      setSocios((prev) => [...prev, res.data.socio]);
      setModo(null);

      toast.success("Sócio Adicionado com Sucesso!");
    })
    .catch((err) => {
      console.log("Código do erro:", err.response.status);
      console.log("Mensagem do erro:", err.response.data.mensagem);

      if (err.response.status == 404) {
        setErro(err.response.data.mensagem);
      }
    });
};
