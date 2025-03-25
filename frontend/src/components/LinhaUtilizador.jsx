import React from "react";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import styles from "./LinhaUtilizador.module.css";
import FotoDefault from "../assets/foto-default.png";

const UtilizadorLinha = ({ utilizador }) => {
  return (
    <div className={styles.contentor}>
      <div className={styles.informacoesUtilizador}>
        <img src={FotoDefault} alt="FotoPerfil" className={styles.fotoPerfil} />
        <span className={styles.nome}>{utilizador.nome}</span>
        <span className={styles.email}>{utilizador.email}</span>
        <span className={styles.email}>{utilizador.estado}</span>
      </div>

      <div className={styles.acoes}>
        <div className={`${styles.icon} ${styles.iconEditar}`}>
          <FaPen title="Editar" />
        </div>
        <div className={`${styles.icon} ${styles.iconRemover}`}>
          <FaTrash title="Eliminar" />
        </div>
        <div className={`${styles.icon} ${styles.iconInfo}`}>
          <FaInfoCircle title="Detalhes" />
        </div>
      </div>
    </div>
  );
};

export default UtilizadorLinha;
