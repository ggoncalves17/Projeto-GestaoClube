import React, { useState, useContext, useEffect } from "react";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import styles from "./LinhaUtilizador.module.css";
import PopUpRemover from "./PopUpRemover";
import { UtilizadorContext } from "../context/UtilizadorContext";
import axios from "axios";
import Cookies from "js-cookie";
import PopUpEstado from "./PopUpEstado";

const UtilizadorLinha = ({ utilizador, setModo, setUtilizador }) => {
  const [modalAberta, setModalAberta] = useState(false);
  const [modalEstadoAberta, setModalEstadoAberta] = useState(false);
  const { utilizador: utilizadorInfo } = useContext(UtilizadorContext);
  const [estadoUtilizador, setEstadoUtilizador] = useState(utilizador.estado);

  const botaoUtilizador = (modo) => {    
    setModo(modo);
    setUtilizador(utilizador.id);
  };

  const botaoRemover = () => {
    setModo("Remover");
    setModalAberta(true);
  };

  const handleEstado = (id, estado) => {
    if (estado === 1) {
      setModo("AlteraEstado")
      setModalEstadoAberta(true);
    } 
    else {
      setModo("AlteraEstado")
      const tipo = utilizador.tipo

      axios
        .post(
          `http://localhost:8000/api/altera-estado-utilizador/${id}/`,
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
          setEstadoUtilizador((prev) => (prev === 1 ? 0 : 1));
          setModo(null)
        })
        .catch((err) => {
          console.log("Mensagem do erro:", err.response.data.mensagem);
          setModo(null)
        });
    }
  };

  return (
    <div className={styles.contentor}>
      <div className={styles.informacoesUtilizador}>
        {(utilizador.tipo === "Jogador" || utilizador.tipo === "Treinador") ?
          <img
          src={`/Fotos-Jogadores/${utilizador.foto}`}
          alt="FotoPerfil"
          className={styles.fotoPerfil}
        />
        :
        <img
          src={`/Fotos-Perfil/${utilizador.foto}`}
          alt="FotoPerfil"
          className={styles.fotoPerfil}
        />
        }
        
        <span className={styles.nome}>{utilizador.nome}</span>
        {(utilizador.tipo === "Gestor" || utilizador.tipo === "Utilizador") && (
          <span className={styles.email}>{utilizador.email}</span>
        )}
        {utilizador.tipo === "Gestor" && (
          <span className={styles.funcao}>{utilizador.funcao}</span>
        )}

        {utilizador.tipo != "Gestor" &&
          (utilizador.tipo === "Jogador" ||
            utilizador.tipo === "Treinador") && (
            <>
              <span className={styles.sexo}>{utilizador.sexo}</span>
              <span className={styles.modalidade}>{utilizador.modalidade ? utilizador.modalidade.nome : "(Por Associar)"}</span>
              <span className={styles.tipo}>{utilizador.tipo}</span>
            </>
          )}
      </div>

      {utilizador.id != utilizadorInfo.id && (
        <div className={styles.acoes}>
          {utilizador.tipo !== "Gestor" &&
            (estadoUtilizador === 1 ? (
              <span
                onClick={() => handleEstado(utilizador.id, estadoUtilizador)}
                className={`${styles.estado} ${styles.estadoAtivo}`}
              >
                Ativo
              </span>
            ) : (
              <span
                onClick={() => handleEstado(utilizador.id, estadoUtilizador)}
                className={`${styles.estado} ${styles.estadoInativo}`}
              >
                Inativo
              </span>
            ))}
          <div
            onClick={() => botaoUtilizador("Editar")}
            className={`${styles.icon} ${styles.iconEditar}`}
          >
            <FaPen title="Editar" />
          </div>
          <div
            onClick={botaoRemover}
            className={`${styles.icon} ${styles.iconRemover}`}
          >
            <FaTrash title="Eliminar" />
          </div>
          <div
            onClick={() => botaoUtilizador("Detalhes")}
            className={`${styles.icon} ${styles.iconInfo}`}
          >
            <FaInfoCircle title="Detalhes" />
          </div>
        </div>
      )}

      {modalAberta === true && (
        <PopUpRemover
          utilizador={utilizador}
          setModo={setModo}
          setModalAberta={setModalAberta}
        />
      )}
      {modalEstadoAberta === true && (
        <PopUpEstado
          utilizador={utilizador}
          setEstadoUtilizador={setEstadoUtilizador}
          setModo={setModo}
          setModalEstadoAberta={setModalEstadoAberta}
        />
      )}
    </div>
  );
};

export default UtilizadorLinha;
