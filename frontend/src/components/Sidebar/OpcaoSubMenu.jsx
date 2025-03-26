import React from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom"; 
import { RiArrowDropDownLine } from "react-icons/ri";

const OpcaoSubMenu = ({ isExpandido, conteudo, ativo=false, caminho }) => {

  const navigate = useNavigate()

  const handleMudaPagina = () => {
      navigate(caminho)
  }

  return (
    <li onClick={handleMudaPagina} className={ativo ? styles.opcaoAtiva : ""}>
      {conteudo}
    </li>
  );
};

export default OpcaoSubMenu;
