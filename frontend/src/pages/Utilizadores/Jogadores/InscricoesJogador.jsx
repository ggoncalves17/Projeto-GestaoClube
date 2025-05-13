import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LinhaInscricaoJogador from "../../../components/LinhaInscricaoJogador";
import styles from "./DetalhesJogadores.module.css";
import Spinner from "../../../components/Spinner";
import {
  listaInscricoesJogador,
  adicionaInscricaoEpoca,
} from "../../../api/Utilizadores/api";
import Modal from "../../../components/JanelaModal/Modal";
import SelectForm from "../../../components/SelectForm";
import { listaEpocas } from "../../../api/Epocas/api";

const InscricoesJogador = () => {
  const { infoJogador, modo, setModo } = useOutletContext();
  const [loadingInscricoes, setLoadingInscricoes] = useState(true);
  const [loadingEpocas, setLoadingEpocas] = useState(true);
  const loading = loadingInscricoes || loadingEpocas;
  const [erro, setErro] = useState("");
  const [inscricoes, setInscricoes] = useState([]);
  const [novaInscricao, setNovaInscricao] = useState({
    epoca: "",
  });
  const [todasEpocas, setTodasEpocas] = useState([]);
  const epocasDisponiveis = todasEpocas.map((epoca) => epoca.nome);

  useEffect(() => {
    listaInscricoesJogador(infoJogador.id, setInscricoes, setLoadingInscricoes);
    listaEpocas(infoJogador.modalidade.id, setTodasEpocas, setLoadingEpocas);
  }, []);

  useEffect(() => {
    setNovaInscricao({
      epoca: "",
    });
    setErro("");
  }, [modo]);

  const handleSubmeteInscricao = (event) => {
    event.preventDefault();

    if (
      infoJogador.cartao_cidadao == null ||
      infoJogador.data_validade_cc == null
    ) {
      setErro(
        "Para inserir uma inscrição, é necessário ter os campos do Cartão de Cidadão e respetiva validade preenchidos."
      );
      return;
    } else if (new Date(infoJogador.data_validade_cc) < new Date()) {
      setErro("Validade do Cartão de Cidadão do elemento já expirou.");
      return;
    }

    const epoca = todasEpocas.find(
      (epoca) => epoca.nome == novaInscricao.epoca
    );

    adicionaInscricaoEpoca(
      infoJogador.id,
      epoca.id,
      setInscricoes,
      setModo,
      setErro
    );
  };

  return (
    <div className={styles.conteudo}>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          <p className={styles.titulo}>Inscrições</p>
          <div>
            {inscricoes.length > 0 ? (
              <div className={styles.grelhaInscricoes}>
                {inscricoes.map((inscricao, index) => (
                  <LinhaInscricaoJogador key={index} inscricao={inscricao} />
                ))}
              </div>
            ) : (
              <p>O jogador(a) não tem qualquer inscrição associada.</p>
            )}
          </div>

          {modo == "Adicionar" && (
            <Modal
              setModal={setModo}
              titulo={`${modo} Inscrição`}
              botao={modo == "Adicionar" ? "Adicionar" : "Guardar"}
              onSubmit={handleSubmeteInscricao}
            >
              <SelectForm
                erro={erro}
                label="Época"
                valor={novaInscricao.epoca}
                onChange={(e) =>
                  setNovaInscricao({ ...novaInscricao, epoca: e.target.value })
                }
                opcoes={epocasDisponiveis}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default InscricoesJogador;
