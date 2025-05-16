import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "../css/LinhaInscricaoJogador.module.css";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";
import BotaoInfoEditar from "../components/BotaoInfoEditar";
import BotaoRemover from "../components/BotaoRemover";
import { MdOutlineFileUpload, MdOutlinePendingActions } from "react-icons/md";
import CardDocumento from "./CardDocumento";

const LinhaInscricaoJogador = ({
  inscricao,
  setModo,
  setModoUpload,
  setModalRemover,
  setInscricaoEscolhida,
}) => {
  const estadoInscricao = inscricao.estado;

  let estadoStr;

  switch (estadoInscricao) {
    case 0:
      estadoStr = "Não Enviado";
      break;
    case 1:
      estadoStr = "Pendente";
      break;
    case 2:
      estadoStr = "Aprovado";
      break;
    case 3:
      estadoStr = "Rejeitado";
      break;
  }

  const iconEstado = {
    "Não Enviado": (
      <MdOutlinePendingActions
        className={`${styles.icon} ${styles.iconNaoEnviado}`}
      />
    ),
    Pendente: (
      <FiAlertCircle className={`${styles.icon} ${styles.iconAlerta}`} />
    ),
    Aprovado: (
      <FaCheckCircle className={`${styles.icon} ${styles.iconAprovado}`} />
    ),
    Rejeitado: (
      <FiXCircle className={`${styles.icon} ${styles.iconRejeitado}`} />
    ),
  };

  const handleRemoveInscricao = () => {
    setModalRemover(true);
    setInscricaoEscolhida({
      id: inscricao.id,
      nome: inscricao.epoca,
    });
  };

  const handleEditaInscricao = () => {
    setModo("Editar");
    setInscricaoEscolhida({
      id: inscricao.id,
      epoca: inscricao.epoca,
      estado: estadoStr,
    });
  };

  const handleUploadDocumentos = () => {
    setModoUpload(true);
    setInscricaoEscolhida({
      id: inscricao.id,
    });
  };

  return (
    <div className={styles.linha}>
      <div className={styles.painelInfo}>
        <div className={styles.infoGeral}>
          {iconEstado[estadoStr]}
          <div className={styles.grelha}>
            <div className={styles.epoca}>
              <h4>Época {inscricao.epoca}</h4>
              <div
                className={`${styles.estado} ${
                  estadoStr === "Pendente"
                    ? styles.estadoPendente
                    : estadoStr === "Aprovado"
                    ? styles.estadoAprovado
                    : estadoStr === "Rejeitado"
                    ? styles.estadoRejeitado
                    : styles.estadoNaoEnviado
                }`}
              >
                <p>{estadoStr}</p>
              </div>
            </div>
            {estadoStr == "Aprovado" && (
              <p className={styles.dataInscricao}>
                Data Inscrição:{" "}
                {new Date(inscricao.data_inscricao).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        <div className={styles.painelBotoes}>
          <BotaoInfoEditar onClick={handleEditaInscricao} />
          <BotaoRemover onClick={handleRemoveInscricao} />
        </div>
      </div>
      <div className={styles.painelDocumentos}>
        <div className={styles.tituloDocumentos}>
          <p>Documentos</p>
          <button className={styles.btnUpload} onClick={handleUploadDocumentos}>
            <MdOutlineFileUpload className={styles.iconUpload} />
            <p className={styles.textoUpload}>Upload</p>
          </button>
        </div>

        <div className={styles.documentos}>
          {inscricao.cartao_cidadao && (
            <CardDocumento
              tipo="Cartão Cidadão"
              inscricao={inscricao}
              nomeFicheiro="cartao_cidadao"
            />
          )}

          {inscricao.exames_medico && (
            <CardDocumento
              tipo="Exame Médico"
              inscricao={inscricao}
              nomeFicheiro="exames_medico"
            />
          )}

          {(!inscricao.cartao_cidadao && !inscricao.exames_medico) && <p>Não existem documentos associados.</p>}
        </div>
      </div>
    </div>
  );
};

export default LinhaInscricaoJogador;
