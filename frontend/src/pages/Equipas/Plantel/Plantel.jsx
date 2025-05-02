import React from "react";
import { useOutletContext } from "react-router-dom";
import CardElemento from "../../../components/CardElemento";
import styles from "../../../components/ListaUtilizadores.module.css";

const Plantel = () => {
  const { infoEquipa } = useOutletContext();
  const elementosEquipa = infoEquipa.elemento_clube_set;

  const elementosFiltrados = [
    {
      tipo: "Jogador",
      elementos: elementosEquipa.filter(
        (elemento) => elemento.tipo == "Jogador"
      ),
    },
    {
      tipo: "Treinador",
      elementos: elementosEquipa.filter(
        (elemento) => elemento.tipo == "Treinador"
      ),
    },
  ];

  return (
    <div className={styles.paineisElementos}>
      {elementosFiltrados.map((tipo, index) => (
        <div key={index}>
          <h2>
            <u>{tipo.tipo}es</u>
          </h2>
          <div className={styles.grelhaModalidades}>
            {tipo.elementos.length > 0 ? (
              tipo.elementos.map((elemento, index) => (
                <CardElemento
                  key={index}
                  id={elemento.id}
                  foto={elemento.foto}
                  nome={elemento.nome}
                  posicao={elemento.posicao}
                />
              ))
            ) : (
              <p className={styles.infoElementos}>
                Não existe qualquer {tipo.tipo} associado a esta equipa.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plantel;
