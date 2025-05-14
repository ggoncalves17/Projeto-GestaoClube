import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CardElemento from "../../../components/CardElemento";
import styles from "../../../components/ListaUtilizadores.module.css";
import Modal from "../../../components/JanelaModal/Modal";
import SelectAllTransferList from "../../../components/SelectAllTransferList";
import { associaElementoEquipa, listaElementosDisponiveis } from "../../../api/Equipas/api";

const Plantel = () => {
  const { infoEquipa, modo, setModo } = useOutletContext();
  const [elementosEquipa, setElementosEquipa] = useState(
    infoEquipa.elemento_clube_set
  );

  // console.log("ELEMENTOS EQUIPA: ", elementosEquipa);

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

  const [elementosDisponiveis, setElementosDisponiveis] = useState([]);

  const elementosAssociados = elementosEquipa.map((elemento) => ({
    id: elemento.id,
    nome: elemento.nome,
  }));

  const [elementosGuardar, setElementosGuardar] = useState([]);

  const handleGuardaElementos = (event) => {
    event.preventDefault();

    associaElementoEquipa(
      infoEquipa.id,
      elementosGuardar,
      setElementosEquipa,
      setModo
    );
  };

  useEffect(() => {
    listaElementosDisponiveis(infoEquipa.id, setElementosDisponiveis);
  }, [elementosEquipa]);

  return (
    <div className={styles.paineisElementos}>
      {elementosFiltrados.map((tipo, index) => (
        <div key={index}>
          <h3>
            <u>{tipo.tipo}es</u>
          </h3>
          <div className={styles.grelhaModalidades}>
            {tipo.elementos.length > 0 ? (
              tipo.elementos.map((elemento, index) => (
                <CardElemento
                  key={index}
                  id={elemento.id}
                  foto={elemento.foto}
                  nome={elemento.nome}
                  posicao={elemento.posicao}
                  inscricao={elemento.inscricao_set.find(
                    (inscricao) =>
                      inscricao.epoca == infoEquipa.epoca
                  )}
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

      {modo && (
        <Modal
          setModal={setModo}
          titulo={"Associar / Desassociar Jogadores"}
          botao={"Guardar"}
          onSubmit={handleGuardaElementos}
        >
          {/* TODO: NO TRANSFERLIST BLOQUEAR A PARTE DE GUARDAR SE OS ELEMENTOS A ASSOCIAR FOREM IGUAIS AO QUE ESTÃO INICIALMENTE e COLOCAR FUNCAO ELEMENTO*/}
          <SelectAllTransferList
            elementosDisponiveis={elementosDisponiveis}
            elementosAssociados={elementosAssociados}
            setElementosGuardar={setElementosGuardar}
          />
        </Modal>
      )}
    </div>
  );
};

export default Plantel;
