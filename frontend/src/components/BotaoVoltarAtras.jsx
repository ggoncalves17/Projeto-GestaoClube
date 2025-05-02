import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import styles from "../css/BotaoVoltarAtras.module.css";
import { useNavigate } from "react-router-dom";

const BotaoVoltarAtras = ({ caminho }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.voltarAtras} onClick={() => navigate(caminho)}>
      <MdOutlineArrowBackIosNew />
      <p>Voltar Atrás</p>
    </div>
  );
};

export default BotaoVoltarAtras;
