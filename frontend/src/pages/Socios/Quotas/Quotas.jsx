import React, { useEffect, useState } from "react";
import styles from "../../../css/Categorias.module.css";
import Spinner from "../../../components/Spinner";
import PainelBotoesQuotas from "./PainelBotoesQuotas";
import ListaQuotas from "./ListaQuotas";
import { listaQuotas } from "../../../api/Socios/api";
import { useOutletContext } from "react-router-dom";
import Modal from "../../../components/JanelaModal/Modal";
import SelectForm from "../../../components/SelectForm";
import { registaPagamentoQuota } from "../../../api/Socios/api";

const Quotas = () => {
  const { setDados } = useOutletContext();

  const [loading, setLoading] = useState(true);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroMes, setFiltroMes] = useState("Todos");
  const [modo, setModo] = useState(null);
  const [quotas, setQuotas] = useState([]);
  const [quotaEscolhida, setQuotaEscolhida] = useState({ pagamento: "" });

  useEffect(() => {
    listaQuotas(setQuotas, setLoading);
  }, []);

  useEffect(() => {
    let pago = 0,
      atrasado = 0;

    quotas.map((quota) => {
      quota.estado == 1 ? (pago += quota.valor) : (atrasado += quota.valor);
    });

    setDados({
      pago: pago.toFixed(2),
      atrasado: atrasado.toFixed(2),
    });
  }, [quotas]);

  const handleRegistaPagamento = (event) => {
    event.preventDefault();

    registaPagamentoQuota(
      quotaEscolhida.id,
      quotaEscolhida.pagamento,
      setQuotas,
      setModo
    );
  };

  const estadoMap = {
    Pago: 1,
    Atrasado: 2,
    Pendente: 0,
  };

  const quotasFiltradas = quotas.filter(
    (quota) =>
      quota.nome_utilizador.toLowerCase().includes(filtroNome.toLowerCase()) &&
      (filtroEstado == "" || filtroEstado == "Todos"
        ? true
        : quota.estado == estadoMap[filtroEstado]) &&
      (filtroTipo == "" || filtroTipo == "Todos"
        ? true
        : quota.tipo_quota == filtroTipo) &&
      (filtroMes == "" || filtroMes == "Todos"
        ? true
        : quota.mes == filtroMes)
  );

  const filtros = {
    nome: filtroNome,
    setNome: setFiltroNome,
    estado: filtroEstado,
    setEstado: setFiltroEstado,
    tipo: filtroTipo,
    setTipo: setFiltroTipo,
    mes: filtroMes,
    setMes: setFiltroMes,
  };

  return (
    <div>
      <PainelBotoesQuotas filtros={filtros} />
      <div className={styles.painelInferior}>
        {loading ? (
          <Spinner />
        ) : (
          <ListaQuotas
            quotas={quotasFiltradas}
            setQuotas={setQuotas}
            ordenacao={null}
            setOrdenacao={null}
            setModo={setModo}
            setQuotaEscolhida={setQuotaEscolhida}
          />
        )}
      </div>

      {modo && (
        <Modal
          setModal={setModo}
          titulo={`${modo} Pagamento`}
          botao="Registar"
          onSubmit={handleRegistaPagamento}
        >
          {quotaEscolhida && (
            <p className={styles.infoQuota}>
              {`${quotaEscolhida.nome_utilizador} | Nº Sócio ${
                quotaEscolhida.n_socio
              } | ${
                quotaEscolhida.tipo_quota === "Inscrição"
                  ? "Inscrição"
                  : `Quota ${
                      quotaEscolhida.tipo_quota === "Mensal" &&
                      quotaEscolhida.mes
                    } de ${quotaEscolhida.ano}`
              }`}
            </p>
          )}
          <hr />

          <SelectForm
            label="Método Pagamento"
            valor={quotaEscolhida.pagamento}
            onChange={(e) =>
              setQuotaEscolhida((prev) => ({
                ...prev,
                pagamento: e.target.value,
              }))
            }
            opcoes={[
              "Dinheiro",
              "MBWay",
              "Multibanco",
              "Transferência Bancária",
            ]}
          />
        </Modal>
      )}
    </div>
  );
};

export default Quotas;
