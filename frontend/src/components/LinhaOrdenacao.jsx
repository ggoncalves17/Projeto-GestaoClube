import styles from "../css/LinhaOrdenacao.module.css";
import { FaSort } from "react-icons/fa";
import OpcaoOrdenacao from "./OpcaoOrdenacao";

const LinhaOrdenacao = ({ tipo, ordenacao, setOrdenacao }) => {

  const alteraOrdem = (x) => {
    setOrdenacao((prev) => ({
      campo : x,
      ordem : prev?.campo == x ? (prev.ordem == "ASC" ? "DESC" : "ASC") : "ASC",
    }))
  }
  
  return (
    <div className={styles.contentor}>
      <div
        className={`${styles.informacoesUtilizador} ${
          tipo != "Utilizador" && tipo != "Staff" && styles.linhaOrdenaElemento
        }`}
      >

        <OpcaoOrdenacao nome="Nome" ordenacao={ordenacao} onClick={() => alteraOrdem("nome")}/>

        {tipo != "Elemento" && (
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
      </div>
    </div>
  );
};

export default LinhaOrdenacao;
