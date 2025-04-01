import React from 'react'
import styles from './AdicionarUtilizador.module.css'
import FotoDefault from "../../assets/foto-default.png";

const AdicionarUtilizador = () => {
  return (
    <div>
        <div className={styles.painelFoto}>
          <div className={styles.modo}>
            <p>Modo Adição</p>
          </div>
          <div className={styles.foto}>
            <img src={FotoDefault} alt="FotoPerfil" className={styles.fotoPerfil} />
          </div>
        </div>
        <div className={styles.painelInfo}>
            <h4>Informação Pessoal</h4>
            <div>
              Teste
            </div>
        </div>
    </div>
  )
}

export default AdicionarUtilizador