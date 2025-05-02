import React from "react";
import styles from "../css/OpcoesLink.module.css";
import { NavLink } from "react-router-dom";

const OpcoesLink = ({ opcoes }) => {
  return (
    <div className={styles.opcoes}>
      {opcoes.map((opcao, index) => (
        <NavLink
          key={index}
          to={opcao.caminho}
          className={({ isActive }) =>
            `${styles.opcao} ${
              isActive ? styles.opcaoAtiva : styles.opcaoInativa
            }`
          }
        >
          {opcao.conteudo}
        </NavLink>
      ))}
    </div>
  );
};

export default OpcoesLink;
