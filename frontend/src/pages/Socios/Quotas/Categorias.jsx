import React, { useEffect, useState } from "react";
import styles from "../../../css/Categorias.module.css";
import { PainelBotoes } from "./PainelBotoes";
import Spinner from "../../../components/Spinner";
import ListaCategorias from "./ListaCategorias";
import { listaCategorias } from "../../../api/Socios/api";

const Categorias = () => {
  const [categorias, setCategorias] = useState();
  const [ordenacao, setOrdenacao] = useState();
  const [loading, setLoading] = useState(true);
  const [modo, setModo] = useState(null)

  useEffect(() => {
    listaCategorias(setCategorias, setLoading);
  }, []);

  return (
    <div>
      <PainelBotoes setModo={setModo} temBotao={true}/>
      <div className={styles.painelInferior}>
        {loading ? (
          <Spinner />
        ) : (
          <ListaCategorias
            categorias={categorias}
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
            setModo={setModo}
          />
        )}
      </div>

        {modo && (
          <p>Teste Adicionar</p>
        )}

    </div>
  );
};

export default Categorias;
