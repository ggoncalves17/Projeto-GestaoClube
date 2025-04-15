import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ListaUtilizadores from "../../../components/ListaUtilizadores";
import SearchBar from "../../../components/SearchBar";
import Painel from "../../../components/Utilizadores/Painel";
import styles from "../UtilizadoresGerais/UtilizadoresGerais.module.css";
import { UtilizadorContext } from "../../../context/UtilizadorContext";

const Staff = () => {
  const [filtroNome, setfiltroNome] = useState("");
  const [staff, setStaff] = useState([]);
  const [modo, setModo] = useState(null)
  const [utilizador, setUtilizador] = useState(null)
  const { utilizador: utilizadorInfo } = useContext(UtilizadorContext)
  
  useEffect(() => {
    if(modo === "Adicionar") {
      setUtilizador(-1)
    }
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
  }, [modo]);

  const staffFiltrado = staff.filter((utilizador) => 
    utilizador.nome.toLowerCase().includes(filtroNome.toLowerCase()) 
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
          <ListaUtilizadores utilizadoresFiltrados={staffFiltrado} setModo={setModo} setUtilizador={setUtilizador}/>
        </div>
      </div>

      {(modo === "Adicionar" || modo === "Editar" || modo === "Detalhes") && 
        <Painel modo={modo} tipo="Gestor" setModo={setModo} setStaff={setStaff} utilizador={utilizador}/>  
      }
    </div>
  );
};

export default Staff;
