import React from "react";
import styles from "./Dashboard.module.css";
import CardDashboard from "../../components/CardsDashboard/CardDashboard";
import CardEventosDashboard from "../../components/CardsDashboard/CardEventosDashboard";
import { useLoaderData, redirect } from "react-router-dom";
import axios from "axios";

const estatisticasLoader = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/estatisticas/", {
      withCredentials: true,
    });
    return res.data; 
  } 
  catch (err) {
    if (err.response.status === 403) {
      return redirect("/login");
    }
  }
};

const Dashboard = () => {
  const estatisticas = useLoaderData();  

  // Referência -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
  const data = new Date();
  const mes = data.toLocaleString('pt-PT', { month: "long" })
  const mesFormatado = mes.charAt(0).toUpperCase() + mes.slice(1);

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <p className={styles.titulo}>Dashboard</p>
        <div className={styles.painelSuperior}>
          <CardDashboard tituloCard="Jogadores Ativos" valor={estatisticas.Jogadores}/>
          <CardDashboard tituloCard="Equipas" valor={estatisticas.Equipas}/>
          <CardDashboard tituloCard="Staff" valor={estatisticas.Staff}/>
          <CardDashboard tituloCard="Sócios Ativos" valor={estatisticas.Socios}/>
        </div>
        <div className={styles.painelInferior}>
          <CardEventosDashboard tituloCard="Próximos Eventos" valor={estatisticas.Eventos} mes={mesFormatado}/>
          <CardEventosDashboard tituloCard="Próximos Jogos" valor={estatisticas.Jogos} mes={mesFormatado}/>
        </div>
      </div>
    </div>
  );
};

export { Dashboard as default, estatisticasLoader };
