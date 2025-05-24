import React from "react";
import styles from "../../../css/Categorias.module.css";
import { NavLink } from "react-router-dom";
import BotaoAdicionar from "../../../components/BotaoAdicionar";
import { FaTags } from "react-icons/fa";
import { GoHistory } from "react-icons/go";

export const PainelBotoes = ({ setModo, temBotao = false }) => {
  return (
    <div className={styles.painelBotoes}>
      <div className={styles.links}>
        <NavLink
          to={`/socios/quotas/categorias`}
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.linkAtivo : styles.linkInativo}`
          }
        >
          <FaTags />
          Todas Categorias
        </NavLink>
        <NavLink
          to={`/socios/quotas/categorias/historico`}
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.linkAtivo : styles.linkInativo}`
          }
        >
          <GoHistory />
          Histórico Categorias
        </NavLink>
      </div>

      {temBotao && (
        <BotaoAdicionar
          titulo={"Categoria"}
          onClick={() => setModo("Adicionar")}
        />
      )}
    </div>
  );
};
