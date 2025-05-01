import React from "react";
import styles from "./PopUpRemover.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { removeModalidade } from "../api/Modalidades/api";

const PopUpRemoverModalidade = ({ idModalidade, modalidadeNome, setModalRemover, setDesportos }) => {

  return (
    <div onClick={() => setModalRemover(false)} className={styles.janelaModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <h3>
          Deseja mesmo remover a modalidade "<b>{modalidadeNome}</b>" ?
        </h3>
        <p>Ao confirmar não vai poder recuperar a mesma.</p>
        <div className={styles.botoes}>
          <button
            onClick={() => setModalRemover(false)}
            className={`${styles.botao} ${styles.btnCancelar}`}
          >
            Não
          </button>
          <button
            onClick={() => removeModalidade(idModalidade, setDesportos, setModalRemover)}
            className={`${styles.botao} ${styles.btnRemover}`}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpRemoverModalidade;
