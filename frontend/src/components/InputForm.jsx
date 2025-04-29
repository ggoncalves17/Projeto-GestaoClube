import React from "react";
import styles from "../css/InputForm.module.css";

const InputForm = ({
  tipo = "text",
  label,
  valor,
  onChange,
  erro,
  placeholder,
  required = true,
}) => {
  return (
    <div>
      <div className={styles.campo}>
        {erro && <p className={styles.erro}>{erro}</p>}

        <label>
          <b>{label}</b>
        </label>
        <input
          type={tipo}
          value={valor}
          onChange={onChange}
          className={styles.inputCampo}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};

export default InputForm;
