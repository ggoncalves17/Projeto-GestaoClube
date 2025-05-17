import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ListaUtilizadores from "../../../components/ListaUtilizadores";
import SearchBar from "../../../components/SearchBar";
import Painel from "../../../components/Utilizadores/Painel";
import styles from "../UtilizadoresGerais/UtilizadoresGerais.module.css";
import Paginacao from "../../../components/Paginacao/Paginacao";
import FormularioStaff from "../../../components/Utilizadores/FormularioStaff";
import BotaoAdicionar from "../../../components/BotaoAdicionar";
import Spinner from "../../../components/Spinner";
import { listaStaff } from "../../../api/Utilizadores/api";
import { ordenaUtilizadores } from "../../../utils/ordenacaoUtilizadores";

const Staff = () => {
  const [filtroNome, setfiltroNome] = useState("");
  const [staff, setStaff] = useState([]);
  const [modo, setModo] = useState(null);
  const [utilizador, setUtilizador] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [utilizadoresPagina, setUtilizadoresPagina] = useState(6);
  const [loading, setLoading] = useState(true);
  const [ordenacao, setOrdenacao] = useState();

  useEffect(() => {
    if (modo === "Adicionar") {
      setUtilizador(-1);
    }
    listaStaff(setStaff, setLoading);
  }, [modo]);

  const staffFiltrado = staff.filter((utilizador) =>
    utilizador.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  const utilizadoresOrdenados = ordenaUtilizadores(staffFiltrado, ordenacao)

  const indiceUltimoUtilizador = paginaAtual * utilizadoresPagina;
  const indicePrimeiroUtilizador = indiceUltimoUtilizador - utilizadoresPagina;
  const utilizadoresAtuais = utilizadoresOrdenados.slice(
    indicePrimeiroUtilizador,
    indiceUltimoUtilizador
  );

  return (
    <div
      className={`${styles.estrutura} ${
        modo == null && styles.estruturaOverflow
      }`}
    >
      <div className={styles.painel}>
        <p className={styles.titulo}>Staff</p>
        <div className={styles.painelSuperior}>
          <div className={styles.painelSuperiorFiltros}>
            <SearchBar filtro={filtroNome} setFiltro={setfiltroNome} />
          </div>
          <div className={styles.painelSuperiorAdicionar}>
            <BotaoAdicionar
              titulo={"Utilizador"}
              onClick={() => setModo("Adicionar")}
            />
          </div>
        </div>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <div className={styles.painelInferior}>
              <ListaUtilizadores
                utilizadoresFiltrados={utilizadoresAtuais}
                setModo={setModo}
                setUtilizador={setUtilizador}
                tipo="Staff"
                ordenacao={ordenacao}
                setOrdenacao={setOrdenacao}
              />
            </div>
            <Paginacao
              totalUtilizadores={staffFiltrado.length}
              utilizadoresPagina={utilizadoresPagina}
              paginaAtual={paginaAtual}
              setPaginaAtual={setPaginaAtual}
            />
          </>
        )}
      </div>

      {(modo === "Adicionar" || modo === "Editar" || modo === "Detalhes") && (
        <Painel modo={modo} tipo="Gestor" setModo={setModo}>
          <FormularioStaff
            setModo={setModo}
            tipo="Gestor"
            modo={modo}
            setStaff={setStaff}
            utilizador={utilizador}
          />
        </Painel>
      )}
    </div>
  );
};

export default Staff;
