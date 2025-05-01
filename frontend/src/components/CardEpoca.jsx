import React, { useState } from "react";
import styles from "../css/CardEpoca.module.css";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const CardEpoca = ({ epoca, setModalRemover, setEpocaEscolhida }) => {
  const data_inicio = new Date(epoca.inicio_epoca);
  const data_fim = new Date(epoca.fim_epoca);
  const data_atual = new Date();
  
  let estado;

  if(data_atual > data_inicio && data_atual < data_fim) {
    estado = "Em Curso"
  }
  else if (data_atual < data_inicio) {
    estado = "Futura"
  }
  else {
    estado = "Terminou"
  }

  const handleRemoveEpoca = () => {
    setModalRemover(true)
    setEpocaEscolhida({
      id:epoca.id,
      nome:epoca.nome,
    })
  }

  return (
    <div className={`${styles.card} ${styles.cardModalidade}`}>
      <div className={styles.infoEquipa}>
        {/* <button className={styles.btnEditar}>
          <CiEdit className={styles.iconEditar}/>
        </button> */}
        <div className={styles.painelSuperior}>
          <div className={styles.nome}>
            <h3><u>{epoca.nome}</u></h3>
          </div>
          <div className={`${styles.estado} ${estado == "Em Curso" ? styles.emCurso : estado == "Futura" ? styles.futura : styles.terminou}`}>
            <p>{estado}</p>
          </div>
        </div>

        <div className={styles.painelInferior}>
          <p>Início: {data_inicio.toLocaleDateString()}</p>
          <p>Fim: {data_fim.toLocaleDateString()}</p>
          <p>Equipas: {epoca.nEquipas}</p>
        </div>
      </div>
      <button type="button" className={styles.btnRemover} disabled={epoca.nEquipas > 0} onClick={handleRemoveEpoca}>
        <FaTrash title="Remover" className={styles.iconRemover} />
      </button>
    </div>
  );
};

export default CardEpoca;
