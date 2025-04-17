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

const Jogadores = () => {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroDesporto, setFiltroDesporto] = useState([]);
  const tipos=["Ambos","Jogador","Treinador"]
  const [desportos, setDesportos] = useState([]);
  const [jogadores, setJogadores] = useState([]);
  const [modo, setModo] = useState(null)
  // Id do Utilizador a Editar, ver Detalhes ou Remover
  const [idUtilizador, setIdUtilizador] = useState(null)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [utilizadoresPagina, setUtilizadoresPagina] = useState(6)

  const [estado, setEstado] = useState();

  useEffect(() => {
      switch(filtroEstado) {
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
    }, [filtroEstado])


  useEffect(() => {
    if(modo === "Adicionar") {
      setIdUtilizador(-1)
    }
    axios
      .get("http://localhost:8000/api/listaJogadores/", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        setJogadores(res.data);
      })
      .catch((err) => {
        console.log("Mensagem do erro:", err.response.data.mensagem);
      });
  }, [modo]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/listaModalidades/", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        const nomesModalidades = res.data.map((elemento) => elemento.nome);
        setDesportos(nomesModalidades);
      })
      .catch((err) => {
        console.log("Mensagem do erro:", err.response.data.mensagem);
      });
  }, []);

  const jogadoresFiltrados = jogadores.filter((utilizador) => 
    (utilizador.nome.toLowerCase().includes(filtroNome.toLowerCase())) && (estado === -1 ? true : utilizador.estado === estado) && 
    ((filtroTipo === "Tipo" || filtroTipo === "Ambos" || filtroTipo === "") ? true : utilizador.tipo === filtroTipo) 
    && (filtroDesporto.length > 0 ? filtroDesporto.includes(utilizador.modalidade.nome) : true)
  )

  const indiceUltimoUtilizador = paginaAtual * utilizadoresPagina
  const indicePrimeiroUtilizador = indiceUltimoUtilizador - utilizadoresPagina
  const utilizadoresAtuais = jogadoresFiltrados.slice(indicePrimeiroUtilizador, indiceUltimoUtilizador)

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <p className={styles.titulo}>Jogadores / Treinadores</p>
        <div className={styles.painelSuperior}>
          <div className={styles.painelSuperiorFiltros}>
            <SearchBar filtro={filtroNome} setFiltro={setFiltroNome} />
            <GrupoRadioButton
              filtro={filtroEstado}
              setFiltro={setFiltroEstado}
            />
            <Dropdown tipo={filtroTipo} setTipo={setFiltroTipo} dados={tipos}/>
            <DropdownCheckbox
              opcoes={desportos}
              desportosSelecionados={filtroDesporto}
              setDesporto={setFiltroDesporto}
            />
          </div>
          <div className={styles.painelSuperiorAdicionar}>
            <button onClick={() => setModo("Adicionar")} className={styles.botaoAdicionar}>
              + Adicionar Utilizador
            </button>
          </div>
        </div>
        <div className={styles.painelInferior}>
          <ListaUtilizadores utilizadoresFiltrados={utilizadoresAtuais} setModo={setModo} setUtilizador={setIdUtilizador}/>
        </div>
        <Paginacao totalUtilizadores={jogadoresFiltrados.length} utilizadoresPagina={utilizadoresPagina} paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual}/>
      </div>

      {(modo === "Adicionar" || modo === "Editar" || modo === "Detalhes") && 
        <Painel modo={modo} tipo="Elemento" setModo={setModo} >
          <FormularioJogadores setModo={setModo} tipo="Elemento" modo={modo} setStaff={setJogadores} utilizador={idUtilizador} />
        </Painel>
      }
    </div>
  );
};

export default Jogadores;
