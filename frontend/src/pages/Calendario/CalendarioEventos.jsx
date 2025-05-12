import React, { useEffect, useState } from "react";
import styles from "./Calendario.module.css";
import Calendario from "../../components/Calendario";
import { listaTodosJogos } from "../../api/Gerais/api";

const PaginaCalendario = () => {

  const [jogos, setJogos] = useState(null)

  useEffect(()=>{
    listaTodosJogos(setJogos)
  }, [])

  useEffect(() => {
    console.log("TODOS OS JOGOS EXISTENTES: ", jogos);
  }, [jogos])

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <p className={styles.titulo}>Calendário</p>
        <div className={styles.calendario}>
          <Calendario eventos={jogos} />
        </div>
      </div>
    </div>
  );
};

export default PaginaCalendario;
