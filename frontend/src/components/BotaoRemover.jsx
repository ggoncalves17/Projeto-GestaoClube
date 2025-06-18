import React from "react";
import styles from '../css/BotaoRemover.module.css'
import { FaTrash } from "react-icons/fa";

const BotaoRemover = ({ onClick, disabled=false }) => {
  return (
    <button
      type="button"
      className={styles.btnRemover}
      disabled={disabled}
      onClick={onClick}
    >
      <FaTrash title="Remover" className={styles.iconRemover} />
    </button>
  );
};

export default BotaoRemover;
