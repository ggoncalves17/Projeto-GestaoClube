import React, { Children } from "react";
import styles from "./OverlayUtilizadores.module.css";
import { IoMdClose } from "react-icons/io";

const OverlayUtilizadores = ({ titulo, setPainel, children}) => {

  return (
    <div className={styles.tela}>
      <div className={styles.estrutura}>
        <div className={styles.painel}>
          <div className={styles.header}>
            {titulo}
            <div onClick={() => setPainel(false)} className={styles.botaoFechar}>
              <IoMdClose className={styles.icon} />
            </div>
          </div>
          <hr />
          {children}
        </div>
      </div>
    </div>
      
  );
};

export default OverlayUtilizadores;
