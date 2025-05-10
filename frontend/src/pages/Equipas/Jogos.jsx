import React, { useEffect, useState, useContext } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Modal from "../../components/JanelaModal/Modal";
import InputForm from "../../components/InputForm";
import styles from "../../components/ListaUtilizadores.module.css";
import PopUpRemoverModalidade from "../../components/PopUpRemoverModalidade";
import SelectForm from "../../components/SelectForm";
import { listaCompeticoes, listaJogos } from "../../api/Equipas/api";
import RadioButtonForm from "../../components/RadioButtonForm";
import LinhaJogo from "../../components/LinhaJogo";

const Jogos = () => {
  const { id_equipa } = useParams();
  const [loading, setLoading] = useState(true);
  const { modo, setModo } = useOutletContext();
  const [erro, setErro] = useState("");
  const [competicoes, setCompeticoes] = useState([]);
  const [jogos, setJogos] = useState([]);
  const [modalRemover, setModalRemover] = useState(null);
  const [jogoEscolhido, setJogoEscolhido] = useState("");

  const competicoesDisponiveis = competicoes.map(
    (competicao) => competicao.nome
  );

  const estadosDisponiveis = ["Por Acontecer", "Finalizado"];

  const [novoJogo, setNovoJogo] = useState({
    competicao: "",
    adversario: "",
    local: "",
    data: "",
    hora: "",
    estado: "",
    resultado: "",
    resultadoFinal: "",
  });

  useEffect(() => {
    listaJogos(id_equipa, setJogos, setLoading);

    listaCompeticoes(id_equipa, setCompeticoes, setLoading);
  }, []);

  useEffect(() => {
    console.log("NOVO JOGO: ", novoJogo);
  }, [novoJogo]);

  return (
    <div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div>
          {jogos.length > 0 ? (
            <div className={styles.grelhaCompeticoes}>
              {jogos.map((jogo, index) => (
                <LinhaJogo
                  key={index}
                  setModo={setModo}
                  jogo={jogo}
                  setModalRemover={setModalRemover}
                  setJogoEscolhido={setJogoEscolhido}
                />
              ))}
            </div>
          ) : (
            <p className={styles.infoModalidades}>
              Não foi encontrado qualquer jogo associado a esta equipa!
            </p>
          )}

          {modo && (
            <Modal
              setModal={setModo}
              titulo={`${modo} Jogo`}
              botao={modo == "Adicionar" ? "Adicionar" : "Guardar"}
              onSubmit={null}
            >
              <SelectForm
                label="Competição"
                valor={novoJogo.competicao}
                onChange={(e) =>
                  setNovoJogo({ ...novoJogo, competicao: e.target.value })
                }
                opcoes={competicoesDisponiveis}
              />
              <InputForm
                label="Adversário"
                valor={novoJogo.adversario}
                onChange={(e) =>
                  setNovoJogo({ ...novoJogo, adversario: e.target.value })
                }
                erro={erro}
                placeholder="Ex: Sporting"
              />
              <RadioButtonForm
                label="Local do Jogo"
                valor={novoJogo.local}
                onChange={(e) =>
                  setNovoJogo({ ...novoJogo, local: e.target.value })
                }
                opcoes={["Casa", "Fora"]}
              />

              <div className={styles.grupoDataHora}>
                <InputForm
                  tipo="date"
                  label="Data"
                  valor={novoJogo.data}
                  onChange={(e) =>
                    setNovoJogo({ ...novoJogo, data: e.target.value })
                  }
                  erro={erro}
                />
                <InputForm
                  tipo="time"
                  label="Hora"
                  valor={novoJogo.hora}
                  onChange={(e) =>
                    setNovoJogo({ ...novoJogo, hora: e.target.value })
                  }
                  erro={erro}
                />
              </div>
              <SelectForm
                label="Estado"
                valor={novoJogo.estado}
                onChange={(e) =>
                  setNovoJogo({ ...novoJogo, estado: e.target.value })
                }
                opcoes={estadosDisponiveis}
              />

              {novoJogo.estado == "Finalizado" && (
                <>
                  <RadioButtonForm
                    label="Resultado"
                    valor={novoJogo.resultado}
                    onChange={(e) =>
                      setNovoJogo({ ...novoJogo, resultado: e.target.value })
                    }
                    opcoes={["Derrota", "Empate", "Vitória"]}
                  />
                  <InputForm
                    label="Resultado Final"
                    valor={novoJogo.resultadoFinal}
                    onChange={(e) =>
                      setNovoJogo({
                        ...novoJogo,
                        resultadoFinal: e.target.value,
                      })
                    }
                    erro={erro}
                  />
                </>
              )}
            </Modal>
          )}

          {modalRemover && (
            <PopUpRemoverModalidade
              titulo="competição"
              setDesportos={setCompeticoes}
              idModalidade={competicaoEscolhida.id}
              modalidadeNome={competicaoEscolhida.nome}
              setModalRemover={setModalRemover}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Jogos;
