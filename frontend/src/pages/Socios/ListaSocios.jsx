import LinhaOrdenacao from "../../components/LinhaOrdenacao";
import LinhaSocio from './LinhaSocio'
import styles from '../../components/ListaUtilizadores.module.css'

const ListaSocios = ({ sociosFiltrados, ordenacao, setOrdenacao }) => {
  return (
    <>
      {sociosFiltrados.length > 0 ? (
        <>
          <LinhaOrdenacao
            tipo={"Sócio"}
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
          />

          {sociosFiltrados.map((socio) => (
            <LinhaSocio
              key={socio.id}
              socio={socio}
              setModo={null}
              setUtilizador={null}
            />
          ))} 
        </>
      ) : (
        <p className={styles.info}>Não foi encontrado qualquer sócio!</p>
      )}
    </>
  );
};

export default ListaSocios;
