import React, { useState, useContext, useEffect } from "react";
import styles from "./Modalidades.module.css";
import SearchBar from "../../components/SearchBar";
import GrupoRadioButton from "../../components/GrupoRadioButton";
import ListaModalidades from "../../components/ListaModalidades";
import Paginacao from "../../components/Paginacao/Paginacao";
import { UtilizadorContext } from "../../context/UtilizadorContext";
import Modal from "../../components/JanelaModal/Modal";
import InputForm from "../../components/InputForm";
import PopUpRemoverModalidade from "../../components/PopUpRemoverModalidade";
import {
  listaModalidades,
  adicionaModalidade,
  editaModalidade,
} from "../../api/Modalidades/api";
import Spinner from "../../components/Spinner";

const Modalidades = () => {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [desportos, setDesportos] = useState([]);
  const [estado, setEstado] = useState();
  const [modo, setModo] = useState(null);
  const [nomeModalidade, setNomeModalidade] = useState("");
  const [erro, setErro] = useState(null);
  const [modalidadeEscolhida, setModalidadeEscolhida] = useState(null);
  const [modalRemover, setModalRemover] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Função para ir buscar as modalidades ao carregar o componente
  useEffect(() => {
    listaModalidades(utilizadorInfo.id_clube, setDesportos, setLoading);
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
      // Verifica se já existe alguma modalidade com o mesmo nome (case-insensitive)
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

      // Chamada da Função para Adicionar nova Modalidade
      adicionaModalidade(
        nomeModalidade,
        utilizadorInfo.id_clube,
        setDesportos,
        setModo,
        setErro
      );
    } else if (modo == "Editar") {
      // Verifica se já existe alguma modalidade com o mesmo nome sem ser a que está a ser edita (p.e., editar de futeBOL para Futebol ser possível)
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

      // Chamada da Função para Editar Modalidade
      editaModalidade(
        nomeModalidade,
        modalidadeEscolhida,
        setDesportos,
        setModo,
        setErro
      );
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
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <ListaModalidades
              modalidadesFiltradas={modalidadesFiltradas}
              setModo={setModo}
              setModalidade={setModalidadeEscolhida}
              setNomeModalidade={setNomeModalidade}
              modalRemover={modalRemover}
              setModalRemover={setModalRemover}
            />
          )}
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

      {modalRemover && (
        <PopUpRemoverModalidade
          setDesportos={setDesportos}
          idModalidade={modalidadeEscolhida}
          modalidadeNome={nomeModalidade}
          setModalRemover={setModalRemover}
        />
      )}
    </div>
  );
};

export default Modalidades;
