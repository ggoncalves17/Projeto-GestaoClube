import React, { useState } from "react";
import styles from "../css/LinhaJogo.module.css";
import { GoTrophy } from "react-icons/go";
import BotaoRemover from "./BotaoRemover";
import BotaoEditar from "./BotaoEditar";

const LinhaJogo = ({ setModo, jogo, setModalRemover, setJogoEscolhido }) => {
  const handleRemove = () => {
    setModalRemover(true)
    setJogoEscolhido({
      id:jogo.id,
      nome: "vs " + jogo.adversario,
    })
  }

  // const handleEdita = () => {
  //   setModo("Editar")
  //   setCompeticaoEscolhida({
  //     id:competicao.id,
  //     nome:competicao.nome,
  //   })
  // }

  return (
    <div className={styles.linha}>
      <div className={styles.painelInfo}>
        <div className={styles.infoGeral}>
          <div className={styles.competicao}>
            <p>{jogo.competicao}</p>
          </div>

          <div className={styles.infoResultado}>
            {jogo.estado == "Finalizado" ? (
              <p className={styles.resultado}>
                <b>{jogo.resultado_final}</b>
              </p>
            ) : (
              <p className={styles.resultado}>
                {jogo.hora.split(":").slice(0, 2).join(":")}
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
        <BotaoEditar onClick={null} />
        <BotaoRemover onClick={handleRemove} />
      </div>
    </div>
  );
};

export default LinhaJogo;
