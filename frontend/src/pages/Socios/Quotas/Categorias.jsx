import React, { useEffect, useState } from "react";
import styles from "../../../css/Categorias.module.css";
import { PainelBotoes } from "./PainelBotoes";
import Spinner from "../../../components/Spinner";
import ListaCategorias from "./ListaCategorias";
import {
  listaCategorias,
  adicionaCategoria,
  editaCategoria,
} from "../../../api/Socios/api";
import Modal from "../../../components/JanelaModal/Modal";
import InputForm from "../../../components/InputForm";

const Categorias = () => {
  const [categorias, setCategorias] = useState();
  const [ordenacao, setOrdenacao] = useState();
  const [loading, setLoading] = useState(true);
  const [modo, setModo] = useState(null);
  const [erro, setErro] = useState("");
  const [novaCategoria, setNovaCategoria] = useState({
    nome: "",
    inscricao: "",
    quota_mensal: "",
    quota_anual: "",
  });

  useEffect(() => {
    listaCategorias(setCategorias, setLoading);
  }, []);

  useEffect(() => {
    if (modo == "Adicionar") {
      setNovaCategoria({
        nome: "",
        inscricao: "",
        quota_mensal: "",
        quota_anual: "",
      });
    }
    setErro("");
  }, [modo]);

  const handleSubmeteCategoria = (event) => {
    event.preventDefault();

    if (modo == "Adicionar") {
      if (
        categorias.some((categoria) => categoria.nome == novaCategoria.nome)
      ) {
        setErro("Já existe uma categoria com o mesmo nome colocado.");
        return;
      }

      adicionaCategoria(novaCategoria, setCategorias, setModo, setErro);
    } else {
      if (
        categorias.some(
          (categoria) =>
            categoria.nome == novaCategoria.nome &&
            categoria.id != novaCategoria.id
        )
      ) {
        setErro("Já existe uma categoria com o mesmo nome colocado.");
        return;
      }

      editaCategoria(novaCategoria, setCategorias, setModo, setErro);
    }
  };

  return (
    <div>
      <PainelBotoes setModo={setModo} temBotao={true} />
      <div className={styles.painelInferior}>
        {loading ? (
          <Spinner />
        ) : (
          <ListaCategorias
            categorias={categorias}
            setNovaCategoria={setNovaCategoria}
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
            setModo={setModo}
            setCategorias={setCategorias}
          />
        )}
      </div>

      {modo && (
        <Modal
          setModal={setModo}
          titulo={`${modo} Categoria`}
          botao={modo == "Adicionar" ? "Adicionar" : "Guardar"}
          onSubmit={handleSubmeteCategoria}
        >
          <InputForm
            label="Nome da Categoria"
            valor={novaCategoria.nome}
            onChange={(e) =>
              setNovaCategoria({
                ...novaCategoria,
                nome: e.target.value,
              })
            }
            erro={erro}
            placeholder="Ex: Sénior"
          />
          <InputForm
            tipo="number"
            label="Custo Inscrição (€)"
            valor={novaCategoria.inscricao}
            onChange={(e) =>
              setNovaCategoria({
                ...novaCategoria,
                inscricao: e.target.value,
              })
            }
            placeholder="Ex: 5€"
          />
          <div className={styles.grupo}>
            <InputForm
              tipo="number"
              label="Custo Quota Mensal (€)"
              valor={novaCategoria.quota_mensal}
              onChange={(e) =>
                setNovaCategoria({
                  ...novaCategoria,
                  quota_mensal: e.target.value,
                })
              }
              placeholder="Ex: 10€"
            />
            <InputForm
              tipo="number"
              label="Custo Quota Anual (€)"
              valor={novaCategoria.quota_anual}
              onChange={(e) =>
                setNovaCategoria({
                  ...novaCategoria,
                  quota_anual: e.target.value,
                })
              }
              placeholder="Ex: 110€"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Categorias;
