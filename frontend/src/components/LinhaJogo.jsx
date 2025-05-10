import React, { useState } from "react";
import styles from "../css/LinhaJogo.module.css";
import { GoTrophy } from "react-icons/go";
import BotaoRemover from "./BotaoRemover";
import BotaoEditar from "./BotaoEditar";

const LinhaJogo = ({ setModo, jogo, setModalRemover, setJogoEscolhido }) => {
  // const handleRemove = () => {
  //   setModalRemover(true)
  //   setCompeticaoEscolhida({
  //     id:competicao.id,
  //     nome:competicao.nome,
  //   })
  // }

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
        <div className={styles.competicao}>
          <p>{jogo.competicao}</p>
        </div>
        {jogo.estado == "Finalizado" ? (
          <p className={styles.resultado}>
            <b>{jogo.resultado_final}</b>
          </p>
        ) : (
          <p className={styles.resultado}>
            {jogo.hora?.split(":").slice(0, 2).join(":")}
          </p>
        )}
        <p>vs <b>{jogo.adversario}</b></p>
      </div>
      <div className={styles.painelBotoes}>
        <BotaoEditar onClick={null} />
        <BotaoRemover onClick={null} />
      </div>
    </div>
  );
};

export default LinhaJogo;
