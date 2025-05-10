import React from "react";
import styles from '../css/BotaoAdicionar.module.css'

const BotaoAdicionar = ({ titulo, onClick }) => {
  return (
    <button className={styles.botaoAdicionar} onClick={onClick} >
      + Adicionar {titulo}
    </button>
  );
};

export default BotaoAdicionar;
