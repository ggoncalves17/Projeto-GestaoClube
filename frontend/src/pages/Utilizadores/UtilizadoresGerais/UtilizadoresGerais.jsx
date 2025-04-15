import axios from "axios";
import React, { useEffect, useState } from "react";
import GrupoRadioButton from "../../../components/GrupoRadioButton";
import ListaUtilizadores from "../../../components/ListaUtilizadores";
import SearchBar from "../../../components/SearchBar";
import Painel from "../../../components/Utilizadores/Painel";
import styles from "./UtilizadoresGerais.module.css";

const UtilizadoresGerais = () => {
  const [filtroNome, setfiltroNome] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [utilizadoresGerais, setUtilizadoresGerais] = useState([]);
  const [estado, setEstado] = useState();
  const [painel, setPainel] = useState(false)

  useEffect(() => {
    switch(filtroEstado) {
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
  }, [filtroEstado])

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
  }, []);

  const utilizadoresFiltrados = utilizadoresGerais.filter((utilizador) => 
    utilizador.nome.toLowerCase().includes(filtroNome.toLowerCase()) && (estado === -1 ? true : utilizador.estado === estado)    
  )

  return (
    <div className={styles.estrutura}>
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
            <button onClick={() => setPainel(true)} className={styles.botaoAdicionar}>
              + Adicionar Utilizador
            </button>
          </div>
        </div>
        <div className={styles.painelInferior}>
          <ListaUtilizadores utilizadoresFiltrados={utilizadoresFiltrados}/>
        </div>
      </div>

      {painel && (<Painel titulo="Adicionar Utilizador" setPainel={setPainel}/>)}

    </div>
  );
};

export default UtilizadoresGerais;
