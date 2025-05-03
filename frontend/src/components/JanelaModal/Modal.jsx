import React, { Children } from "react";
import styles from "./Modal.module.css";
import { IoMdClose } from "react-icons/io";
import SelectAllTransferList from "../SelectAllTransferList";

const Modal = ({ setModal, titulo, children, botao="Adicionar", onSubmit }) => {

  // Referência -> https://react.dev/reference/react/Children#children-toarray
  const isfilhoTransferList = Children.toArray(children).some((filho) => filho.type == SelectAllTransferList);
    
  return (
    <div onClick={() => setModal(false)} className={styles.janelaModal}>
      <div onClick={(e) => e.stopPropagation()} className={`${styles.modal} ${isfilhoTransferList && styles.modalTransferList}`}>
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
