import React, { useState } from "react";
import styles from './GrupoRadioButton.module.css'

const GrupoRadioButton = ({ filtro, setFiltro }) => {

  return (
    <div className={styles.contentor}>
      <label className={styles.label}>
        <input
          type="radio"
          value="todos"
          checked={filtro === "todos"}
          onChange={() => setFiltro("todos")}
          className={styles.radio}
        />
        Todos
      </label>
      <label className={styles.label}>
        <input
          type="radio"
          value="ativos"
          checked={filtro === "ativos"}
          onChange={() => setFiltro("ativos")}
          className={styles.radio}
        />
        Ativos
      </label>
      <label className={styles.label}>
        <input
          type="radio"
          value="inativos"
          checked={filtro === "inativos"}
          onChange={() => setFiltro("inativos")}
          className={styles.radio}
        />
        Inativos
      </label>
    </div>
  );
};

export default GrupoRadioButton;
