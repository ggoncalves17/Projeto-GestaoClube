import React, { useEffect, useState, useContext } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import CardEpoca from "../../../components/CardEpoca";
import styles from "../../../components/ListaUtilizadores.module.css";
import { listaEpocas } from "../../../api/Epocas/api";
import Spinner from "../../../components/Spinner";
import Modal from "../../../components/JanelaModal/Modal";
import InputForm from "../../../components/InputForm";
import { adicionaEpoca } from "../../../api/Epocas/api";
import PopUpRemoverModalidade from "../../../components/PopUpRemoverModalidade";

const Epocas = () => {
  const { id: id_modalidade } = useParams();
  const { modo, setModo } = useOutletContext();

  const [loading, setLoading] = useState(true);
  const [epocas, setEpocas] = useState([]);
  const [erro, setErro] = useState("");
  const [epocaEscolhida, setEpocaEscolhida] = useState(null);
  const [modalRemover, setModalRemover] = useState(null);
  const [novaEpoca, setNovaEpoca] = useState({
    nome: "",
    data_inicial: "",
    data_final: "",
  });

  useEffect(() => {
    listaEpocas(id_modalidade, setEpocas, setLoading);
  }, []);

  useEffect(() => {
    setNovaEpoca({ nome: "", data_inicial: "", data_final: "" });
    setErro("");
  }, [modo]);

  useEffect(() => {
    if (novaEpoca.data_inicial && novaEpoca.data_final) {
      const data_inicio_ano = new Date(novaEpoca.data_inicial).getFullYear();
      const data_fim_ano = new Date(novaEpoca.data_final).getFullYear();

      if (data_inicio_ano == data_fim_ano) {
        setNovaEpoca((prev) => ({
          ...prev,
          nome: `${data_inicio_ano}`,
        }));
      } else {
        setNovaEpoca((prev) => ({
          ...prev,
          nome: `${data_inicio_ano}/${data_fim_ano}`,
        }));
      }
    }
  }, [novaEpoca.data_inicial, novaEpoca.data_final]);

  const handleSubmeteEpoca = (event) => {
    event.preventDefault();

    if (modo == "Adicionar") {
      if (
        epocas.some(
          (epoca) =>
            epoca.nome.trim().toLowerCase() ==
            novaEpoca.nome.trim().toLowerCase()
        )
      ) {
        setErro("Já existe uma época com o mesmo nome");
        return;
      }

      const inicio = new Date(novaEpoca.data_inicial);
      const fim = new Date(novaEpoca.data_final);

      if (fim < inicio) {
        setErro("A data final não pode ser anterior à data inicial.");
        return;
      }
    }

    // Chamada da Função para Adicionar nova Éoca
    adicionaEpoca(id_modalidade, novaEpoca, setEpocas, setModo, setErro);
  };

  return (
    <div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div>
          {epocas.length > 0 ? (
            <div className={styles.grelhaEpocas}>
              {epocas.map((epoca, index) => (
                <CardEpoca key={index} epoca={epoca} setModalRemover={setModalRemover} setEpocaEscolhida={setEpocaEscolhida}/>
              ))}
            </div>
          ) : (
            <p className={styles.infoModalidades}>
              Não foi encontrada qualquer época para esta modalidade!
            </p>
          )}

          {modo && (
            <Modal
              setModal={setModo}
              titulo={`${modo} Época`}
              botao={modo == "Adicionar" ? "Adicionar" : "Guardar"}
              onSubmit={handleSubmeteEpoca}
            >
              <InputForm
                label="Época"
                valor={novaEpoca.nome}
                onChange={(e) =>
                  setNovaEpoca({ ...novaEpoca, nome: e.target.value })
                }
                placeholder="Selecione a Data Inicial e Final"
                disabled={true}
                erro={erro}
              />
              <InputForm
                tipo="date"
                label="Data Inicial"
                valor={novaEpoca.data_inicial}
                onChange={(e) =>
                  setNovaEpoca({ ...novaEpoca, data_inicial: e.target.value })
                }
              />
              <InputForm
                tipo="date"
                label="Data Final"
                valor={novaEpoca.data_final}
                onChange={(e) =>
                  setNovaEpoca({ ...novaEpoca, data_final: e.target.value })
                }
              />
            </Modal>
          )}

          {modalRemover && (
            <PopUpRemoverModalidade
              titulo="época"
              setDesportos={setEpocas}
              idModalidade={epocaEscolhida.id}
              modalidadeNome={epocaEscolhida.nome}
              setModalRemover={setModalRemover}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Epocas;
