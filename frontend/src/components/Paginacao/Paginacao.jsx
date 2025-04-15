import React from "react";
import styles from "./Paginacao.module.css";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

// Referência Inicial -> https://www.youtube.com/watch?v=wAGIOCqS8tk
const Paginacao = ({
  totalUtilizadores,
  utilizadoresPagina,
  paginaAtual,
  setPaginaAtual,
}) => {
  const totalPaginas = Math.ceil(totalUtilizadores / utilizadoresPagina);

  const primeiraPagina = () => {
    setPaginaAtual(1);
  };
  const paginaAnterior = () => {
    paginaAtual > 1 && setPaginaAtual(paginaAtual - 1);
  };
  const proximaPagina = () => {
    paginaAtual < totalPaginas && setPaginaAtual(paginaAtual + 1);
  };
  const ultimaPagina = () => {
    setPaginaAtual(totalPaginas);
  };

  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <div className={styles.grupoPaginacao}>
      <button onClick={primeiraPagina} disabled={paginaAtual === 1}>
        <MdOutlineKeyboardDoubleArrowLeft className={styles.iconBotao}/>
      </button>
      <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
        <MdOutlineArrowBackIosNew className={styles.iconBotao}/>
      </button>

      <span className={styles.paginaAtual}>{paginaAtual}</span>
      <span className={styles.totalPaginas}>de {totalPaginas}</span>

      <button onClick={proximaPagina} disabled={paginaAtual === totalPaginas}>
        <MdArrowForwardIos className={styles.iconBotao}/>
      </button>
      <button onClick={ultimaPagina} disabled={paginaAtual === totalPaginas}>
        <MdOutlineKeyboardDoubleArrowRight className={styles.iconBotao}/>
      </button>
    </div>
  );
};

export default Paginacao;
