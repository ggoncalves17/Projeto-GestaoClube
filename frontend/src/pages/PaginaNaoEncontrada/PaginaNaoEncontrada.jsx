import React from "react";
import styles from "./PaginaNaoEncontrada.module.css";
import LogoCoja from "../../assets/LogoCoja.png";
import { RiEmotionUnhappyLine } from "react-icons/ri";

const PaginaNaoEncontrada = () => {
  return (
    <div id={styles.estrutura}>
      <div id={styles.imagem}>
        <img id={styles.logo} src={LogoCoja} alt="LogoClube" />
      </div>
      <div id={styles.texto}>
        <RiEmotionUnhappyLine className={styles.icon} />
        <h2>Nada Aqui!</h2>
        <p id={styles.corVermelho}>Esta página não existe.</p>
        <a id={styles.corAzul} href="#">Ir para a página inicial</a>
      </div>
    </div>
  );
};

export default PaginaNaoEncontrada;
