import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import Calendario from "../../assets/Icons-Sidebar/calendario.png";
import Dashboard from "../../assets/Icons-Sidebar/dashboard.png";
import Utilizadores from "../../assets/Icons-Sidebar/utilizadores.png";
import Financas from "../../assets/Icons-Sidebar/finanças.png";
import Evento from "../../assets/Icons-Sidebar/evento.png";
import Clube from "../../assets/Icons-Sidebar/clube.png";
import Logout from "../../assets/Icons-Sidebar/logout.png";
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isExpandido, setIsExpandido] = useState(false);

  return (
    <div
      className={`${styles.menu} ${
        isExpandido ? styles.expandido : styles.contraido
      }`}
    >
      <button
        className={styles.botaoAbreFecha}
        onClick={() => setIsExpandido(!isExpandido)}
      >
        <FaBars className={styles.iconBotao} />
      </button>

      <div className={styles.divTeste}>
        <ul className={styles.menuLista}>
          <li>
            <img className={styles.icon} src={Dashboard} alt="IconDashboard" />
            {isExpandido && "Dashboard"}
          </li>
          <li>
            <img
              className={styles.icon}
              src={Utilizadores}
              alt="IconUtilizadores"
            />
            {isExpandido && "Utilizadores"}
          </li>
          <li>
            <img className={styles.icon} src={Clube} alt="IconClube" />
            {isExpandido && "Clube"}
          </li>
          <li>
            <img className={styles.icon} src={Financas} alt="IconFinancas" />
            {isExpandido && "Finanças"}
          </li>
          <li>
            <img className={styles.icon} src={Evento} alt="IconEvento" />
            {isExpandido && "Evento"}
          </li>
          <hr />
          <li>
            <img
              className={styles.icon}
              src={Calendario}
              alt="IconCalendario"
            />
            {isExpandido && "Calendário"}
          </li>
        </ul>

        <ul>
          <li className={styles.sair}>
            <img className={styles.icon} src={Logout} alt="IconLogout" />
            {isExpandido && "Sair"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
