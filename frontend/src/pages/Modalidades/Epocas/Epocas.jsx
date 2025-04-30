import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CardEpoca from "../../../components/CardEpoca";
import styles from "../../../components/ListaUtilizadores.module.css";
import { listaEpocas } from "../../../api/Epocas/api";
import Spinner from "../../../components/Spinner";

const Epocas = () => {
  const { id: id_modalidade } = useParams();

  const [loading, setLoading] = useState(true);
  const [epocas, setEpocas] = useState([]);

  useEffect(() => {
    listaEpocas(id_modalidade, setEpocas, setLoading);
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div>
          {epocas.length > 0 ? (
            <div className={styles.grelhaEpocas}>
              {epocas.map((epoca, index) => (
                <CardEpoca key={index} epoca={epoca} />
              ))}
            </div>
          ) : (
            <p className={styles.infoModalidades}>
              Não foi encontrada qualquer época para esta modalidade!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Epocas;
