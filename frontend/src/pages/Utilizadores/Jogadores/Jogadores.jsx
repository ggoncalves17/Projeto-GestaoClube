import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ListaUtilizadores from "../../../components/ListaUtilizadores";
import SearchBar from "../../../components/SearchBar";
import Painel from "../../../components/Utilizadores/Painel";
import styles from "../UtilizadoresGerais/UtilizadoresGerais.module.css";
import Paginacao from "../../../components/Paginacao/Paginacao";
import FormularioJogadores from "../../../components/Utilizadores/Jogadores/FormularioJogadores";
import GrupoRadioButton from "../../../components/GrupoRadioButton";
import Dropdown from "../../../components/Dropdown";
import DropdownCheckbox from "../../../components/DropdownCheckbox";
import { UtilizadorContext } from "../../../context/UtilizadorContext";
import { useNavigate } from "react-router-dom";
import { listaModalidades } from "../../../api/Modalidades/api";
import BotaoAdicionar from "../../../components/BotaoAdicionar";
import Spinner from "../../../components/Spinner";
import { listaElementos } from "../../../api/Utilizadores/api";
import { ordenaUtilizadores } from "../../../utils/ordenacaoUtilizadores";

const Jogadores = () => {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroDesporto, setFiltroDesporto] = useState([]);
  const [ordenacao, setOrdenacao] = useState();
  const tipos = ["Ambos", "Jogador", "Treinador"];
  const [desportos, setDesportos] = useState([]);
  const [jogadores, setJogadores] = useState([]);
  const [modo, setModo] = useState(null);
  // Id do Utilizador a Editar, ver Detalhes ou Remover
  const [idUtilizador, setIdUtilizador] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [utilizadoresPagina, setUtilizadoresPagina] = useState(6);
  const [estado, setEstado] = useState();
  const [loading, setLoading] = useState(true);

  const { utilizador: utilizadorInfo } = useContext(UtilizadorContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (modo === "Detalhes") {
      setModo(null);
      navigate(`/utilizadores/jogadores/${idUtilizador}`);
    }
  }, [modo]);

  useEffect(() => {
    switch (filtroEstado) {
      case "todos":
        setEstado(-1);
        break;
      case "ativos":
        setEstado(1);
        break;
      case "inativos":
        setEstado(0);
        break;
    }
  }, [filtroEstado]);

  // ALTERAR ESTA PARTE PARA NÃO SE TER DE ALTERAR COM O MODO (PASSAR DEPOIS NO EDITAR O SETJOGADORES E ALTERAR LÁ)
  useEffect(() => {
    if (modo === "Adicionar") {
      setIdUtilizador(-1);
    }
    listaElementos(setJogadores, setLoading);
  }, [modo]);

  // Função para ir buscar as modalidades ao carregar o componente
  useEffect(() => {
    listaModalidades(utilizadorInfo.id_clube, setDesportos, null, true);
  }, []);

  const jogadoresFiltrados = jogadores.filter(
    (utilizador) =>
      utilizador.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
      (estado === -1 ? true : utilizador.estado === estado) &&
      (filtroTipo === "Tipo" || filtroTipo === "Ambos" || filtroTipo === ""
        ? true
        : utilizador.tipo === filtroTipo) &&
      (filtroDesporto.length > 0
        ? filtroDesporto.includes(
            utilizador.modalidade ? utilizador.modalidade : ""
          )
        : true)
  );

  const utilizadoresOrdenados = ordenaUtilizadores(jogadoresFiltrados, ordenacao)

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
        <p className={styles.titulo}>Jogadores / Treinadores</p>
        <div className={styles.painelSuperior}>
          <div className={styles.painelSuperiorFiltros}>
            <SearchBar filtro={filtroNome} setFiltro={setFiltroNome} />
            <GrupoRadioButton
              filtro={filtroEstado}
              setFiltro={setFiltroEstado}
            />
            <Dropdown tipo={filtroTipo} setTipo={setFiltroTipo} dados={tipos} />
            <DropdownCheckbox
              opcoes={desportos}
              desportosSelecionados={filtroDesporto}
              setDesporto={setFiltroDesporto}
            />
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
                setUtilizador={setIdUtilizador}
                tipo="Elemento"
                ordenacao={ordenacao}
                setOrdenacao={setOrdenacao}
              />
            </div>
            <Paginacao
              totalUtilizadores={jogadoresFiltrados.length}
              utilizadoresPagina={utilizadoresPagina}
              paginaAtual={paginaAtual}
              setPaginaAtual={setPaginaAtual}
            />
          </>
        )}
      </div>

      {(modo === "Adicionar" || modo === "Editar") && (
        <Painel modo={modo} tipo="Elemento" setModo={setModo}>
          <FormularioJogadores
            setModo={setModo}
            tipo="Elemento"
            modo={modo}
            setStaff={setJogadores}
            utilizador={idUtilizador}
          />
        </Painel>
      )}
    </div>
  );
};

export default Jogadores;
