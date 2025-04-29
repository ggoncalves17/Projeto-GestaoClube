import React from "react";
import styles from "./PopUpRemover.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const PopUpRemoverModalidade = ({ idModalidade, modalidadeNome, setModalRemover, setDesportos }) => {

  const confirmaRemocao = () => {
    axios
      .post(`http://localhost:8000/api/remove-modalidade/${idModalidade}/`, null,
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        
        setDesportos((prev) => prev.filter((modalidade) => modalidade.id != idModalidade))

        setModalRemover(false)
        toast.success(`Modalidade Removida com Sucesso!`);

      })
      .catch((err) => {
        console.log("Código do erro:", err.response.status);
        console.log("Mensagem do erro:", err.response.data.mensagem);
      });
  };

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
            onClick={confirmaRemocao}
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
