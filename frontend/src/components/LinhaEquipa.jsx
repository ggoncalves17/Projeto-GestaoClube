import React from "react";
import styles from "../css/LinhaEquipa.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

const LinhaEquipa = ({ equipa }) => {
  return (
    <Link to={`/modalidades/${equipa.modalidade}/equipas/${equipa.id}`} className={styles.link}>
      <div className={styles.linha}>
        <div className={styles.painelInfo}>
          <p className={styles.nome}>{equipa.nome}</p>
          <p className={styles.epoca}>{equipa.epoca.nome}</p>
        </div>
        <div className={styles.painelIcon}>
          <MdArrowForwardIos className={styles.icon}/>
        </div>
      </div>
    </Link>
  );
};

export default LinhaEquipa;
