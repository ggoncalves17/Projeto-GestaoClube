import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { UtilizadorContext } from "../../context/UtilizadorContext";

const Navbar = () => {

  const { utilizador } = useContext(UtilizadorContext)

  console.log("UTILIZADOR AUTENTICADO: ", utilizador);
  

  return (
    <div id={styles.navbar}>
      <img id={styles.logo} src={`/Fotos-Clube/${utilizador.foto_clube}`} alt="LogoClube" />
        {utilizador.nome_clube}    
    </div>
  );
};

export default Navbar;
