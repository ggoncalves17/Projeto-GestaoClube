import React from "react";
import styles from "./Dashboard.module.css";
import CardDashboard from "../../components/CardDashboard/CardDashboard";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const estatisticasLoader = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/estatisticas/", {
      withCredentials: true,
    });
    return res.data; 
  } 
  catch (err) {
    console.error(err);
    throw err; 
  }
};

const Dashboard = () => {
  const estatisticas = useLoaderData();

  console.log(estatisticas);
  

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
        <div className={styles.painelInferior}>Teste</div>
      </div>
    </div>
  );
};

export { Dashboard as default, estatisticasLoader };
