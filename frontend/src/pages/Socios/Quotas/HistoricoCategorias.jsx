import React, { useState, useEffect } from "react";
import styles from "../../../css/Categorias.module.css";
import { PainelBotoes } from "./PainelBotoes";
import Spinner from "../../../components/Spinner";
import ListaCategorias from "./ListaCategorias";
import { listaHistoricoCategorias } from "../../../api/Socios/api";
import { ordenaUtilizadores } from "../../../utils/ordenacaoUtilizadores";

const HistoricoCategorias = () => {

  const [loading,setLoading] = useState(true)
  const [categorias, setCategorias] = useState([])
  const [ordenacao, setOrdenacao] = useState();

  useEffect(() => {
    listaHistoricoCategorias(setCategorias, setLoading);
  }, [])
  
  const categoriasOrdenadas = ordenaUtilizadores(categorias, ordenacao);

  return (
    <div>
      <PainelBotoes />
      <div className={styles.painelInferior}>
        {loading ? (
          <Spinner />
        ) : (
          <ListaCategorias
            categorias={categoriasOrdenadas}
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
            setModo={null}
            historico = {true}
          />
        )}
      </div>
    </div>
  );
};

export default HistoricoCategorias;
