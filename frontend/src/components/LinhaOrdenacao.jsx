import styles from "../css/LinhaOrdenacao.module.css";
import OpcaoOrdenacao from "./OpcaoOrdenacao";

const LinhaOrdenacao = ({ tipo, ordenacao, setOrdenacao }) => {

  const alteraOrdem = (campo) => {
    setOrdenacao((prev) => ({
      campo : campo,
      ordem : prev?.campo == campo ? (prev.ordem == "ASC" ? "DESC" : "ASC") : "ASC",
    }))
  }
  
  return (
    <div className={styles.contentor}>
      <div
        className={`${styles.informacoesUtilizador} ${(tipo == "Staff" || tipo == "Utilizador") ? styles.linhaOrdena :
          tipo == "Elemento" ? styles.linhaOrdenaElemento : tipo == "Sócio" ? styles.linhaOrdenaSocio : tipo == "Categoria" ? styles.linhaOrdenaCategoria : styles.linhaOrdenaHistoricoCategoria
        }`}
      >

        <OpcaoOrdenacao nome="Nome" ordenacao={ordenacao} onClick={() => alteraOrdem("nome")}/>

        {(tipo != "Elemento" && tipo != "Sócio" && tipo != "Categoria" && tipo != "Historico") && (
          <OpcaoOrdenacao nome="Email" ordenacao={ordenacao} onClick={() => alteraOrdem("email")}/>
        )}

        {tipo == "Staff" && (
          <OpcaoOrdenacao nome="Função" ordenacao={ordenacao} onClick={() => alteraOrdem("funcao")}/>
        )}

        {tipo == "Elemento" && (
          <>
            <OpcaoOrdenacao nome="Género" ordenacao={ordenacao} onClick={() => alteraOrdem("sexo")}/>
            <OpcaoOrdenacao nome="Modalidade" ordenacao={ordenacao} onClick={() => alteraOrdem("modalidade")}/>
            <OpcaoOrdenacao nome="Função" ordenacao={ordenacao} onClick={() => alteraOrdem("tipo")}/>
          </>
        )}

        {tipo == "Sócio" && (
          <>
            <OpcaoOrdenacao nome="Categoria" ordenacao={ordenacao} onClick={() => alteraOrdem("categoria")}/>
            <OpcaoOrdenacao nome="Data de Adesão" ordenacao={ordenacao} onClick={() => alteraOrdem("data_adesao")}/>
            <OpcaoOrdenacao nome="Estado" ordenacao={ordenacao} onClick={() => alteraOrdem("estado")}/>
            <OpcaoOrdenacao nome="Estado das Quotas" ordenacao={ordenacao} onClick={() => alteraOrdem("estado_quotas")}/>
          </>
        )}

        {(tipo == "Categoria" || tipo == "Historico") && (
          <>
            <OpcaoOrdenacao nome="Quota Mensal" ordenacao={ordenacao} onClick={() => alteraOrdem("quota_mensal")}/>
            <OpcaoOrdenacao nome="Quota Anual" ordenacao={ordenacao} onClick={() => alteraOrdem("quota_anual")}/>
            <OpcaoOrdenacao nome="Inscrição" ordenacao={ordenacao} onClick={() => alteraOrdem("inscricao")}/>
          </>
        )} 
        
        {tipo == "Categoria" && (
            <OpcaoOrdenacao nome="Estado" ordenacao={ordenacao} onClick={() => alteraOrdem("estado")}/>
        )}

        {tipo == "Historico" && (
          <>
            <OpcaoOrdenacao nome="Data Inicial" ordenacao={ordenacao} onClick={() => alteraOrdem("data_inicial")}/>
            <OpcaoOrdenacao nome="Data Final" ordenacao={ordenacao} onClick={() => alteraOrdem("data_final")}/>
          </>
        )} 
        
      </div>
    </div>
  );
};

export default LinhaOrdenacao;
