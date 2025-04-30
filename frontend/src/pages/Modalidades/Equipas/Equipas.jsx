import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CardEquipa from "../../../components/CardEquipa";
import styles from "../../../components/ListaUtilizadores.module.css";
import { listaEquipas } from "../../../api/Equipas/api";
import Spinner from "../../../components/Spinner";

const Equipas = () => {
  const { id: id_modalidade } = useParams();

  const [loading, setLoading] = useState(true);
  const [equipas, setEquipas] = useState([]);
  const epocasUnicas = [...new Set(equipas.map((equipa) => equipa.epoca.nome))]
    .sort()
    .reverse();

  useEffect(() => {
    listaEquipas(id_modalidade, setEquipas, setLoading);
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div>
          {equipas.length > 0 ? (
            epocasUnicas.map((epoca, index) => (
              <div key={index}>
                <h2>
                  <u>Época {epoca}</u>
                </h2>
                <div className={styles.grelhaModalidades}>
                  {equipas.map((equipa, index) => (
                    <CardEquipa key={index} equipa={equipa} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className={styles.infoModalidades}>
              Não foi encontrada qualquer equipa para esta modalidade!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Equipas;
