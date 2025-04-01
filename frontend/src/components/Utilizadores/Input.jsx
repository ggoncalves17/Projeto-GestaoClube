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
        />
      </div>
    );
  };
    
export default Input;
