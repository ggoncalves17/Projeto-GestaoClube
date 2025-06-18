import LinhaOrdenacao from "./LinhaOrdenacao";
import LinhaUtilizador from "./LinhaUtilizador";
import styles from "./ListaUtilizadores.module.css";

const ListaUtilizadores = ({
  utilizadoresFiltrados,
  setModo,
  setUtilizador,
  tipo,
  ordenacao,
  setOrdenacao,
}) => {
  return (
    <>
      {utilizadoresFiltrados.length > 0 ? (
        <>
          <LinhaOrdenacao tipo={tipo} ordenacao={ordenacao} setOrdenacao={setOrdenacao}/>

          {utilizadoresFiltrados.map((utilizador) => (
            <LinhaUtilizador
              key={utilizador.id}
              utilizador={utilizador}
              setModo={setModo}
              setUtilizador={setUtilizador}
            />
          ))}
        </>
      ) : (
        <p className={styles.info}>Não foi encontrado qualquer utilizador!</p>
      )}
    </>
  );
};

export default ListaUtilizadores;
