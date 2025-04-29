import React from "react";
import CardModalidade from "./CardModalidade";
import styles from "./ListaUtilizadores.module.css";

const ListaModalidades = ({
  modalidadesFiltradas,
  setModo,
  setModalidade,
  setNomeModalidade,
  modalRemover,
  setModalRemover
}) => {
  return (
    <div className={styles.grelhaModalidades}>
      {modalidadesFiltradas.length > 0 ? (
        modalidadesFiltradas.map((modalidade) => (
          <CardModalidade
            key={modalidade.id}
            modalidade={modalidade}
            setModo={setModo}
            setModalidade={setModalidade}
            setNomeModalidade={setNomeModalidade}
            modalRemover={modalRemover}
            setModalRemover={setModalRemover}
          />
        ))
      ) : (
        <p className={styles.infoModalidades}>
          Não foi encontrada qualquer modalidade!
        </p>
      )}
    </div>
  );
};

export default ListaModalidades;
