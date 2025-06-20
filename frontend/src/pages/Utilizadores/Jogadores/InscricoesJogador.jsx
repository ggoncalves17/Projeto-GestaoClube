import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LinhaInscricaoJogador from "../../../components/LinhaInscricaoJogador";
import styles from "./DetalhesJogadores.module.css";
import Spinner from "../../../components/Spinner";
import {
  listaInscricoesJogador,
  adicionaInscricaoEpoca,
  editaInscricaoEpoca,
  uploadDocumentosInscricao,
} from "../../../api/Utilizadores/api";
import Modal from "../../../components/JanelaModal/Modal";
import SelectForm from "../../../components/SelectForm";
import { listaEpocas } from "../../../api/Epocas/api";
import PopUpRemoverModalidade from "../../../components/PopUpRemoverModalidade";
import InputForm from "../../../components/InputForm";

const InscricoesJogador = () => {
  const { infoJogador, modo, setModo } = useOutletContext();
  const [loadingInscricoes, setLoadingInscricoes] = useState(true);
  const [loadingEpocas, setLoadingEpocas] = useState(true);
  const loading = loadingInscricoes || loadingEpocas;
  const [erro, setErro] = useState("");
  const [modoUpload, setModoUpload] = useState(false);
  const [modalRemover, setModalRemover] = useState(null);
  const [inscricoes, setInscricoes] = useState([]);
  const [novaInscricao, setNovaInscricao] = useState({
    epoca: "",
  });
  const [documentos, setDocumentos] = useState({
    cartao_cidadao: null,
    exames_medicos: null,
  });
  const [inscricaoEscolhida, setInscricaoEscolhida] = useState(null);
  const [todasEpocas, setTodasEpocas] = useState([]);
  const epocasDisponiveis = todasEpocas.map((epoca) => epoca.nome);

  const estadosDisponiveis = [
    "Não Enviado",
    "Pendente",
    "Aprovado",
    "Rejeitado",
  ];

  useEffect(() => {
    listaInscricoesJogador(infoJogador.id, setInscricoes, setLoadingInscricoes);

    //TODO: id da modalidade pode não existir se o jogador não tiver uma modalidade associada. Tratar este problema.
    listaEpocas(infoJogador.modalidade.id, setTodasEpocas, setLoadingEpocas);
  }, []);

  useEffect(() => {
    setNovaInscricao({
      epoca: "",
    });
    setErro("");
  }, [modo]);

  useEffect(() => {
    if (modo == "Editar") {
      setNovaInscricao(inscricaoEscolhida);
    }
  }, [inscricaoEscolhida]);

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

    if (modo == "Adicionar") {
      adicionaInscricaoEpoca(
        infoJogador.id,
        epoca.id,
        setInscricoes,
        setModo,
        setErro
      );
    } else if (modo == "Editar") {

      editaInscricaoEpoca(novaInscricao, setInscricoes, setModo, setErro);
    }
  };

  const handleUploadDocumentos = (event) => {
    event.preventDefault();
    
    uploadDocumentosInscricao(inscricaoEscolhida.id, documentos, setInscricoes, setModoUpload, setErro);
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
                  <LinhaInscricaoJogador
                    key={index}
                    inscricao={inscricao}
                    setModo={setModo}
                    setModoUpload={setModoUpload}
                    setModalRemover={setModalRemover}
                    setInscricaoEscolhida={setInscricaoEscolhida}
                  />
                ))}
              </div>
            ) : (
              <p>O jogador(a) não tem qualquer inscrição associada.</p>
            )}
          </div>

          {modo && (
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

              {modo == "Editar" && (
                <SelectForm
                  label="Estado"
                  valor={novaInscricao.estado}
                  onChange={(e) =>
                    setNovaInscricao({
                      ...novaInscricao,
                      estado: e.target.value,
                    })
                  }
                  opcoes={estadosDisponiveis}
                />
              )}
            </Modal>
          )}

          {modalRemover && (
            <PopUpRemoverModalidade
              titulo="inscricao"
              setDesportos={setInscricoes}
              idModalidade={inscricaoEscolhida.id}
              modalidadeNome={inscricaoEscolhida.nome}
              setModalRemover={setModalRemover}
            />
          )}

          {modoUpload == true && (
            <Modal
              setModal={setModoUpload}
              titulo={`Upload Documentos - Inscrição`}
              botao={"Guardar"}
              onSubmit={handleUploadDocumentos}
            >
              <InputForm
                erro={erro}
                tipo="file"
                label="Cartão de Cidadão (Apenas PDFs)"
                onChange={(e) =>
                  setDocumentos(
                    { ...documentos, cartao_cidadao: e.target.files[0] }
                  )
                }
                required={false}
              />

              <InputForm
                tipo="file"
                label="Exames Médicos (Apenas PDFs)"
                onChange={(e) =>
                  setDocumentos(
                    { ...documentos, exames_medicos: e.target.files[0] }
                  )
                }
                required={false}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default InscricoesJogador;
