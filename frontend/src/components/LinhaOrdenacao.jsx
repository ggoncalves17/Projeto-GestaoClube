import styles from "../css/LinhaOrdenacao.module.css";
import OpcaoOrdenacao from "./OpcaoOrdenacao";

const LinhaOrdenacao = ({ tipo, ordenacao, setOrdenacao }) => {
  const tipoClasses = {
    Staff: styles.linhaOrdena,
    Utilizador: styles.linhaOrdena,
    Elemento: styles.linhaOrdenaElemento,
    Sócio: styles.linhaOrdenaSocio,
    Categoria: styles.linhaOrdenaCategoria,
    Quotas: styles.linhaOrdenaQuota,
    Historico: styles.linhaOrdenaHistoricoCategoria,
  };

  const opcoesOrdenacaoPorTipo = {
    Staff: [
      { nome: "Nome", campo: "nome" },
      { nome: "Email", campo: "email" },
      { nome: "Função", campo: "funcao" },
    ],
    Utilizador: [
      { nome: "Nome", campo: "nome" },
      { nome: "Email", campo: "email" },
    ],
    Elemento: [
      { nome: "Nome", campo: "nome" },
      { nome: "Género", campo: "sexo" },
      { nome: "Modalidade", campo: "modalidade" },
      { nome: "Função", campo: "tipo" },
    ],
    Sócio: [
      { nome: "Nome", campo: "utilizador.nome" },
      { nome: "Categoria", campo: "categoria" },
      { nome: "Data de Adesão", campo: "data_adesao" },
      { nome: "Estado", campo: "estado" },
      { nome: "Estado das Quotas", campo: "quotas_atrasadas" },
    ],
    Categoria: [
      { nome: "Nome", campo: "nome" },
      { nome: "Quota Mensal", campo: "quota_mensal" },
      { nome: "Quota Anual", campo: "quota_anual" },
      { nome: "Inscrição", campo: "inscricao" },
      { nome: "Estado", campo: "estado" },
    ],
    Quotas: [
      { nome: "Nome", campo: "utilizador.nome" },
      { nome: "Tipo", campo: "tipo_quota" },
      { nome: "Prazo Pagamento", campo: "prazo_pagamento" },
      { nome: "Valor", campo: "valor" },
      { nome: "Estado", campo: "estado" },
      { nome: "Data Pagamento", campo: "data_pagamento" },
    ],
    Historico: [
      { nome: "Nome", campo: "categoria.nome" },
      { nome: "Quota Mensal", campo: "h_quota_mensal" },
      { nome: "Quota Anual", campo: "h_quota_anual" },
      { nome: "Inscrição", campo: "h_inscricao" },
      { nome: "Data Inicial", campo: "data_inicial" },
      { nome: "Data Final", campo: "data_final" },
    ],
  };

  const alteraOrdem = (campo) => {
    setOrdenacao((prev) => ({
      campo: campo,
      ordem:
        prev?.campo == campo ? (prev.ordem == "ASC" ? "DESC" : "ASC") : "ASC",
    }));
  };

  const estilo = tipoClasses[tipo] || styles.linhaOrdenaHistoricoCategoria;

  const opcoesAtuais = opcoesOrdenacaoPorTipo[tipo] || [];

  return (
    <div className={styles.contentor}>
      <div className={`${styles.informacoesUtilizador} ${estilo}`}>
        {opcoesAtuais.map((opcao) => (
          <OpcaoOrdenacao
            key={opcao.campo}
            nome={opcao.nome}
            ordenacao={ordenacao}
            onClick={() => alteraOrdem(opcao.campo)}
          />
        ))}
      </div>
    </div>
  );
};

export default LinhaOrdenacao;
