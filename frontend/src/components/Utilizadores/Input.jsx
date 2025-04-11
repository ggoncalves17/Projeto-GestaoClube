import React from "react";
import styles from "./Formulario.module.css";

const Input = ({label, tipo="text", id, placeholder, valor, onChange, erro, disabled, required}) => {
    return (
      <div className={styles.campo}>
        <label htmlFor={id}>{label}</label>
        {erro && <p className={styles.erro}>{erro}</p>}
        <input 
          type={tipo}
          id={id}
          placeholder={placeholder}
          value={valor}
          onChange={onChange}
          disabled={disabled}
          required={required}

          // Referência -> https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today
          max={tipo === "date" ? new Date().toISOString().split("T")[0] : ""}
        />
      </div>
    );
  };
    
export default Input;
