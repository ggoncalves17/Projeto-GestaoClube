import React from "react";
import { FaPen } from "react-icons/fa";
import styles from '../css/BotaoEditar.module.css'

const BotaoEditar = ({ onClick }) => {
  return (
    <button className={styles.btnEditar} onClick={onClick}>
      <FaPen className={styles.iconEditar} />
    </button>
  );
};

export default BotaoEditar;
