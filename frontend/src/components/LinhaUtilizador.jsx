import React, { useState, useContext, useEffect } from "react";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import styles from "./LinhaUtilizador.module.css";
import PopUpRemover from "./PopUpRemover";
import { UtilizadorContext } from "../context/UtilizadorContext";
import axios from "axios";
import Cookies from "js-cookie";
import PopUpEstado from "./PopUpEstado";

const UtilizadorLinha = ({ utilizador, setModo, setUtilizador }) => {

  const [modalAberta, setModalAberta] = useState(false)
  const [modalEstadoAberta, setModalEstadoAberta] = useState(false)
  const { utilizador: utilizadorInfo } = useContext(UtilizadorContext)  
  const [estadoUtilizador, setEstadoUtilizador] = useState(utilizador.estado)

  const botaoUtilizador = (modo) => {
    setModo(modo)
    setUtilizador(utilizador.id)
  } 

  const botaoRemover = () => {
    setModo("Remover")
    setModalAberta(true)
  }

  const handleEstado = (id, estado) => {    
    if(estado === 1) {
      setModalEstadoAberta(true)
    }
    else {
      axios
      .get(`http://localhost:8000/api/altera-estado-utilizador/${id}/`, 
      {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        setEstadoUtilizador((prev) => prev === 1 ? 0 : 1)
      })
      .catch((err) => {
        console.log("Mensagem do erro:", err.response.data.mensagem);
      });
    }
  }
  
  return (
    <div className={styles.contentor}>
      <div className={styles.informacoesUtilizador}>
        <img src={`/Fotos-Perfil/${utilizador.foto}`} alt="FotoPerfil" className={styles.fotoPerfil} />
        <span className={styles.nome}>{utilizador.nome}</span>
        <span className={styles.email}>{utilizador.email}</span>
        {utilizador.tipo === "Gestor" && <span className={styles.funcao}>{utilizador.funcao}</span>}
      </div>

      {utilizador.id != utilizadorInfo.id &&
        <div className={styles.acoes}>
          {utilizador.tipo !== "Gestor" &&
            (estadoUtilizador === 1 ? <span onClick={() => handleEstado(utilizador.id, estadoUtilizador)} className={`${styles.estado} ${styles.estadoAtivo}`}>Ativo</span> : <span onClick={() => handleEstado(utilizador.id, estadoUtilizador)} className={`${styles.estado} ${styles.estadoInativo}`}>Inativo</span>)
          }
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
      {modalEstadoAberta === true && <PopUpEstado idUtilizador={utilizador.id} setEstadoUtilizador={setEstadoUtilizador} setModalEstadoAberta={setModalEstadoAberta} utilizador={utilizador.nome}/>}

    </div>
  );
};

export default UtilizadorLinha;
