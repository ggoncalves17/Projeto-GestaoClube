import React, { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useParams,
  redirect,
  useLocation,
} from "react-router-dom";
import styles from "../Modalidades/Modalidades.module.css";
import axios from "axios";
import Dropdown from "../../components/Dropdown";
import BotaoVoltarAtras from "../../components/BotaoVoltarAtras";
import OpcoesLink from "../../components/OpcoesLink";
import BotaoAdicionar from "../../components/BotaoAdicionar";

const equipaLoader = async ({ params }) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/info-equipa/${params.id_equipa}/`,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    console.log("ERRO: ", err);

    if (err.response.status === 403) {
      return redirect("/login");
    } else if (err.response.status == 404) {
      return redirect("/*");
    }
  }
};

const DetalhesEquipaLayout = () => {
  const { id: id_modalidade } = useParams();
  const infoEquipa = useLoaderData();
  const [elementosEquipa, setElementosEquipa] = useState(infoEquipa.elemento_clube_set);

  const opcoesLink = [
    { conteudo: "Plantel", caminho: "plantel" },
    { conteudo: "Jogos", caminho: "jogos" },
    { conteudo: "Competições", caminho: "competicoes" },
  ];

  const estadosJogos = ["Todos", "Por Acontecer", "Finalizados"];
  const [filtroEstado, setFiltroEstado] = useState("");

  const localizacao = useLocation();
  const [modo, setModo] = useState(null);

  useEffect(() => {
    setFiltroEstado("");
  }, [localizacao.pathname]);

  const titulo = localizacao.pathname.endsWith("plantel")
    ? "Elementos"
    : localizacao.pathname.endsWith("jogos")
    ? "Jogo"
    : "Competição";

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <div className={styles.painelSuperiorDetalhes}>
          <BotaoVoltarAtras caminho={`/modalidades/${id_modalidade}`} />
          <hr />
          <div className={styles.painelInfo}>
            <h1>{infoEquipa.nome}</h1>
            <div className={styles.modalidade}>
              <p>{infoEquipa.modalidade}</p>
            </div>
            <div
              className={`${styles.categoria} ${
                infoEquipa.categoria == "Masculino"
                  ? styles.masculino
                  : styles.feminino
              }`}
            >
              <p>{infoEquipa.categoria}</p>
            </div>
            <div className={styles.epoca}>
              <p>{infoEquipa.epoca}</p>
            </div>
          </div>
        </div>
        <div className={styles.painelInferiorDetalhes}>
          <div className={styles.painelOpcoes}>
            <OpcoesLink opcoes={opcoesLink} />

            <div className={styles.painelBotoes}>
              {localizacao.pathname.endsWith("jogos") && (
                <>
                  <Dropdown
                    tipo={filtroEstado}
                    campo="Estado"
                    setTipo={setFiltroEstado}
                    dados={estadosJogos}
                  />
                </>
              )}
              <BotaoAdicionar
                titulo={titulo}
                onClick={() => setModo("Adicionar")}
              />
            </div>
          </div>

          <div className={styles.conteudo}>
            <Outlet
              context={{
                infoEquipa,
                modo,
                setModo,
                filtroEstado,
                elementosEquipa,
                setElementosEquipa
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DetalhesEquipaLayout as default, equipaLoader };
