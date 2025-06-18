import React from "react";
import { FaSort } from "react-icons/fa";
import { FaSortUp, FaSortDown } from "react-icons/fa6";
import styles from "../css/LinhaOrdenacao.module.css";

const OpcaoOrdenacao = ({ nome, ordenacao, onClick }) => {
  let nomeCampo;

  // Para verificar qual o Icon vai ser colocado na parte do ASC ou DESC, visto que se passou logo o nome real do campo a ordenar (que está na BD)
  // e depois para comparar (de forma a meter o icon certo e o icon alterar) traduz-se o campo real para o nome do campo de ordenação
  const campos = {
    nome: "Nome",
    email: "Email",
    funcao: "Função",
    sexo: "Género",
    modalidade: "Modalidade",
    tipo: "Função",
    "utilizador.nome": "Nome",
    categoria: "Categoria",
    data_adesao: "Data de Adesão",
    estado: "Estado",
    quotas_atrasadas: "Estado das Quotas",
    quota_mensal: "Quota Mensal",
    quota_anual: "Quota Anual",
    inscricao: "Inscrição",
    prazo_pagamento: "Prazo Pagamento",
    data_pagamento: "Data Pagamento",
    valor: "Valor",
    tipo_quota: "Tipo",
    "categoria.nome": "Nome",
    h_quota_mensal: "Quota Mensal",
    h_quota_anual: "Quota Anual",
    h_inscricao: "Inscrição",
    data_inicial: "Data Inicial",
    data_final: "Data Final",
  };

  return (
    <span onClick={onClick}>
      {nome}

      {campos[ordenacao?.campo] == nome ? (
        ordenacao.ordem == "ASC" ? (
          <FaSortUp className={styles.iconOrdenacao} />
        ) : (
          <FaSortDown className={styles.iconOrdenacao} />
        )
      ) : (
        <FaSort className={styles.iconSemOrdenacao} />
      )}
    </span>
  );
};

export default OpcaoOrdenacao;
