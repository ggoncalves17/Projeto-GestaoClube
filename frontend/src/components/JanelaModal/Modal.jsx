import React from "react";
import styles from "./Modal.module.css";
import { IoMdClose } from "react-icons/io";

const Modal = ({ setModal, titulo, children, botao="Adicionar", onSubmit }) => {
  return (
    <div onClick={() => setModal(false)} className={styles.janelaModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div className={styles.painelSuperior}>
          <h3>{titulo}</h3>
          <div onClick={() => setModal(false)} className={styles.botaoFechar}>
            <IoMdClose className={styles.icon} />
          </div>
        </div>
        <hr />

        <form onSubmit={onSubmit} className={styles.form}>
          {children}

          <div className={styles.botoes}>
            <button type="button" onClick={() => setModal(false)} className={`${styles.botao} ${styles.btnCancelar}`}>Cancelar</button>
            <button type="submit" className={`${styles.botao} ${styles.btnSubmeter}`}>{botao}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
