import React from "react";
import { FaSort } from "react-icons/fa";
import { FaSortUp, FaSortDown } from "react-icons/fa6";
import styles from "../css/LinhaOrdenacao.module.css";

const OpcaoOrdenacao = ({ nome, ordenacao, onClick }) => {
  let nomeCampo;

  // Para verificar qual o Icon vai ser colocado na parte do ASC ou DESC, visto que se passou logo o nome real do campo a ordenar
  const campos = {
    nome: "Nome",
    email: "Email",
    funcao: "Função",
    sexo: "Género",
    modalidade: "Modalidade",
    tipo: "Função",
  };

  return (
    <span onClick={onClick}>
      {nome}

      {campos[ordenacao?.campo] == nome ? (
        ordenacao.ordem == "ASC" ? (
          <FaSortUp className={styles.iconOrdenacao} />
        ) : (
          <FaSortDown className={styles.iconOrdenacao} />
        )
      ) : (
        <FaSort className={styles.iconSemOrdenacao} />
      )}
    </span>
  );
};

export default OpcaoOrdenacao;
