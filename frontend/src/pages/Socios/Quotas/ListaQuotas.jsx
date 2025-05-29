import LinhaOrdenacao from "../../../components/LinhaOrdenacao";
import styles from "../../../components/ListaUtilizadores.module.css";
import LinhaQuota from "./LinhaQuota";

const ListaQuotas = ({
  quotas,
  setQuotas,
  ordenacao,
  setOrdenacao,
  setModo,
  setQuotaEscolhida,
}) => {
  return (
    <>
      {quotas.length > 0 ? (
        <>
          <LinhaOrdenacao
            tipo="Quotas"
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
          />

          {quotas.map((quota) => (
            <LinhaQuota
              key={quota.id}
              quota={quota}
              setQuotas={setQuotas}
              setModo={setModo}
              setQuotaEscolhida={setQuotaEscolhida}
            />
          ))}
        </>
      ) : (
        <p className={styles.info}>Não foi encontrada qualquer quota!</p>
      )}
    </>
  );
};

export default ListaQuotas;
