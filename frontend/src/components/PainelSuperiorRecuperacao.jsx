import React from "react";
import styles from "./PainelSuperiorRecuperacao.module.css";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const PainelSuperiorRecuperacao = ({ caminho, titulo }) => {
  return (
    <div className={styles.painel}>
      <Link to={caminho} className={styles.botao}>
        <IoArrowBack className={styles.icone} />
      </Link>
      <div className={styles.titulo}>{titulo}</div>
    </div>
  );
};

export default PainelSuperiorRecuperacao;
