import React from "react";
import styles from "./UtilizadoresGerais.module.css";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";
// import GrupoRadioButton from "../../components/GrupoRadioButton";

const UtilizadoresGerais = () => {

  const [filtroNome, setfiltroNome] = useState("");

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <p className={styles.titulo}>Utilizadores Gerais</p>
        <div className={styles.painelSuperior}>
          <SearchBar filtroNome={filtroNome} setfiltroNome={setfiltroNome} />
          {/* <GrupoRadioButton /> */}
        </div>
      </div>
    </div>
  );
};

export default UtilizadoresGerais;
