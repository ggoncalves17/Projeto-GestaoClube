import React from 'react'
import styles from "./PopUpRemover.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const PopUpEstado = ({ utilizador, setEstadoUtilizador, setModo, setModalEstadoAberta }) => {

  const handleInativaUtilizador = () => {

    const tipo = utilizador.tipo

    axios
    .post(
      `http://localhost:8000/api/altera-estado-utilizador/${utilizador.id}/`,
      {
        tipo: tipo,
      },
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      console.log("Resposta do Backend: ", res.data);
      setEstadoUtilizador((prev) => prev === 1 ? 0 : 1)
      setModalEstadoAberta(false)
      setModo(null)
    })
    .catch((err) => {
      console.log("Mensagem do erro:", err.response.data.mensagem);
      setModo(null)
    });
  }

  return (
    <div onClick={() => setModalEstadoAberta(false)} className={styles.janelaModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <h3>Deseja mesmo inativar o utilizador "<b>{utilizador.nome}</b>" ?</h3>
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