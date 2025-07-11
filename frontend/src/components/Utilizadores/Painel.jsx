import React, { Children } from "react";
import styles from "./Painel.module.css";
import { IoMdClose } from "react-icons/io";
import FormularioStaff from "./FormularioStaff";

const OverlayUtilizadores = ({ modo, tipo, setModo, children }) => {

  return (
    <div className={styles.tela}>
      <div className={styles.estrutura}>
        <div className={styles.painel}>
          <div className={styles.header}>
            {`${modo} ${tipo}`}
            <div onClick={() => setModo(null)} className={styles.botaoFechar}>
              <IoMdClose className={styles.icon} />
            </div>
          </div>
          <hr />
          
          { children }

        </div>
      </div>
    </div>
  );
};

export default OverlayUtilizadores;
