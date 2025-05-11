import React from "react";
import styles from "./PopUpRemover.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { removeModalidade } from "../api/Modalidades/api";
import { removeEpoca } from "../api/Epocas/api";
import { removeEquipa, removeCompeticao, removeJogo } from "../api/Equipas/api";

const PopUpRemoverModalidade = ({ titulo="modalidade", idModalidade, modalidadeNome, setModalRemover, setDesportos }) => {

  const opcoesRemocao = () => {
    switch(titulo){
      case "modalidade":
        removeModalidade(idModalidade, setDesportos, setModalRemover)
      case "época":
        removeEpoca(idModalidade, setDesportos, setModalRemover)
      case "equipa":
        removeEquipa(idModalidade, setDesportos, setModalRemover)
      case "competição":
        removeCompeticao(idModalidade, setDesportos, setModalRemover)
      case "jogo":
        removeJogo(idModalidade, setDesportos, setModalRemover)
    }
  }

  return (
    <div onClick={() => setModalRemover(false)} className={styles.janelaModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <h3>
          Deseja mesmo remover a {titulo} "<b>{modalidadeNome}</b>" ?
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
            onClick={opcoesRemocao}
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
