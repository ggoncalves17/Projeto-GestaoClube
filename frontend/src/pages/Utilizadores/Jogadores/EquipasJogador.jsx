import React, { useEffect, useState, useContext } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import styles from "./DetalhesJogadores.module.css";
import LinhaEquipa from "../../../components/LinhaEquipa";

const EquipasJogador = () => {
  const { infoJogador } = useOutletContext();

  const equipas = infoJogador.equipas;

  return (
    <div className={styles.conteudo}>
      <p className={styles.titulo}>
        Equipas Associadas
      </p>
      <div>
        {equipas.length > 0 ? (
          equipas.map((equipa, index) => (
            <LinhaEquipa key={index} equipa={equipa} />
          ))
        ) : (
          <p>O jogador(a) não está associado(a) a qualquer equipa.</p>
        )}
      </div>
    </div>
  );
};

export default EquipasJogador;
