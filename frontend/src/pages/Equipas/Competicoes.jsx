import React, { useEffect, useState, useContext } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Modal from "../../components/JanelaModal/Modal";
import InputForm from "../../components/InputForm";
import { listaCompeticoes, adicionaCompeticao, editaCompeticao } from "../../api/Equipas/api";
import styles from "../../components/ListaUtilizadores.module.css";
import CardCompeticao from "../../components/CardCompeticao";
import PopUpRemoverModalidade from '../../components/PopUpRemoverModalidade'

const Competicoes = () => {
  const { id_equipa } = useParams();
  const { modo, setModo } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [competicoes, setCompeticoes] = useState([]);
  const [erro, setErro] = useState("");
  const [nomeCompeticao, setNomeCompeticao] = useState("");
  const [competicaoEscolhida, setCompeticaoEscolhida] = useState("");
  const [modalRemover, setModalRemover] = useState(null);

  useEffect(() => {
    listaCompeticoes(id_equipa, setCompeticoes, setLoading);
  }, []);

  useEffect(() => {
    if (modo == "Editar") {
      setNomeCompeticao(competicaoEscolhida.nome);

      console.log("COMPETIÇÃO ESCOLHIDA -: ", competicaoEscolhida);
      
    } else {
      setNomeCompeticao("");
      setErro("");
    }
  }, [modo, competicaoEscolhida]);

  const handleSubmeteCompeticao = (event) => {
    event.preventDefault();

    if (modo == "Adicionar") {
      if (
        competicoes.some(
          (competicao) =>
            competicao.nome.trim().toLowerCase() ==
            nomeCompeticao.trim().toLowerCase()
        )
      ) {
        setErro("Já existe uma competição com o mesmo nome");
        return;
      }
    } else {
      if (
        competicoes.some(
          (competicao) =>
            competicao.nome.trim().toLowerCase() ==
              nomeCompeticao.trim().toLowerCase() &&
            competicao.id != competicaoEscolhida.id
        )
      ) {
        setErro("Já existe uma competição com o mesmo nome");
        return;
      }
    }

    if (modo == "Adicionar") {
      adicionaCompeticao(
        id_equipa,
        nomeCompeticao,
        setCompeticoes,
        setModo,
        setErro
      );
    } else if (modo == "Editar") {  
      
      const id_competicao = competicaoEscolhida.id

      editaCompeticao(id_competicao, nomeCompeticao,setCompeticoes, setModo, setErro);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div>
          {competicoes.length > 0 ? (
            <div className={styles.grelhaCompeticoes}>
              {competicoes.map((competicao, index) => (
                <CardCompeticao
                  key={index}
                  setModo={setModo}
                  competicao={competicao}
                  setModalRemover={setModalRemover}
                  setCompeticaoEscolhida={setCompeticaoEscolhida}
                />
              ))}
            </div>
          ) : (
            <p className={styles.infoModalidades}>
              Não foi encontrada qualquer competição associada a esta equipa!
            </p>
          )}

          {modo && (
            <Modal
              setModal={setModo}
              titulo={`${modo} Competição`}
              botao={modo == "Adicionar" ? "Adicionar" : "Guardar"}
              onSubmit={handleSubmeteCompeticao}
            >
              <InputForm
                label="Nome da Competição"
                valor={nomeCompeticao}
                onChange={(e) => setNomeCompeticao(e.target.value)}
                erro={erro}
                placeholder="Ex: Campeonato Nacional"
              />
            </Modal>
          )}

          {modalRemover && (
            <PopUpRemoverModalidade
              titulo="competição"
              setDesportos={setCompeticoes}
              idModalidade={competicaoEscolhida.id}
              modalidadeNome={competicaoEscolhida.nome}
              setModalRemover={setModalRemover}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Competicoes;
