import React from "react";
import styles from "./PopUpRemover.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const PopUpRemover = ({ setModo, utilizador, setModalAberta }) => {

    const confirmaRemocao = () => {
        
        const tipo = utilizador.tipo

        axios
        .post(`http://localhost:8000/api/remove-utilizador/${utilizador.id}/`, 
          {
            tipo: tipo
          },
          {
          withCredentials: true,
          headers:{ 
              "X-CSRFToken": Cookies.get("csrftoken"),
              "Content-Type": "multipart/form-data",
            }
          },
        )
        .then((res) => {
          console.log("Resposta do Backend: ", res.data);
          setModalAberta(false);
          setModo(null)
        })
        .catch((err) => {
          console.log("Mensagem do erro:", err.response.data.mensagem);
        });
    } 


  return (
    <div onClick={() => setModalAberta(false)} className={styles.janelaModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <h3>Deseja mesmo remover o nomeUtilizador "<b>{utilizador.nome}</b>" ?</h3>
        <p>Ao confirmar não vai poder recuperar o mesmo.</p>
        <div className={styles.botoes}>
          <button onClick={() => setModalAberta(false)} className={`${styles.botao} ${styles.btnCancelar}`}>Não</button>
          <button onClick={confirmaRemocao} className={`${styles.botao} ${styles.btnRemover}`}>Sim</button>
        </div>
      </div>
    </div>
  );
};

export default PopUpRemover;
