import styles from "../../../components/LinhaUtilizador.module.css";
import BotaoInfoEditar from "../../../components/BotaoInfoEditar";

const LinhaCategoria = ({ categoria }) => {

  const estado = categoria.estado == 1 ? "Ativo" : "Inativo";

  return (
    <div className={styles.contentor}>
      <div className={styles.informacoesUtilizador}>
        <span className={styles.nome}>{categoria.nome}</span>
        <span className={styles.nome}>{categoria.quota_mensal}€</span>
        <span className={styles.nome}>{categoria.quota_anual}€</span>
        <span className={styles.nome}>{categoria.inscricao}€</span>
        <span className={`${styles.nome} ${styles[estado]}`}>{estado}</span>
      </div>
      <div className={styles.acoes}>
        <button className={styles.btnAtualiza}>
            Atualizar Preços
        </button>
      </div>
    </div>
  );
};

export default LinhaCategoria;
