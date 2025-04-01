import axios from "axios";
import React, { useEffect, useState } from "react";
import ListaUtilizadores from "../../../components/ListaUtilizadores";
import SearchBar from "../../../components/SearchBar";
import Painel from "../../../components/Utilizadores/Painel";
import styles from "../UtilizadoresGerais/UtilizadoresGerais.module.css";

const Staff = () => {
  const [filtroNome, setfiltroNome] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [staff, setStaff] = useState([]);
  const [estado, setEstado] = useState();
  const [modo, setModo] = useState(null)

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
    axios
      .get("http://localhost:8000/api/listaStaff/", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        setStaff(res.data);
      })
      .catch((err) => {
        console.log("Mensagem do erro:", err.response.data.mensagem);
      });
  }, []);

  const staffFiltrado = staff.filter((utilizador) => 
    utilizador.nome.toLowerCase().includes(filtroNome.toLowerCase()) && (estado === -1 ? true : utilizador.estado === estado)    
  )

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <p className={styles.titulo}>Staff</p>
        <div className={styles.painelSuperior}>
          <div className={styles.painelSuperiorFiltros}>
            <SearchBar filtro={filtroNome} setFiltro={setfiltroNome} />
          </div>
          <div className={styles.painelSuperiorAdicionar}>
            <button onClick={() => setModo("Adicionar")} className={styles.botaoAdicionar}>
              + Adicionar Utilizador
            </button>
          </div>
        </div>
        <div className={styles.painelInferior}>
          <ListaUtilizadores utilizadoresFiltrados={staffFiltrado}/>
        </div>
      </div>

      {modo != null && 
        <Painel modo={modo} utilizador="Gestor" setModo={setModo} />  
      }
    </div>
  );
};

export default Staff;
