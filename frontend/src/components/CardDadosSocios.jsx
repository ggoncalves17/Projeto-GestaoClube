import React from 'react'
import styles from '../css/CardDadosSocios.module.css'

const CardDadosSocios = ({ tituloCard, valor, atraso = false, pago = false }) => {
  return (
    <div className={styles.card}>
        <p className={styles.titulo}>{tituloCard}</p>
        <div className={`${styles.valor} ${atraso && styles.valorAtraso} ${pago && styles.valorPago}`}>{valor}</div>
    </div>
  )
}

export default CardDadosSocios