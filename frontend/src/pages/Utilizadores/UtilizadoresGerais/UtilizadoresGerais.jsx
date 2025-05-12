import axios from "axios";
import React, { useEffect, useState } from "react";
import GrupoRadioButton from "../../../components/GrupoRadioButton";
import ListaUtilizadores from "../../../components/ListaUtilizadores";
import SearchBar from "../../../components/SearchBar";
import Painel from "../../../components/Utilizadores/Painel";
import Paginacao from "../../../components/Paginacao/Paginacao";
import styles from "./UtilizadoresGerais.module.css";
import FormularioStaff from "../../../components/Utilizadores/FormularioStaff";
import BotaoAdicionar from '../../../components/BotaoAdicionar'

const UtilizadoresGerais = () => {
  const [filtroNome, setfiltroNome] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [utilizadoresGerais, setUtilizadoresGerais] = useState([]);
  const [estado, setEstado] = useState();
  const [modoUtilizadores, setModoUtilizadores] = useState(null);
  const [utilizador, setUtilizador] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [utilizadoresPagina, setUtilizadoresPagina] = useState(6);

  useEffect(() => {
    switch (filtroEstado) {
      case "todos":
        setEstado(-1);
        break;
      case "ativos":
        setEstado(1);
        break;
      case "inativos":
        setEstado(0);
        break;
    }
  }, [filtroEstado]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/listaUtilizadores/", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        setUtilizadoresGerais(res.data);
      })
      .catch((err) => {
        console.log("Mensagem do erro:", err.response.data.mensagem);
      });
  }, [modoUtilizadores]);

  const utilizadoresFiltrados = utilizadoresGerais.filter(
    (utilizador) =>
      utilizador.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
      (estado === -1 ? true : utilizador.estado === estado)
  );

  const indiceUltimoUtilizador = paginaAtual * utilizadoresPagina;
  const indicePrimeiroUtilizador = indiceUltimoUtilizador - utilizadoresPagina;
  const utilizadoresAtuais = utilizadoresFiltrados.slice(
    indicePrimeiroUtilizador,
    indiceUltimoUtilizador
  );

  return (
    <div
      className={`${styles.estrutura} ${
        modoUtilizadores == null && styles.estruturaOverflow
      }`}
    >
      <div className={styles.painel}>
        <p className={styles.titulo}>Utilizadores Gerais</p>
        <div className={styles.painelSuperior}>
          <div className={styles.painelSuperiorFiltros}>
            <SearchBar filtro={filtroNome} setFiltro={setfiltroNome} />
            <GrupoRadioButton
              filtro={filtroEstado}
              setFiltro={setFiltroEstado}
            />
          </div>
          <div className={styles.painelSuperiorAdicionar}>
            <BotaoAdicionar
              titulo={"Utilizador"}
              onClick={() => setModoUtilizadores("Adicionar")}
            />
          </div>
        </div>
        <div className={styles.painelInferior}>
          <ListaUtilizadores
            utilizadoresFiltrados={utilizadoresAtuais}
            setModo={setModoUtilizadores}
            setUtilizador={setUtilizador}
          />
        </div>
        <Paginacao
          totalUtilizadores={utilizadoresFiltrados.length}
          utilizadoresPagina={utilizadoresPagina}
          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual}
        />
      </div>

      {(modoUtilizadores === "Adicionar" ||
        modoUtilizadores === "Editar" ||
        modoUtilizadores === "Detalhes") && (
        <Painel
          modo={modoUtilizadores}
          tipo="Utilizador"
          setModo={setModoUtilizadores}
        >
          <FormularioStaff
            setModo={setModoUtilizadores}
            tipo="Utilizador"
            modo={modoUtilizadores}
            setStaff={setUtilizadoresGerais}
            utilizador={utilizador}
          />
        </Painel>
      )}
    </div>
  );
};

export default UtilizadoresGerais;
