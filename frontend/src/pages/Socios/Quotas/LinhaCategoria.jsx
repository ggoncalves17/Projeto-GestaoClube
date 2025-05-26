import styles from "../../../components/LinhaUtilizador.module.css";
import BotaoInfoEditar from '../../../components/BotaoInfoEditar'

const LinhaCategoria = ({ categoria, setModo, setNovaCategoria, historico }) => {

  const estado = categoria.estado == 1 ? "Ativo" : "Inativo";

  const handleEditaCategoria = () => {
    setModo("Editar");
    setNovaCategoria(categoria)
  }

  return (
    <div className={styles.contentor}>
      <div className={styles.informacoesUtilizador}>
        <span className={styles.nome}>
          {categoria.nome ?? categoria.categoria.nome}
        </span>
        <span className={styles.nome}>
          {categoria.quota_mensal ?? categoria.h_quota_mensal}€
        </span>
        <span className={styles.nome}>
          {categoria.quota_anual ?? categoria.h_quota_anual}€
        </span>
        <span className={styles.nome}>
          {categoria.inscricao ?? categoria.h_inscricao}€
        </span>

        {historico ? (
          <>
            <span className={styles.nome}>{new Date(categoria.data_inicial).toLocaleDateString()}</span>
            <span className={styles.nome}>
              {categoria.data_final ? new Date(categoria.data_final).toLocaleDateString(): "Atual"}
            </span>
          </>
        ) : (
          <span className={`${styles.nome} ${styles[estado]}`}>{estado}</span>
        )}
      </div>

      {!historico &&
        <BotaoInfoEditar onClick={handleEditaCategoria}/>
      }
    </div>
  );
};

export default LinhaCategoria;
