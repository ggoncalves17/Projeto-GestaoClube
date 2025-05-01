import React, { useState } from "react";
import styles from "./CardsDashboard/CardDashboard.module.css";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

const CardEquipa = ({ equipa, setModalRemover, setEquipaEscolhida }) => {

  const categoria = equipa.categoria

  const handleRemoveEquipa = () => {
    setModalRemover(true)
    setEquipaEscolhida({
      id:equipa.id,
      nome:equipa.nome,
    })
  }

  return (
    <div className={`${styles.card} ${styles.cardModalidade}`}>
      <div className={styles.infoEquipa}>
        <button className={styles.btnEditar}>
          <CiEdit className={styles.iconEditar}/>
        </button>
        <div className={styles.caixaCategoria}>
          <div className={`${styles.categoria} ${categoria == "Masculino" ? styles.masculino : styles.feminino}`}>
            <p>{categoria}</p>
          </div>
        </div>
        <div className={styles.nomeModalidade}>
          <h2>{equipa.nome}</h2>
        </div>
        <p>Elementos: {equipa.nElementos}</p>
      </div>
      <div className={styles.botoes}>
        <Link to={``} className={styles.btnDetalhes}>
        Ver Detalhes
        </Link>
        <button type="button" className={styles.btnRemover} disabled={equipa.nElementos > 0} onClick={handleRemoveEquipa}>
          <FaTrash title="Remover" className={styles.iconRemover} />
        </button>
      </div>

    </div>
  );
};

export default CardEquipa;
