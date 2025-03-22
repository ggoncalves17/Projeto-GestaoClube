import React from 'react'
import styles from './CardDashboard.module.css'

const CardDashboard = ({ tituloCard, valor }) => {
  return (
    <div className={styles.card}>
        <p className={styles.titulo}>{tituloCard}</p>
        <div className={styles.valor}>{valor}</div>
    </div>
  )
}

export default CardDashboard