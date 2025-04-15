import React from "react";
import styles from "./PaginaNaoEncontrada.module.css";
import LogoCoja from "/Fotos-Clube/LogoCoja.png";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import {Link} from 'react-router-dom';

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
        <Link to="/" id={styles.corAzul} >Ir para a página inicial</Link>
      </div>
    </div>
  );
};

export default PaginaNaoEncontrada;
