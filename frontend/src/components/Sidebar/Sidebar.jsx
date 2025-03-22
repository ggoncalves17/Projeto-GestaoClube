import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { FaBars } from "react-icons/fa";
import Opcao from "./Opcao";
import OpcaoLogout from "./OpcaoLogout";

const Sidebar = () => {
  const [isExpandido, setIsExpandido] = useState(false);

  const caminho = window.location.href.split("/")[3]; 
  console.log(caminho);
  

  return (
    <div className={`${styles.menu} ${isExpandido ? styles.expandido : styles.contraido}`}    >
      <button className={styles.botaoAbreFecha} onClick={() => setIsExpandido(!isExpandido)}>
        <FaBars className={styles.iconBotao} />
      </button>

      <div className={styles.divTeste}>
        <ul className={styles.menuLista}>
          <Opcao isExpandido={isExpandido} conteudo="Dashboard" ativo={caminho === "dashboard" || caminho === ""}/>
          <Opcao isExpandido={isExpandido} conteudo="Utilizadores" ativo={caminho === "utilizadores"}/>
          <Opcao isExpandido={isExpandido} conteudo="Clube" ativo={caminho === "clube"}/>
          <Opcao isExpandido={isExpandido} conteudo="Finanças" ativo={caminho === "financas"}/>
          <Opcao isExpandido={isExpandido} conteudo="Evento" ativo={caminho === "eventos"}/>
          <hr />
          <Opcao isExpandido={isExpandido} conteudo="Calendário" ativo={caminho === "calendario"}/>
        </ul>

        <ul>
          <Opcao isExpandido={isExpandido} conteudo="Perfil" ativo={caminho === "perfil"}/>
          <OpcaoLogout isExpandido={isExpandido} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
