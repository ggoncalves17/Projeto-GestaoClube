import React from "react";
import styles from "../css/InputForm.module.css";

const SelectForm = ({
  label,
  valor,
  onChange,
  erro,
  opcoes = [],
  required = true,
}) => {
  return (
    <div>
      <div className={styles.campo}>
        {erro && <p className={styles.erro}>{erro}</p>}

        <label>
          <b>{label}</b>
        </label>
        <select
          value={valor}
          onChange={onChange}
          className={styles.inputCampo}
          required={required}
        >
          <option value="" disabled>
            Selecione a {label}
          </option>
          {opcoes.map((opcao, i) => (
            <option key={i} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectForm;
