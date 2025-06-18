import React from "react";
import styles from "../css/CardElemento.module.css";
import { useNavigate } from "react-router-dom";

const CardElemento = ({ id, foto, nome, posicao, inscricao }) => {

  const navigate = useNavigate()  

  return (
    <div className={styles.card} onClick={() => navigate(`/utilizadores/jogadores/${id}`)}>
      <div>
        <img
          src={`/Fotos-Jogadores/${foto}`}
          alt="FotoPerfil"
          className={styles.fotoPerfil}
        />
      </div>
      <div className={styles.infoJogador}>
        <div className={styles.nomeJogador}>
          <h4>{nome}</h4>
        </div>
        <div className={styles.infoAdicional}>
          <div className={styles.modalidade}>
            {posicao == null ? <p>Não Definida</p> : <p>{posicao}</p>}
          </div >
          <div className={`${styles.inscricao} ${inscricao?.estado == 2 ? styles.inscrito : styles.naoInscrito}`}>
            <p>{inscricao?.estado == 2 ? "Inscrito" : "Não Inscrito"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardElemento;
