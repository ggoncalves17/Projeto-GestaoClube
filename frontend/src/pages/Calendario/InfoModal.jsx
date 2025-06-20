import React from "react";
import styles from "../../components/JanelaModal/Modal.module.css"
import { IoMdClose } from "react-icons/io";

const InfoModal = ({ evento, setJogoSelecionado }) => {
    
  return (
    <div onClick={() => setJogoSelecionado(false)} className={styles.janelaModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div className={styles.painelSuperior}>
          <h3>Informação Geral Evento / Jogo</h3>
          <div onClick={() => setJogoSelecionado(false)} className={styles.botaoFechar}>
            <IoMdClose className={styles.icon} />
          </div>
        </div>
        <hr />
        <div className={styles.conteudo}>
            <p><b>Equipa:</b> {evento.equipa}</p>
            <p><b>Adversário:</b> {evento.titulo}</p>
            <p><b>Época:</b> {evento.epoca}</p>
            <p><b>Data:</b> {evento.data}</p>
            <p><b>Hora:</b> {evento.hora}</p>
            <p><b>Competição:</b> {evento.competicao}</p>
        </div>
        <div className={styles.botoes}>
          <button
            type="button"
            onClick={() => setJogoSelecionado(false)}
            className={`${styles.botao} ${styles.btnCancelar}`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
