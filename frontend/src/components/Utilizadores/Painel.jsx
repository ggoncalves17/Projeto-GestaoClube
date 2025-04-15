import React, { Children } from "react";
import styles from "./Painel.module.css";
import { IoMdClose } from "react-icons/io";
import FormularioStaff from "./FormularioStaff";

const OverlayUtilizadores = ({ modo, tipo, setModo, setStaff, utilizador }) => {

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
          
          <FormularioStaff setModo={setModo} tipo={tipo} modo={modo} setStaff={setStaff} utilizador={utilizador} />

        </div>
      </div>
    </div>
  );
};

export default OverlayUtilizadores;
