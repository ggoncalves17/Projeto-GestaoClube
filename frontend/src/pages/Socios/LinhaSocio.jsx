import styles from "../../components/LinhaUtilizador.module.css";
import BotaoRemover from "../../components/BotaoRemover";
import BotaoInfoEditar from "../../components/BotaoInfoEditar";

const LinhaSocio = ({ socio }) => {
  const estadoSocio = socio.estado == 1 ? "Ativo" : "Inativo";
  const estadoQuotas = socio.quotas_atrasadas > 0 ? "Atrasado" : "Em Dia";

  return (
    <div className={styles.contentor}>
      <div className={styles.informacoesUtilizador}>
        <img
          src={`/Fotos-Perfil/${socio.utilizador.foto}`}
          alt="FotoPerfil"
          className={styles.fotoPerfil}
        />

        <span className={styles.nome}>{socio.utilizador.nome}</span>
        <span className={styles.nome}>{socio.categoria}</span>
        <span className={styles.nome}>{new Date(socio.data_adesao).toLocaleDateString()}</span>
        <span className={`${styles.nome} ${estadoSocio == "Ativo" ? styles.Ativo: styles.Inativo}`}>
          {estadoSocio}
        </span>
        <span
          className={`${styles.nome} ${
            estadoQuotas == "Em Dia" ? styles.Ativo : styles.Inativo
          }`}
        >
          {estadoQuotas}
        </span>
      </div>

      <div className={styles.acoes}>
        {/* <BotaoInfoEditar onClick={null} /> */}

        {/* <BotaoRemover onClick={null} /> */}
      </div>
    </div>
  );
};

export default LinhaSocio;
