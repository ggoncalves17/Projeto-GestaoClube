import React, { useEffect } from "react";
import styles from "./UtilizadoresGerais.module.css";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";
import GrupoRadioButton from "../../components/GrupoRadioButton";
import ListaUtilizadores from "../../components/ListaUtilizadores";
import axios from "axios";

const UtilizadoresGerais = () => {
  const [filtroNome, setfiltroNome] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [utilizadoresGerais, setUtilizadoresGerais] = useState([]);
  const [estado, setEstado] = useState();

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

  // TODO: Fazer verificações ao existirem alterações para não se ter de recarregar a página, podia-se colocar sem [] mas isso iria estar sempre a ir buscar.
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
            <button className={styles.botaoAdicionar}>
              + Adicionar Utilizador
            </button>
          </div>
        </div>
        <div className={styles.painelInferior}>
          <ListaUtilizadores utilizadoresFiltrados={utilizadoresFiltrados}/>
        </div>
      </div>
    </div>
  );
};

export default UtilizadoresGerais;
