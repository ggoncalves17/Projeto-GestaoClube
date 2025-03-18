import React from "react";
import LogoCoja from "../../assets/LogoCoja.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div id={styles.navbar}>
      <img id={styles.logo} src={LogoCoja} alt="LogoClube" />
      Clube Operário Jardim do Alva
    </div>
  );
};

export default Navbar;
