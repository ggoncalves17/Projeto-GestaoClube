import styles from "../../../components/LinhaUtilizador.module.css";
import BotaoInfoEditar from "../../../components/BotaoInfoEditar";
import { useState } from "react";

const LinhaQuota = ({ quota, setQuotas, setModo, setQuotaEscolhida }) => {
  const estado = {
    0: "Pendente",
    1: "Pago",
    2: "Atrasado",
  };

  const estadoQuotas = estado[quota.estado];

  const handleRegistaPagamento = () => {
    setModo("Registar");
    setQuotaEscolhida((prev) => ({
      ...quota,
      pagamento: prev.pagamento,
    }));
  };

  const disabled = quota.estado == 1 ? true : false

  return (
    <div className={styles.contentor}>
      <div className={styles.linhaQuota}>
        <span className={styles.nome}>{quota.nome_utilizador}</span>
        <span className={styles.nome}>{quota.tipo_quota}</span>
        <span className={styles.nome}>
          {new Date(quota.prazo_pagamento).toLocaleDateString()}
        </span>
        <span className={styles.nome}>{quota.valor.toFixed(2)}€</span>
        <span
          className={
            estadoQuotas == "Pago"
              ? styles.Ativo
              : estadoQuotas == "Atrasado"
              ? styles.Inativo
              : styles.Pendente
          }
        >
          {estadoQuotas}
        </span>
        <span className={styles.nome}>
          {quota.data_pagamento
            ? new Date(quota.data_pagamento).toLocaleDateString()
            : "-"}
        </span>
      </div>

      <button onClick={handleRegistaPagamento} className={styles.btnRegista} disabled={disabled}>
        Registar Pagamento
      </button>
    </div>
  );
};

export default LinhaQuota;
