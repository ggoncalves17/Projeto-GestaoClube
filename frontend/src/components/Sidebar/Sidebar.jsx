import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { FaBars } from "react-icons/fa";
import Opcao from "./Opcao";
import OpcaoLogout from "./OpcaoLogout";

const Sidebar = () => {
  const [isExpandido, setIsExpandido] = useState(false);

  return (
    <div className={`${styles.menu} ${isExpandido ? styles.expandido : styles.contraido}`}    >
      <button className={styles.botaoAbreFecha} onClick={() => setIsExpandido(!isExpandido)}>
        <FaBars className={styles.iconBotao} />
      </button>

      <div className={styles.divTeste}>
        <ul className={styles.menuLista}>
          <Opcao isExpandido={isExpandido} conteudo="Dashboard"/>
          <Opcao isExpandido={isExpandido} conteudo="Utilizadores"/>
          <Opcao isExpandido={isExpandido} conteudo="Clube"/>
          <Opcao isExpandido={isExpandido} conteudo="Finanças"/>
          <Opcao isExpandido={isExpandido} conteudo="Evento"/>
          <hr />
          <Opcao isExpandido={isExpandido} conteudo="Calendário"/>
        </ul>

        <ul>
          <Opcao isExpandido={isExpandido} conteudo="Perfil"/>
          <OpcaoLogout isExpandido={isExpandido} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
