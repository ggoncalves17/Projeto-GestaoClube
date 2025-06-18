import React, { useState } from 'react'
import styles from './Dropdown.module.css'

const Dropdown = ({ tipo, setTipo, campo="tipo", dados, dadosFormulario, jogador=false }) => {

  return (
    <div className={!jogador ? styles.caixaFiltro : styles.caixaFiltroJogador }>
        <select value={tipo} onChange={!jogador ? (e) => setTipo(e.target.value) : (e) => setTipo({...dadosFormulario, [campo]: e.target.value})}>
            <option value="" disabled>{campo.charAt(0).toUpperCase() + campo.slice(1)}</option>
            {dados.map((tipoDados, index) => <option key={index} value={tipoDados}>{tipoDados}</option>)}
        </select>
    </div>
  )
}

export default Dropdown