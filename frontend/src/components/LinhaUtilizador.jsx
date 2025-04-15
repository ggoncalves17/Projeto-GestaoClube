import React, { useState, useContext } from "react";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import styles from "./LinhaUtilizador.module.css";
import PopUpRemover from "./PopUpRemover";
import { UtilizadorContext } from "../context/UtilizadorContext";

const UtilizadorLinha = ({ utilizador, setModo, setUtilizador }) => {

  const [modalAberta, setModalAberta] = useState(false)
  const { utilizador: utilizadorInfo } = useContext(UtilizadorContext)  

  const botaoUtilizador = (modo) => {
    setModo(modo)
    setUtilizador(utilizador.id)
  } 

  const botaoRemover = () => {
    setModo("Remover")
    setModalAberta(true)
  }
  
  return (
    <div className={styles.contentor}>
      <div className={styles.informacoesUtilizador}>
        <img src={`/Fotos-Perfil/${utilizador.foto}`} alt="FotoPerfil" className={styles.fotoPerfil} />
        <span className={styles.nome}>{utilizador.nome}</span>
        <span className={styles.email}>{utilizador.email}</span>
        <span className={styles.email}>{utilizador.estado}</span>
      </div>

      {utilizador.id != utilizadorInfo.id &&
        <div className={styles.acoes}>
          <div onClick={() => botaoUtilizador("Editar")} className={`${styles.icon} ${styles.iconEditar}`}>
            <FaPen title="Editar" />
          </div>
          <div onClick={botaoRemover} className={`${styles.icon} ${styles.iconRemover}`}>
            <FaTrash title="Eliminar" />
          </div>
          <div onClick={() => botaoUtilizador("Detalhes")} className={`${styles.icon} ${styles.iconInfo}`}>
            <FaInfoCircle title="Detalhes" />
          </div>
        </div>
      }

      {modalAberta === true && <PopUpRemover setModo={setModo} idUtilizador={utilizador.id} setModalAberta={setModalAberta} utilizador={utilizador.nome} />}

    </div>
  );
};

export default UtilizadorLinha;
