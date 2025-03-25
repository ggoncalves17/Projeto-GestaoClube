import React from "react";
import LinhaUtilizador from "./LinhaUtilizador";
import styles from './ListaUtilizadores.module.css'

const ListaUtilizadores = ({ utilizadoresFiltrados }) => {
  return (
    <>
      {utilizadoresFiltrados.length > 0 ? (utilizadoresFiltrados.map((utilizador) =>
        <LinhaUtilizador  key={utilizador.id} utilizador={utilizador}/>
      )) : <p className={styles.info}>Não foi encontrado qualquer utilizador!</p>}
    </>
  );
};

export default ListaUtilizadores;
