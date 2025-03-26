import React, { useEffect, useState, useRef } from "react";
import styles from "./Sidebar.module.css";
import { FaBars } from "react-icons/fa";
import Opcao from "./Opcao";
import OpcaoLogout from "./OpcaoLogout";
import OpcaoSubMenu from "./OpcaoSubMenu";

const Sidebar = () => {
  const [isExpandido, setIsExpandido] = useState(false);
  const [isUtilizadoresAberto, setIsUtilizadoresAberto] = useState(false);
  const [isClubeAberto, setIsClubeAberto] = useState(false);

  useEffect(() => {
    setIsUtilizadoresAberto(false)
  }, [isExpandido])

  const subOpcoesRef = useRef();
  const opcaoUtilizadoresRef = useRef();
  
  // Referência -> https://youtu.be/HfZ7pdhS43s?si=Zsk6ezhpNPU7fqUH
  useEffect(() => {
    const handler = (e) => {
      if (isUtilizadoresAberto && !isExpandido) {
        if(!subOpcoesRef.current.contains(e.target) && !opcaoUtilizadoresRef.current.contains(e.target)) {
          setIsUtilizadoresAberto(false);
        }
      }
    };
  
    document.addEventListener("mousedown", handler);
  
    return() => {
      document.removeEventListener("mousedown", handler);
    } 
  });
  

  const caminho = window.location.href.split("/")[3];  

  return (
    <div className={`${styles.menu} ${isExpandido ? styles.expandido : styles.contraido}`}    >
      <button className={styles.botaoAbreFecha} onClick={() => setIsExpandido(!isExpandido)}>
        <FaBars className={styles.iconBotao} />
      </button>

      <div className={styles.divTeste}>
        <ul className={styles.menuLista}>
          <Opcao isExpandido={isExpandido} conteudo="Dashboard" ativo={caminho === "dashboard" || caminho === ""} caminho="/"/>

          <div className={styles.divSubMenu} ref={opcaoUtilizadoresRef}>
            <Opcao isExpandido={isExpandido} conteudo="Utilizadores" ativo={caminho === "utilizadores"} caminho="/utilizadores" subOpcao={true} setSubOpcoes={setIsUtilizadoresAberto} subOpcaoAberto={isUtilizadoresAberto}/>
          </div>

          {(isUtilizadoresAberto && isExpandido) && (
            <ul className={styles.subMenu}>
              <OpcaoSubMenu conteudo="Utilizadores Site" ativo={caminho === "utilizadores"} caminho="/utilizadores"/>
              <OpcaoSubMenu conteudo="Elementos Clube" ativo={caminho === "utilizadores/staff"} caminho="/utilizadores"/>
              <OpcaoSubMenu conteudo="Jogadores" ativo={caminho === "utilizadores/jogadores"} caminho="/utilizadores"/>
            </ul>
          )}

          {(isUtilizadoresAberto && !isExpandido) && (
            <div className={styles.subOpcoesFechado} ref={subOpcoesRef}>
              <ul className={styles.subMenu}>
                <OpcaoSubMenu conteudo="Utilizadores Site" ativo={caminho === "utilizadores"} caminho="/utilizadores"/>
                <OpcaoSubMenu conteudo="Elementos Clube" ativo={caminho === "utilizadores/staff"} caminho="/utilizadores"/>
                <OpcaoSubMenu conteudo="Jogadores" ativo={caminho === "utilizadores/jogadores"} caminho="/utilizadores"/>
              </ul>
            </div>
          )}

          <Opcao isExpandido={isExpandido} conteudo="Clube" ativo={caminho === "clube"} caminho="/"/>
          <Opcao isExpandido={isExpandido} conteudo="Finanças" ativo={caminho === "financas"} caminho="/"/>
          <Opcao isExpandido={isExpandido} conteudo="Evento" ativo={caminho === "eventos"} caminho="/"/>
          <hr />
          <Opcao isExpandido={isExpandido} conteudo="Calendário" ativo={caminho === "calendario"} caminho="/"/>
        </ul>

        <ul>
          <Opcao isExpandido={isExpandido} conteudo="Perfil" ativo={caminho === "perfil"} caminho="/"/>
          <OpcaoLogout isExpandido={isExpandido} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
