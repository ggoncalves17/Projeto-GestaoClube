import React from "react";
import { FaPen, FaInfoCircle } from "react-icons/fa";
import styles from '../css/BotaoEditar.module.css'

const BotaoInfoEditar = ({ titulo="Editar", onClick }) => {
  return (
    <button className={styles.btnEditar} onClick={onClick}>
      {titulo == "Editar" ? <FaPen className={styles.iconEditar} /> : <FaInfoCircle  className={styles.iconEditar} />}
    </button>
  );
};

export default BotaoInfoEditar;
