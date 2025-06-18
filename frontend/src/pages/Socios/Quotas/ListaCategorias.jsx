import LinhaOrdenacao from "../../../components/LinhaOrdenacao";
import LinhaSocio from "./LinhaCategoria";
import styles from "../../../components/ListaUtilizadores.module.css";
import LinhaCategoria from "./LinhaCategoria";

const ListaCategorias = ({ categorias, setNovaCategoria, ordenacao, setOrdenacao, setModo, tipo="Categoria", historico = false, setCategorias }) => {
  
  historico && (tipo = "Historico")
  
  return (
    <>
      {categorias.length > 0 ? (
        <>
          <LinhaOrdenacao
            tipo={tipo}
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
          />

          {categorias.map((categoria) => (
            <LinhaCategoria
              key={categoria.id}
              categoria={categoria}
              setNovaCategoria={setNovaCategoria}
              setModo={setModo}
              historico={historico}
              setCategorias={setCategorias}
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
