import React, { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  redirect,
  useNavigate,
  useLocation,
  NavLink,
} from "react-router-dom";
import styles from "./Modalidades.module.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import axios from "axios";
import Dropdown from "../../components/Dropdown";

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

  const todasEpocasExistentes = ["Todas", ...new Set((infoModalidade.epoca_set).map((epoca) => epoca.nome).sort().reverse())]

  const [epocasExistentes, setEpocasExistentes] = useState(todasEpocasExistentes);
  const [modo, setModo] = useState(null);
  
  const localizacao = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setFiltroCategoria("");
    setFiltroEpoca("")
  }, [localizacao.pathname]);

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <div className={styles.painelSuperiorDetalhes}>
          <div
            className={styles.voltarAtras}
            onClick={() => navigate("/modalidades")}
          >
            <MdOutlineArrowBackIosNew />
            <p>Voltar Atrás</p>
          </div>
          <hr />
          <div className={styles.tituloModalidade}>
            <h1>{infoModalidade.nome}</h1>
          </div>
        </div>
        <div className={styles.painelInferiorDetalhes}>
          <div className={styles.painelOpcoes}>
            <div className={styles.opcoes}>
              <NavLink
                to="equipas"
                className={({ isActive }) =>
                  `${styles.opcao} ${
                    isActive ? styles.opcaoAtiva : styles.opcaoInativa
                  }`
                }
              >
                Equipas
              </NavLink>

              <NavLink
                to="epocas"
                className={({ isActive }) =>
                  `${styles.opcao} ${
                    isActive ? styles.opcaoAtiva : styles.opcaoInativa
                  }`
                }
              >
                Épocas
              </NavLink>
            </div>

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
              <button
                onClick={() => setModo("Adicionar")}
                className={styles.botaoAdicionar}
              >
                + Adicionar {localizacao.pathname.endsWith("equipas") ? "Equipa" : "Época"}
              </button>
            </div>
          </div>
          <hr />
          <div className={styles.conteudo}>
            <Outlet context={{ filtroCategoria, setEpocasExistentes, filtroEpoca, modo, setModo, infoModalidade }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DetalhesModalidades as default, modalidadeLoader };
