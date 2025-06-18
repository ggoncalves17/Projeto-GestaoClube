import styles from "./PopUpRemover.module.css";

const PopUpEstadoGeral = ({
  objeto,
  titulo,
  setModalEstadoAberta,
  onClick,
}) => {
  return (
    <div
      onClick={() => setModalEstadoAberta(false)}
      className={styles.janelaModal}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <h3>
          Deseja mesmo inativar {titulo} "<b>{objeto.nome}</b>" ?
        </h3>
        <p>Poderá posteriormente voltar a ativar o mesmo.</p>
        <div className={styles.botoes}>
          <button
            onClick={() => setModalEstadoAberta(false)}
            className={`${styles.botao} ${styles.btnCancelar}`}
          >
            Não
          </button>
          <button
            onClick={onClick}
            className={`${styles.botao} ${styles.btnRemover}`}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpEstadoGeral;
