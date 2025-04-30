import React, { useEffect, useState  } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import CardEquipa from "../../../components/CardEquipa";
import styles from "../../../components/ListaUtilizadores.module.css";
import { listaEquipas } from "../../../api/Equipas/api";
import Spinner from "../../../components/Spinner";

const Equipas = () => {
  const { id: id_modalidade } = useParams();
  const { filtroCategoria, setEpocasExistentes, filtroEpoca } = useOutletContext();

  const [loading, setLoading] = useState(true);
  const [equipas, setEquipas] = useState([]);

  useEffect(() => {
    listaEquipas(id_modalidade, setEquipas, setLoading);
  }, []);

  const equipasFiltradas = equipas.filter((equipa) =>
    ((filtroCategoria === "Tipo" || filtroCategoria === "Ambos" || filtroCategoria === "") ? true : equipa.categoria === filtroCategoria) &&
    ((filtroEpoca === "Tipo" || filtroEpoca === "Todas" || filtroEpoca === "") ? true : equipa.epoca.nome === filtroEpoca)
  )

  const epocasUnicas = [...new Set(equipasFiltradas.map((equipa) => equipa.epoca.nome))]
    .sort()
    .reverse();

  useEffect(() => {

    const epocasFiltro = ["Todas", ...new Set(equipas.map((equipa) => equipa.epoca.nome))]
    .sort()
    .reverse();

    setEpocasExistentes(epocasFiltro)
  }, [equipas])

  return (
    <div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className={styles.equipasEpoca}>
          {equipasFiltradas.length > 0 ? (
            epocasUnicas.map((epoca, index) => (
              <div key={index}>
                <h2>
                  <u>Época {epoca}</u>
                </h2>
                <div className={styles.grelhaModalidades}>
                  {equipasFiltradas.map((equipa, index) => (
                    equipa.epoca.nome == epoca && <CardEquipa key={index} equipa={equipa} />
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
