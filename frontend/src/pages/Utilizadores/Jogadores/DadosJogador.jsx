import React, { useEffect, useState, useContext } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { differenceInYears } from "date-fns";
import styles from "./DetalhesJogadores.module.css";

const DadosJogador = () => {
  const { infoJogador } = useOutletContext();

  const campos = [
    "Tipo",
    "Sexo",
    "Data de Nascimento",
    "Nacionalidade",
    "Cartão de Cidadão",
    "Validade CC",
    "Peso",
    "Altura",
    "Modalidade",
    "Posição",
  ];
  const info = {
    Tipo: infoJogador.tipo,
    Sexo: infoJogador.sexo,
    // Referência -> https://forum.freecodecamp.org/t/how-to-convert-date-to-dd-mm-yyyy-in-react/431093/2 e https://date-fns.org/v4.1.0/docs/differenceInYears
    "Data de Nascimento":
      new Date(infoJogador.data_nascimento).toLocaleDateString() +
      " ( " +
      differenceInYears(new Date(), infoJogador.data_nascimento) +
      " Anos )",
    Nacionalidade: infoJogador.nacionalidade,
    "Cartão de Cidadão": infoJogador.cartao_cidadao
      ? infoJogador.cartao_cidadao
      : "-",
    "Validade CC": infoJogador.data_validade_cc
      ? infoJogador.data_validade_cc
      : "-",
    // Referência -> https://stackoverflow.com/questions/46554765/format-javascript-input-numbers-as-float-with-two-decimal-places-and-enforce-on
    Peso: infoJogador.peso ? infoJogador.peso.toFixed(1) + " Kg" : "-",
    Altura: infoJogador.altura ? infoJogador.altura.toFixed(2) + " m " : "-",
    Modalidade: infoJogador.modalidade ? infoJogador.modalidade.nome : "-",
    Posição: infoJogador.posicao ? infoJogador.posicao : "-",
  };

  return (
    <div className={styles.conteudo}>
      <p className={styles.titulo}>
        Informações Pessoais
      </p>
      <div className={styles.infoJogador}>
        {campos.map((campo, index) => (
          <div key={index}>
            <p>{campo}</p>
            <h4>{info[campo]}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DadosJogador;
