import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData, redirect, useLocation } from "react-router-dom";
import styles from "../../css/LayoutQuotas.module.css";
import OpcoesLink from "../../components/OpcoesLink";
import CardDadosSocios from "../../components/CardDadosSocios";

const LayoutQuotas = () => {
  const localizacao = useLocation();

  const opcoesLink = [
    { conteudo: "Geral", caminho: "geral" },
    { conteudo: "Categorias", caminho: "categorias" },
  ];

  const titulo = localizacao.pathname.endsWith("geral")
    ? "Geral"
    : "Categorias";

  const [dados, setDados] = useState({
    pago : 0,
    atrasado : 0,
  });

  const valorTotal = (parseFloat(dados.pago) + parseFloat(dados.atrasado) ).toFixed(2) 
  
  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <div className={styles.painelSuperiorDetalhes}>
          <div className={styles.tituloModalidade}>
            <h1>Quotas</h1>
          </div>

          {titulo == "Geral" && (
            <div className={styles.cards}>
              <div>
                <h2>
                  <u>Todas</u>
                </h2>
                {/* <h2>x</h2> */}
              </div>

              <CardDadosSocios
                tituloCard="Total de Quotas"
                valor={`${valorTotal}€`}
              />
              <CardDadosSocios
                tituloCard="Quotas Pagas"
                valor={`${dados.pago}€`}
                pago={true}
              />
              <CardDadosSocios
                tituloCard="Quotas Falta"
                valor={`${dados.atrasado}€`}
                atraso={true}
              />
            </div>
          )}
        </div>
        <div className={styles.painelInferiorDetalhes}>
          <div className={styles.painelOpcoes}>
            <OpcoesLink opcoes={opcoesLink} />
          </div>

          <div className={styles.conteudo}>
            <Outlet
              context={{
                setDados,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { LayoutQuotas as default };
