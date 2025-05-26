import React, { useState, useEffect } from "react";
import styles from "../../../css/Categorias.module.css";
import { PainelBotoes } from "./PainelBotoes";
import Spinner from "../../../components/Spinner";
import ListaCategorias from "./ListaCategorias";
import { listaHistoricoCategorias } from "../../../api/Socios/api";

const HistoricoCategorias = () => {

  const [loading,setLoading] = useState(true)
  const [categorias, setCategorias] = useState()
  
  useEffect(() => {
    listaHistoricoCategorias(setCategorias, setLoading);
  }, []);

  return (
    <div>
      <PainelBotoes />
      <div className={styles.painelInferior}>
        {loading ? (
          <Spinner />
        ) : (
          <ListaCategorias
            categorias={categorias}
            ordenacao={null}
            setOrdenacao={null}
            setModo={null}
            historico = {true}
          />
        )}
      </div>
    </div>
  );
};

export default HistoricoCategorias;
