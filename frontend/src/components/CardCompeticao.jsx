  import React, { useState } from "react";
  import styles from "../css/LinhaCompeticao.module.css";
  import { GoTrophy } from "react-icons/go";
  import BotaoRemover from "./BotaoRemover";
  import BotaoEditar from "./BotaoEditar";

  const CardCompeticao = ({
    setModo,
    competicao,
    setModalRemover,
    setCompeticaoEscolhida,
  }) => {

    const handleRemove = () => {
      setModalRemover(true)
      setCompeticaoEscolhida({
        id:competicao.id,
        nome:competicao.nome,
      })
    }

    const handleEdita = () => {
      setModo("Editar")
      setCompeticaoEscolhida({
        id:competicao.id,
        nome:competicao.nome,
      })
    }

    return (
      <div className={styles.linha}>
        <div className={styles.painelInfo}>
          <GoTrophy className={styles.icon} />
          <p className={styles.titulo}>{competicao.nome}</p>
          <p className={styles.jogos}>{competicao.nJogos} jogo(s)</p>
        </div>
        <div className={styles.painelBotoes}>
          <BotaoEditar onClick={handleEdita} />
          <BotaoRemover onClick={handleRemove} disabled={competicao.nJogos > 0}/>
        </div>
      </div>
    );
  };

  export default CardCompeticao;
