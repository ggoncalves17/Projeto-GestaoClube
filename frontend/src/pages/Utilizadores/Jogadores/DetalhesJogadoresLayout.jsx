import React, { useEffect, useState } from "react";
import {
  useLocation,
  useLoaderData,
  redirect,
  useNavigate,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import styles from "./DetalhesJogadores.module.css";
import OpcoesLink from "../../../components/OpcoesLink";
import BotaoAdicionar from "../../../components/BotaoAdicionar";

const jogadorLoader = async ({ params }) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/info-jogador/${params.id}/`,
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

const DetalhesJogadoresLayout = () => {
  const navigate = useNavigate();

  const infoJogador = useLoaderData();
  const [modo, setModo] = useState(null);

  const opcoesLink = [
    { conteudo: "Dados Pessoais", caminho: "dados" },
    { conteudo: "Equipas", caminho: "equipas" },
    { conteudo: "Inscrições", caminho: "inscricoes" },
  ];

  const localizacao = useLocation();

  const titulo = localizacao.pathname.endsWith("inscricoes") && "Inscrição";

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <div className={styles.painelSuperior}>
          <div
            className={styles.voltarAtras}
            onClick={() => navigate("/utilizadores/jogadores")}
          >
            <MdOutlineArrowBackIosNew />
            <p>Voltar Atrás</p>
          </div>
          <hr />
          <div className={styles.header}>
            <div className={styles.foto}>
              <img
                src={`/Fotos-Jogadores/${infoJogador.foto}`}
                alt="FotoJogador"
                className={styles.fotoJogador}
              />
            </div>
            <div className={styles.infoBasica}>
              <div className={styles.nomeJogador}>
                <h3>{infoJogador.nome}</h3>
                <div className={styles.modoDetalhes}>
                  {infoJogador.tipo === "Jogador" ? (
                    <p>Jogador</p>
                  ) : (
                    <p>Treinador</p>
                  )}
                </div>
              </div>
              <div className={styles.nomeClube}>
                <img
                  className={styles.fotoClube}
                  src={`/Fotos-Clube/${infoJogador.clube.foto}`}
                  alt="LogoClube"
                />
                {infoJogador.clube.nome}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.painelInferior}>
          <div className={styles.painelOpcoes}>
            <OpcoesLink opcoes={opcoesLink} />

            {localizacao.pathname.endsWith("inscricoes") && (
              <div className={styles.painelBotoes}>
                <BotaoAdicionar
                  titulo={titulo}
                  onClick={() => setModo("Adicionar")}
                />
              </div>
            )}
          </div>
          <Outlet
            context={{
              infoJogador,
              modo,
              setModo,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { DetalhesJogadoresLayout as default, jogadorLoader };
