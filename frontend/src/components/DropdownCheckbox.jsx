import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const DropdownCheckbox = ({ opcoes, desportosSelecionados, setDesporto }) => {
  const [aberto, setAberto] = useState(false);
  const opcoesCheckbox = useRef();
  const filtro = useRef();

   useEffect(() => {
      const handler = (e) => {
        if(aberto && opcoes.length > 0) {
          if(!opcoesCheckbox.current.contains(e.target) && !filtro.current.contains(e.target)) {
            setAberto(false);
          }
        }
      };
    
      document.addEventListener("mousedown", handler);
    
      return() => {
        document.removeEventListener("mousedown", handler);
      } 
    }); 
  
  const selecionaOpcao = (opcao) => {
    if (desportosSelecionados.includes(opcao)) {
      setDesporto(desportosSelecionados.filter(item => item !== opcao));
    } 
    else {
      setDesporto([...desportosSelecionados, opcao]);
    }
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownTexto} onClick={() => setAberto(!aberto)} ref={filtro}>
        <p>Filtrar por </p>
        {aberto ? <FaChevronUp/> : <FaChevronDown />}
        
      </div>

      {(aberto && opcoes.length > 0) && (
        <div className={styles.dropdownConteudo} ref={opcoesCheckbox}>
          {opcoes.map((desporto, index) => (
            <label key={index} className={styles.opcao}>
              <input
                type="checkbox"
                checked={desportosSelecionados.includes(desporto)}
                onChange={() => selecionaOpcao(desporto)}
              />
              {desporto}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
