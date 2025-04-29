import React, { useState, useContext, useEffect } from "react";
import styles from "./Modalidades.module.css";
import SearchBar from "../../components/SearchBar";
import GrupoRadioButton from "../../components/GrupoRadioButton";
import ListaModalidades from "../../components/ListaModalidades";
import Paginacao from "../../components/Paginacao/Paginacao";
import { UtilizadorContext } from "../../context/UtilizadorContext";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "../../components/JanelaModal/Modal";
import InputForm from "../../components/InputForm";
import { toast } from "react-toastify";
import PopUpRemoverModalidade from '../../components/PopUpRemoverModalidade'

const Modalidades = () => {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [desportos, setDesportos] = useState([]);
  const [estado, setEstado] = useState();
  const [modo, setModo] = useState(null);
  const [nomeModalidade, setNomeModalidade] = useState("");
  const [erro, setErro] = useState(null);
  const [modalidadeEscolhida, setModalidadeEscolhida] = useState(null);
  const [modalRemover, setModalRemover] = useState(null)

  const { utilizador: utilizadorInfo } = useContext(UtilizadorContext);

  useEffect(() => {
    switch (filtroEstado) {
      case "todos":
        setEstado(-1);
        break;
      case "ativos":
        setEstado(true);
        break;
      case "inativos":
        setEstado(false);
        break;
    }
  }, [filtroEstado]);

  useEffect(() => {
    if (modo == "Adicionar") {
      setNomeModalidade("");
      setModalidadeEscolhida(null);
    }
    setErro(null);
  }, [modo]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/listaModalidades/${utilizadorInfo.id_clube}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        const nomesModalidades = res.data.map((elemento) => elemento);
        setDesportos(nomesModalidades);
      })
      .catch((err) => {
        console.log("Mensagem do erro:", err.response.data.mensagem);
      });
  }, []);

  const modalidadesFiltradas = desportos.filter(
    (desporto) =>
      desporto.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
      (estado === -1 ? true : desporto.estado === estado)
  );

  const handleSubmeteModalidade = (event) => {
    event.preventDefault();

    if (modo === "Adicionar") {
      // Referência -> https://stackoverflow.com/a/8217584
      if (
        desportos.some(
          (modalidade) =>
            modalidade.nome.trim().toLowerCase() ===
            nomeModalidade.trim().toLowerCase()
        )
      ) {
        setErro("Já existe uma modalidade com o mesmo nome");
        return;
      }

      axios
        .post(
          "http://localhost:8000/api/adiciona-modalidade/",
          {
            nome: nomeModalidade,
            id_clube: utilizadorInfo.id_clube,
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
        });
    } else if (modo == "Editar") {
      if (
        desportos.some(
          (modalidade) =>
            modalidade.nome.trim().toLowerCase() ===
              nomeModalidade.trim().toLowerCase() &&
            modalidade.id !== modalidadeEscolhida
        )
      ) {
        setErro("Já existe uma modalidade com o mesmo nome");
        return;
      }

      axios
        .post(
          `http://localhost:8000/api/edita-modalidade/${modalidadeEscolhida}/`,
          {
            nome: nomeModalidade,
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

          setDesportos((prev) =>
            prev.map((modalidade) =>
              modalidade.id == modalidadeEscolhida
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
        });
    }
  };

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <p className={styles.titulo}>Desportos / Modalidades</p>
        <div className={styles.painelSuperior}>
          <div className={styles.painelSuperiorFiltros}>
            <SearchBar
              filtro={filtroNome}
              setFiltro={setFiltroNome}
              placeholder="modalidade"
            />
            <GrupoRadioButton
              filtro={filtroEstado}
              setFiltro={setFiltroEstado}
            />
          </div>
          <div className={styles.painelSuperiorAdicionar}>
            <button
              onClick={() => setModo("Adicionar")}
              className={styles.botaoAdicionar}
            >
              + Adicionar Modalidade
            </button>
          </div>
        </div>
        <div className={styles.painelInferior}>
          <ListaModalidades
            modalidadesFiltradas={modalidadesFiltradas}
            setModo={setModo}
            setModalidade={setModalidadeEscolhida}
            setNomeModalidade={setNomeModalidade}
            modalRemover={modalRemover}
            setModalRemover={setModalRemover}
          />
        </div>
        {/* <Paginacao totalUtilizadores={jogadoresFiltrados.length} utilizadoresPagina={utilizadoresPagina} paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual}/> */}
      </div>

      {modo && (
        <Modal
          setModal={setModo}
          titulo={`${modo} Modalidade`}
          botao={modo == "Adicionar" ? "Adicionar" : "Guardar"}
          onSubmit={handleSubmeteModalidade}
        >
          <InputForm
            label="Nome da Modalidade"
            valor={nomeModalidade}
            onChange={(e) => setNomeModalidade(e.target.value)}
            erro={erro}
            placeholder="Ex: Futebol"
          />
        </Modal>
      )}

      {modalRemover && <PopUpRemoverModalidade setDesportos={setDesportos} idModalidade={modalidadeEscolhida} modalidadeNome={nomeModalidade} setModalRemover={setModalRemover} />}

    </div>
  );
};

export default Modalidades;
