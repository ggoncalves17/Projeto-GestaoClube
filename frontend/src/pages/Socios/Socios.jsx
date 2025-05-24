import { useEffect, useState } from "react";
import styles from "../../css/Socios.module.css";
import CardDadosSocios from "../../components/CardDadosSocios";
import SearchBar from "../../components/SearchBar";
import BotaoAdicionar from "../../components/BotaoAdicionar";
import Dropdown from "../../components/Dropdown";
import Spinner from "../../components/Spinner";
import ListaSocios from "./ListaSocios";
import { listaDisponivelSocios } from "../../api/Socios/api";
import { Link } from "react-router-dom";

const Socios = () => {
  const [socios, setSocios] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroEstadoQuotas, setFiltroEstadoQuotas] = useState("");
  const [loading, setLoading] = useState(true);
  const [ordenacao, setOrdenacao] = useState();

  useEffect(() => {
    listaDisponivelSocios(setSocios, setLoading);
  }, []);

  const estadoMap = {
    Ativo: 1,
    Inativo: 2,
  };

  const quotaEstadoMap = {
    "Em Dia": false,
    Atrasado: true,
  };

  const sociosFiltrados = socios.filter(
    (socio) =>
      socio.utilizador.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
      (filtroEstado == "" || filtroEstado == "Todos"
        ? true
        : socio.estado == estadoMap[filtroEstado]) &&
      (filtroEstadoQuotas == "" || filtroEstadoQuotas == "Todos"
        ? true
        : socio.quotas_atrasadas == quotaEstadoMap[filtroEstadoQuotas])
  );

  const nSociosAtivos = socios.filter((socio) => socio.estado == 1).length;
  const nSociosQuotasAtrasadas = socios.filter(
    (socio) => socio.quotas_atrasadas == true
  ).length;

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <p className={styles.titulo}>Sócios</p>
        <div className={styles.cards}>
          <CardDadosSocios tituloCard="Sócios Ativos" valor={nSociosAtivos} />
          <CardDadosSocios
            tituloCard="Sócios com Quotas em Atraso"
            valor={nSociosQuotasAtrasadas}
            atraso={true}
          />
        </div>
        <div className={styles.painelFiltrosBotao}>
          <div className={styles.painelSuperiorFiltros}>
            <SearchBar
              filtro={filtroNome}
              setFiltro={setFiltroNome}
              placeholder="sócio"
            />
            <Dropdown
              tipo={filtroEstado}
              setTipo={setFiltroEstado}
              dados={["Todos", "Ativo", "Inativo"]}
              campo="Estado Sócio"
            />
            <Dropdown
              tipo={filtroEstadoQuotas}
              setTipo={setFiltroEstadoQuotas}
              dados={["Todos", "Em Dia", "Atrasado"]}
              campo="Estado Quotas"
            />
          </div>
          <div className={styles.painelBotoes}>
            <Link to={`quotas/geral`} className={styles.botaoQuotas}>
              Ver Quotas
            </Link>
            <BotaoAdicionar
              titulo={"Sócio"}
              onClick={() => setModo("Adicionar")}
            />
          </div>
        </div>
        <div className={styles.painelInferior}>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <ListaSocios
              sociosFiltrados={sociosFiltrados}
              ordenacao={ordenacao}
              setOrdenacao={setOrdenacao}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Socios;
