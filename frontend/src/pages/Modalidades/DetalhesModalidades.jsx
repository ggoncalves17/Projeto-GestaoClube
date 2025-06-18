import React, { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  redirect,
  useLocation,
} from "react-router-dom";
import styles from "./Modalidades.module.css";
import axios from "axios";
import Dropdown from "../../components/Dropdown";
import BotaoVoltarAtras from "../../components/BotaoVoltarAtras";
import OpcoesLink from "../../components/OpcoesLink";
import BotaoAdicionar from "../../components/BotaoAdicionar";

const modalidadeLoader = async ({ params }) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/info-modalidade/${params.id}/`,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err) {
    if (err.response.status === 403) {
      return redirect("/login");
    } else if (err.response.status == 404) {
      return redirect("/*");
    }
  }
};

const DetalhesModalidades = () => {
  const infoModalidade = useLoaderData();
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const categorias = ["Ambos", "Masculino", "Feminino"];
  const [filtroEpoca, setFiltroEpoca] = useState("");

  const todasEpocasExistentes = [
    "Todas",
    ...new Set(
      infoModalidade.epoca_set
        .map((epoca) => epoca.nome)
        .sort()
        .reverse()
    ),
  ];

  const [epocasExistentes, setEpocasExistentes] = useState(
    todasEpocasExistentes
  );
  const [modo, setModo] = useState(null);

  const localizacao = useLocation();

  useEffect(() => {
    setFiltroCategoria("");
    setFiltroEpoca("");
  }, [localizacao.pathname]);

  // Todas as opções que ficarão no painel dos detalhes da modalidade 
  const opcoesLink = [
    { conteudo: "Equipas", caminho: "equipas"},
    { conteudo: "Épocas", caminho: "epocas"},
  ]

  const titulo = localizacao.pathname.endsWith("equipas") ? "Equipa" : "Época"

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <div className={styles.painelSuperiorDetalhes}>
          <BotaoVoltarAtras caminho="/modalidades" />
          <hr />
          <div className={styles.tituloModalidade}>
            <h1>{infoModalidade.nome}</h1>
          </div>
        </div>
        <div className={styles.painelInferiorDetalhes}>
        
          <div className={styles.painelOpcoes}>

            <OpcoesLink opcoes={opcoesLink}/>

            <div className={styles.painelBotoes}>
              {localizacao.pathname.endsWith("equipas") && (
                <>
                  <Dropdown
                    tipo={filtroCategoria}
                    campo="Categoria"
                    setTipo={setFiltroCategoria}
                    dados={categorias}
                  />

                  <Dropdown
                    tipo={filtroEpoca}
                    campo="Época"
                    setTipo={setFiltroEpoca}
                    dados={epocasExistentes}
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
                filtroCategoria,
                setEpocasExistentes,
                filtroEpoca,
                modo,
                setModo,
                infoModalidade,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DetalhesModalidades as default, modalidadeLoader };
