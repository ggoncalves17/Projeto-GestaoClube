import React, { useState } from "react";
import styles from "../css/LinhaJogo.module.css";
import { GoTrophy } from "react-icons/go";
import BotaoRemover from "./BotaoRemover";
import BotaoInfoEditar from "./BotaoInfoEditar";

const LinhaJogo = ({ setModo, jogo, setModalRemover, setJogoEscolhido }) => {
  const handleRemove = () => {
    setModalRemover(true);
    setJogoEscolhido({
      id: jogo.id,
      nome: "vs " + jogo.adversario,
    });
  };

  const handleEdita = () => {
    let estado;
    if (jogo.estado == 1) {
      estado = "Por Acontecer";
    } else {
      estado = "Finalizado";
    }

    setModo("Editar");
    setJogoEscolhido({
      id: jogo.id,
      competicao: jogo.competicao,
      adversario: jogo.adversario,
      local: jogo.localizacao,
      data: jogo.data,
      hora: jogo.hora,
      estado: estado,
      resultado: jogo.resultado,
      resultadoFinal: jogo.resultado_final,
    });
  };

  return (
    <div
      className={`${styles.linha} ${
        jogo.resultado == "Vitória"
          ? styles.vitoria
          : jogo.resultado == "Empate"
          ? styles.empate
          : jogo.resultado == "Derrota" && styles.derrota
      }`}
    >
      <div className={styles.painelInfo}>
        <div className={styles.infoGeral}>
          <div className={styles.competicao}>
            <p>{jogo.competicao}</p>
          </div>

          <div className={styles.infoResultado}>
            {jogo.estado == 2 ? (
              <p className={styles.resultado}>
                <b>{jogo.resultado_final}</b>
              </p>
            ) : (
              <p className={styles.resultado}>
                {new Date(jogo.data)
                  .toLocaleDateString("pt-PT", {
                    month: "short",
                    day: "numeric",
                  })
                  .toUpperCase()}
              </p>
            )}

            <div className={styles.barraVertical}></div>
          </div>
        </div>

        <div
          className={`${styles.localizacao} ${
            jogo.localizacao == "Casa" ? styles.localCasa : styles.localFora
          }`}
        >
          <p>{jogo.localizacao}</p>
        </div>

        <p>
          vs <b>{jogo.adversario}</b>
        </p>

        <p>{new Date(jogo.data).toLocaleDateString()}</p>
        <p>{jogo.hora.split(":").slice(0, 2).join(":")}</p>
      </div>
      <div className={styles.painelBotoes}>
        <BotaoInfoEditar onClick={handleEdita} />
        <BotaoRemover onClick={handleRemove} />
      </div>
    </div>
  );
};

export default LinhaJogo;
