import styles from "../../../components/LinhaUtilizador.module.css";
import BotaoInfoEditar from "../../../components/BotaoInfoEditar";
import { useState } from "react";
import PopUpEstadoGeral from "../../../components/PopUpEstadoGeral";
import { alteraEstadoCategoria } from "../../../api/Socios/api";

const LinhaCategoria = ({
  categoria,
  setModo,
  setNovaCategoria,
  setCategorias,
  historico,
}) => {
  const estado = categoria.estado == 1 ? "Ativo" : "Inativo";
  const [modalEstadoAberta, setModalEstadoAberta] = useState(false);

  const handleEditaCategoria = () => {
    setModo("Editar");
    setNovaCategoria(categoria);
  };

  const handleAlteraEstadoCategoria = () => {
    alteraEstadoCategoria(categoria.id, setCategorias, setModalEstadoAberta);
  };

  const handleAbreModal = () => {
    if (categoria.estado == 1) {
      setModalEstadoAberta(true);
    } else {
      handleAlteraEstadoCategoria();
    }
  };

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
            <span className={styles.nome}>
              {new Date(categoria.data_inicial).toLocaleDateString()}
            </span>
            <span className={styles.nome}>
              {categoria.data_final
                ? new Date(categoria.data_final).toLocaleDateString()
                : "Atual"}
            </span>
          </>
        ) : (
          <span
            className={`${styles.estado} ${
              estado == "Ativo" ? styles.btnAtivo : styles.btnInativo
            }`}
            onClick={handleAbreModal}
          >
            {estado}
          </span>
        )}
      </div>

      {!historico && <BotaoInfoEditar onClick={handleEditaCategoria} />}

      {modalEstadoAberta && (
        <PopUpEstadoGeral
          objeto={categoria}
          titulo="a categoria"
          setModalEstadoAberta={setModalEstadoAberta}
          onClick={handleAlteraEstadoCategoria}
        />
      )}
    </div>
  );
};

export default LinhaCategoria;
