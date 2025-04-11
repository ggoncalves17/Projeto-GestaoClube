import React, { Children } from "react";
import styles from "./Painel.module.css";
import { IoMdClose } from "react-icons/io";
import FormularioStaff from "./FormularioStaff";

const OverlayUtilizadores = ({ modo, utilizador, setModo, setStaff }) => {

  return (
    <div className={styles.tela}>
      <div className={styles.estrutura}>
        <div className={styles.painel}>
          <div className={styles.header}>
            {`${modo} ${utilizador}`}
            <div onClick={() => setModo(null)} className={styles.botaoFechar}>
              <IoMdClose className={styles.icon} />
            </div>
          </div>
          <hr />
          
          <FormularioStaff setModo={setModo} modo={modo} setStaff={setStaff} />

        </div>
      </div>
    </div>
      
  );
};

export default OverlayUtilizadores;
