import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import CardEquipa from "../../../components/CardEquipa";
import styles from "../../../components/ListaUtilizadores.module.css";
import { listaEquipas } from "../../../api/Equipas/api";
import Spinner from "../../../components/Spinner";
import Modal from "../../../components/JanelaModal/Modal";
import InputForm from "../../../components/InputForm";
import SelectForm from "../../../components/SelectForm";
import { adicionaEquipa } from "../../../api/Equipas/api";

const Equipas = () => {
  const { id: id_modalidade } = useParams();
  const {
    filtroCategoria,
    filtroEpoca,
    modo,
    setModo,
    infoModalidade,
  } = useOutletContext();

  const [loading, setLoading] = useState(true);
  const [equipas, setEquipas] = useState([]);
  const [erro, setErro] = useState("");

  const [novaEquipa, setNovaEquipa] = useState({
    nome: "",
    epoca: "",
    categoria: "",
  });

  useEffect(() => {
    listaEquipas(id_modalidade, setEquipas, setLoading);
  }, []);

  useEffect(() => {
    setNovaEquipa({ nome: "", epoca: "", categoria: "" });
    setErro("")
  }, [modo]);

  const equipasFiltradas = equipas.filter(
    (equipa) =>
      (filtroCategoria === "Categoria" ||
      filtroCategoria === "Ambos" ||
      filtroCategoria === ""
        ? true
        : equipa.categoria === filtroCategoria) &&
      (filtroEpoca === "Época" || filtroEpoca === "Todas" || filtroEpoca === ""
        ? true
        : equipa.epoca.nome === filtroEpoca)
  );

  const epocasUnicas = [
    ...new Set(equipasFiltradas.map((equipa) => equipa.epoca.nome)),
  ]
    .sort()
    .reverse();

  const todasEpocasExistentes = infoModalidade.epoca_set
    .map((epoca) => epoca.nome)
    .sort()
    .reverse();

  const handleSubmeteEquipa = (event) => {
    event.preventDefault();

    if (modo == "Adicionar") {
      if (
        equipas.some(
          (equipa) =>
            equipa.nome.trim().toLowerCase() ==
              novaEquipa.nome.trim().toLowerCase() &&
            equipa.epoca.nome == novaEquipa.epoca &&
            equipa.categoria == novaEquipa.categoria
        )
      ) {
        setErro("Já existe uma equipa exatamente com os mesmos atributos colocados");
        return;
      }
      
      // Chamada da Função para Adicionar nova Equipa
      adicionaEquipa(
        id_modalidade,
        novaEquipa,
        setEquipas,
        setModo,
        setErro
      );
    }
  };

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
                  {equipasFiltradas.map(
                    (equipa, index) =>
                      equipa.epoca.nome == epoca && (
                        <CardEquipa key={index} equipa={equipa} />
                      )
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className={styles.infoModalidades}>
              Não foi encontrada qualquer equipa para esta modalidade!
            </p>
          )}

          {modo && (
            <Modal
              setModal={setModo}
              titulo={`${modo} Equipa`}
              botao={modo == "Adicionar" ? "Adicionar" : "Guardar"}
              onSubmit={handleSubmeteEquipa}
            >
              <InputForm
                label="Nome da Equipa"
                valor={novaEquipa.nome}
                onChange={(e) =>
                  setNovaEquipa({ ...novaEquipa, nome: e.target.value })
                }
                erro={erro}
                placeholder="Ex: Equipa Principal"
              />

              <SelectForm
                label="Época"
                valor={novaEquipa.epoca}
                onChange={(e) =>
                  setNovaEquipa({ ...novaEquipa, epoca: e.target.value })
                }
                opcoes={todasEpocasExistentes}
              />

              <SelectForm
                label="Categoria"
                valor={novaEquipa.categoria}
                onChange={(e) =>
                  setNovaEquipa({ ...novaEquipa, categoria: e.target.value })
                }
                opcoes={["Masculino", "Feminino"]}
              />
            </Modal>
          )}

          {/* {modalRemover && (
            <PopUpRemoverModalidade
              setDesportos={setDesportos}
              idModalidade={modalidadeEscolhida}
              modalidadeNome={nomeModalidade}
              setModalRemover={setModalRemover}
            />
          )} */}
        </div>
      )}
    </div>
  );
};

export default Equipas;
