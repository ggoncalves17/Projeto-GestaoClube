import React, { useState } from 'react'
import styles from './Dropdown.module.css'

const Dropdown = ({ tipo, setTipo, dados }) => {

  return (
    <div className={styles.caixaFiltro}>

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="" disabled>Tipo</option>
            {dados.map((tipo, index) => <option key={index} value={tipo}>{tipo}</option>)}
        </select>
    </div>
  )
}

export default Dropdown