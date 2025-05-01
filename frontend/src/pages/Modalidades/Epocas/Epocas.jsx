import React, { useEffect, useState, useContext } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import CardEpoca from "../../../components/CardEpoca";
import styles from "../../../components/ListaUtilizadores.module.css";
import { listaEpocas } from "../../../api/Epocas/api";
import Spinner from "../../../components/Spinner";
import Modal from "../../../components/JanelaModal/Modal";

const Epocas = () => {
  const { id: id_modalidade } = useParams();
  const { modo, setModo } = useOutletContext();

  const [loading, setLoading] = useState(true);
  const [epocas, setEpocas] = useState([]);
  const [erro, setErro] = useState("");

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

          {modo && (
            <Modal
              setModal={setModo}
              titulo={`${modo} Época`}
              botao={modo == "Adicionar" ? "Adicionar" : "Guardar"}
              onSubmit={null}
            ></Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Epocas;
