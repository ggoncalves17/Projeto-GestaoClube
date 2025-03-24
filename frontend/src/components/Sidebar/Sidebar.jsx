import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { FaBars } from "react-icons/fa";
import Opcao from "./Opcao";
import OpcaoLogout from "./OpcaoLogout";

const Sidebar = () => {
  const [isExpandido, setIsExpandido] = useState(false);

  const caminho = window.location.href.split("/")[3];  

  return (
    <div className={`${styles.menu} ${isExpandido ? styles.expandido : styles.contraido}`}    >
      <button className={styles.botaoAbreFecha} onClick={() => setIsExpandido(!isExpandido)}>
        <FaBars className={styles.iconBotao} />
      </button>

      <div className={styles.divTeste}>
        <ul className={styles.menuLista}>
          <Opcao isExpandido={isExpandido} conteudo="Dashboard" ativo={caminho === "dashboard" || caminho === ""} caminho="/"/>
          <Opcao isExpandido={isExpandido} conteudo="Utilizadores" ativo={caminho === "utilizadores"} caminho="/utilizadores"/>
          <Opcao isExpandido={isExpandido} conteudo="Clube" ativo={caminho === "clube"} caminho="/"/>
          <Opcao isExpandido={isExpandido} conteudo="Finanças" ativo={caminho === "financas"} caminho="/"/>
          <Opcao isExpandido={isExpandido} conteudo="Evento" ativo={caminho === "eventos"} caminho="/"/>
          <hr />
          <Opcao isExpandido={isExpandido} conteudo="Calendário" ativo={caminho === "calendario"} caminho="/"/>
        </ul>

        <ul>
          <Opcao isExpandido={isExpandido} conteudo="Perfil" ativo={caminho === "perfil"} caminho="/"/>
          <OpcaoLogout isExpandido={isExpandido} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
