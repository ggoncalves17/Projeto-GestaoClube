import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData, redirect, useLocation } from "react-router-dom";
import styles from "../Modalidades/Modalidades.module.css";
import OpcoesLink from "../../components/OpcoesLink";

const LayoutQuotas = () => {
  const localizacao = useLocation();

  const opcoesLink = [
    { conteudo: "Geral", caminho: "geral" },
    { conteudo: "Categorias", caminho: "categorias" },
  ];

  const titulo = localizacao.pathname.endsWith("")
    ? "Geral"
    : "Categorias";

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <div className={styles.painelSuperiorDetalhes}>
          <div className={styles.tituloModalidade}>
            <h1>Quotas</h1>
          </div>
        </div>
        <div className={styles.painelInferiorDetalhes}>
          <div className={styles.painelOpcoes}>
            <OpcoesLink opcoes={opcoesLink} />
          </div>

          <div className={styles.conteudo}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export { LayoutQuotas as default };
