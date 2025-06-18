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
  disabled = false
}) => {
  return (
    <div>
      <div className={styles.campo}>
        {erro && <p className={styles.erro}>{erro}</p>}

        <label>
          <b>{label}</b>
        </label>

        {tipo === "file" ? (
          <input
            type="file"
            accept="application/pdf"
            onChange={onChange}
            className={styles.inputCampo}
            required={required}
            disabled={disabled}
          />
        ) : (
          <input
            type={tipo}
            value={valor}
            onChange={onChange}
            className={styles.inputCampo}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

export default InputForm;
