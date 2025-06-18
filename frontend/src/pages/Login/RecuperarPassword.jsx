import React from "react";
import styles from "./RecuperarPassword.module.css";
import PainelSuperiorRecuperacao from "../../components/PainelSuperiorRecuperacao";
import { useState } from "react";
import { Link } from "react-router-dom";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="overlay">
      <div id="box-Login">
        <PainelSuperiorRecuperacao
          caminho="/login"
          titulo="Recuperação Password"
        />
        <br />
        <p className={styles.info}>Introduza o seu email</p>
        <form className={styles.formRecuperar}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            required
          />
          <button type="submit">Enviar</button>
        </form>
        <Link to={"/login"} className={styles.voltarAtras}>
            Voltar Atrás
        </Link>
      </div>
    </div>
  );
};

export default RecuperarPassword;
