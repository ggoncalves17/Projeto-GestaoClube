import React from 'react'
import styles from './CardEventosDashboard.module.css'

const CardEventosDashboard = ({ tituloCard, valor, mes }) => {

  //TODO: - FAZER UM NOVO COMPONENTE PARA APRESENTAR OS JOGOS/EVENTOS E COLOCAR O BOTÃO

  return (
    <div className={styles.card}>
        <p className={styles.titulo}>{tituloCard}</p>
        <p className={styles.mes}>({mes})</p>
        {valor === 0 ? <p className={styles.semValor}>Não existe qualquer agendamento.</p> : <div className={styles.valor}>{valor}</div>}
    </div>
  )
}

export default CardEventosDashboard