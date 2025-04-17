import React, { useState } from 'react'
import styles from './Dropdown.module.css'

const Dropdown = ({ tipo, setTipo, dados, dadosFormulario, jogador=false }) => {

  return (
    <div className={!jogador ? styles.caixaFiltro : styles.caixaFiltroJogador }>
        <select value={tipo} onChange={!jogador ? (e) => setTipo(e.target.value) : (e) => setTipo({...dadosFormulario, tipo: e.target.value})}>
            <option value="" disabled>Tipo</option>
            {dados.map((tipoDados, index) => <option key={index} value={tipoDados}>{tipoDados}</option>)}
        </select>
    </div>
  )
}

export default Dropdown