import React from 'react'
import styles from "./PopUpRemover.module.css";
import axios from "axios";

const PopUpEstado = ({ idUtilizador, setEstadoUtilizador, setModalEstadoAberta, utilizador }) => {

  const handleInativaUtilizador = () => {
    axios
          .get(`http://localhost:8000/api/altera-estado-utilizador/${idUtilizador}/`, 
          {
            withCredentials: true,
          })
          .then((res) => {
            console.log("Resposta do Backend: ", res.data);
            setEstadoUtilizador((prev) => prev === 1 ? 0 : 1)
            setModalEstadoAberta(false)
          })
          .catch((err) => {
            console.log("Mensagem do erro:", err.response.data.mensagem);
          });
  }

  return (
    <div onClick={() => setModalEstadoAberta(false)} className={styles.janelaModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <h3>Deseja mesmo inativar o utilizador "<b>{utilizador}</b>" ?</h3>
        <p>Poderá posteriormente voltar a ativar o mesmo.</p>
        <div className={styles.botoes}>
          <button onClick={() => setModalEstadoAberta(false)} className={`${styles.botao} ${styles.btnCancelar}`}>Não</button>
          <button onClick={handleInativaUtilizador} className={`${styles.botao} ${styles.btnRemover}`}>Sim</button>
        </div>
      </div>
    </div>
  )
}

export default PopUpEstado