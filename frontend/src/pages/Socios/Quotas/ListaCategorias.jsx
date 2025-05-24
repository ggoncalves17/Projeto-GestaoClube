import LinhaOrdenacao from "../../../components/LinhaOrdenacao";
import LinhaSocio from "./LinhaCategoria";
import styles from "../../../components/ListaUtilizadores.module.css";
import LinhaCategoria from "./LinhaCategoria";

const ListaCategorias = ({ categorias, ordenacao, setOrdenacao, setModo }) => {
  return (
    <>
      {categorias.length > 0 ? (
        <>
          <LinhaOrdenacao
            tipo={"Categoria"}
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
          />

          {categorias.map((categoria) => (
            <LinhaCategoria
              key={categoria.id}
              categoria={categoria}
              setModo={setModo}
            />
          ))}
        </>
      ) : (
        <p className={styles.info}>Não foi encontrada qualquer categoria!</p>
      )}
    </>
  );
};

export default ListaCategorias;
