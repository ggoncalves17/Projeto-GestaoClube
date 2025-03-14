import React from "react";
import "./PaginaNaoEncontrada.css";
import LogoCoja from "../assets/LogoCoja.png";
import { RiEmotionUnhappyLine } from "react-icons/ri";

const PaginaNaoEncontrada = () => {
  return (
    <div id="box">
      <div id="imagem">
        <img id="logo" src={LogoCoja} alt="LogoClube" />
      </div>
      <div id="texto">
        <RiEmotionUnhappyLine className="icon" />
        <h2>Nada Aqui!</h2>
        <p id="corVermelho">Esta página não existe.</p>
        <a id="corAzul" href="#">Ir para a página inicial</a>
      </div>
    </div>
  );
};

export default PaginaNaoEncontrada;
