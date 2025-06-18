import React from "react";
import Calendário from "../../assets/Icons-Sidebar/calendario.png";
import Dashboard from "../../assets/Icons-Sidebar/dashboard.png";
import Utilizadores from "../../assets/Icons-Sidebar/utilizadores.png";
import Finanças from "../../assets/Icons-Sidebar/finanças.png";
import Evento from "../../assets/Icons-Sidebar/evento.png";
import Clube from "../../assets/Icons-Sidebar/clube.png";
import Perfil from "../../assets/Icons-Sidebar/perfil.png";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom"; 
import { RiArrowDropDownLine } from "react-icons/ri";

const icones = {
    "Calendário": Calendário,
    "Dashboard": Dashboard,
    "Utilizadores": Utilizadores,
    "Finanças": Finanças,
    "Evento": Evento,
    "Clube": Clube,
    "Perfil": Perfil,
  };

const Opcao = ({ isExpandido, conteudo, ativo=false, caminho, subOpcao=false, setSubOpcoes, subOpcaoAberto=false }) => {

  const navigate = useNavigate()

  const handleMudaPagina = () => {

    if(subOpcao) {
      setSubOpcoes((prev) => !prev)
    }
    else {
      navigate(caminho)
    }
  }

  return (
    <li onClick={handleMudaPagina} className={((ativo && !subOpcaoAberto && isExpandido) || (ativo && !isExpandido)) ? styles.opcaoAtiva : ""}>
      <img className={styles.icon} src={icones[conteudo]} alt={`Icon${conteudo}`} />
      {isExpandido && conteudo}
      {(subOpcao && isExpandido) && <RiArrowDropDownLine className={`${styles.iconSubOpcoes} ${subOpcaoAberto ? styles.iconSubOpcoesAberto : styles.iconSubOpcoesFechado}`}
      />}
    </li>
  );
};

export default Opcao;
