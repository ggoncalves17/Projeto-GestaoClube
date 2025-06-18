import React from "react";
import styles from "../css/RadioButtonForm.module.css";

const RadioButtonForm = ({
  label,
  valor,
  opcoes = [],
  onChange,
  erro,
  required = true,
  disabled = false,
}) => {
  return (
    <div>
      <div className={styles.campo}>
        {erro && <p className={styles.erro}>{erro}</p>}

        <label>
          <b>{label}</b>
        </label>

        <div className={styles.grupoRadio}>
          {opcoes.map((opcao, index) => (
            <label key={index} className={styles.label}>
              <input
                type="radio"
                name={label}
                value={opcao}
                checked={valor === opcao}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={styles.radio}
              />
              {opcao}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioButtonForm;
