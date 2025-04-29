import React, { useState } from "react";
import styles from "./CardsDashboard/CardDashboard.module.css";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const CardModalidade = ({ modalidade, setModo, setModalidade, setNomeModalidade, modalRemover, setModalRemover }) => {

  const estado = modalidade.estado == true ? "Ativo" : "Inativo"

  const handleEditaModalidade = () => {
    setModo("Editar")
    setNomeModalidade(modalidade.nome)
    setModalidade(modalidade.id)
  }

  // Não é possível remover a modalidade no caso de já existirem dados nesta. 
  // A única possibilidade de remover é caso tenha sido criada e não exista mesmo nada (Jogadores, Equipas, Épocas)
  const btnDesativado = (modalidade.equipa_set.length > 0 || modalidade.epoca_set.length > 0 || modalidade.existemJogadores);

  const handleRemoveModalidade = () => {
    setModalRemover(true)
    setModalidade(modalidade.id)
    setNomeModalidade(modalidade.nome)
  }

  return (
    <div className={`${styles.card} ${styles.cardModalidade}`}>
      <div className={styles.info}>
        <button className={styles.btnEditar} onClick={handleEditaModalidade}>
          <CiEdit className={styles.iconEditar}/>
        </button>
        <div className={`${styles.estado} ${estado == "Ativo" ? styles.estadoAtivo : styles.estadoInativo}`}>
          <p>{estado}</p>
        </div>
        <div className={styles.nomeModalidade}>
          <h2>{modalidade.nome}</h2>
        </div>
        <p>Equipas: {modalidade.equipa_set.length}</p>
        <p>Épocas: {modalidade.epoca_set.length}</p>
      </div>
      <div className={styles.botoes}>
        <button type="button" className={styles.btnDetalhes}>Ver Detalhes</button>
        <button type="button" className={styles.btnRemover} disabled={btnDesativado} onClick={handleRemoveModalidade}>
          <FaTrash title="Remover" className={styles.iconRemover} />
        </button>
      </div>

    </div>
  );
};

export default CardModalidade;
