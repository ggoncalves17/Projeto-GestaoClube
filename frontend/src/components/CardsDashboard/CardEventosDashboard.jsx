import React, { useContext } from "react";
import styles from "./CardEventosDashboard.module.css";
import { UtilizadorContext } from "../../context/UtilizadorContext";
import { useNavigate } from "react-router-dom";

const CardEventosDashboard = ({ tituloCard, valor, mes }) => {
  const { utilizador } = useContext(UtilizadorContext);
  const navigate = useNavigate()

  return (
    <div className={styles.card}>
      <p className={styles.titulo}>{tituloCard}</p>
      <p className={styles.mes}>({mes})</p>
      {valor.length == 0 || valor == 0 ? (
        <p className={styles.semValor}>Não existe qualquer agendamento.</p>
      ) : (
        <div className={styles.conteudo}>
          <div className={styles.jogos}>

            <p className={styles.tamanho}>{valor.length}</p>

            {valor.map((jogo, index) => (
                <div className={styles.valor} key={index}>
                  <img
                    src={`/Fotos-Desportos/Default.png`}
                    alt="FotoDesporto"
                    className={styles.icon}
                  />
                  <div>
                    <p className={styles.adversario}>
                      {utilizador.nome_clube} vs {jogo.adversario}
                    </p>
                    <div className={styles.data}>
                      <p>{new Date(jogo.data).toLocaleDateString()}</p>
                      <p>{jogo.hora.slice(0, 5)}</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          <button className={styles.botaoAdicionar} onClick={() => navigate("/calendario")}>
            Ver Todos
          </button>
        </div>
      )}
    </div>
  );
};

export default CardEventosDashboard;
