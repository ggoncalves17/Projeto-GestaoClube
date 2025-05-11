import React, { useEffect, useState, useContext } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Modal from "../../components/JanelaModal/Modal";
import InputForm from "../../components/InputForm";
import styles from "../../components/ListaUtilizadores.module.css";
import PopUpRemoverModalidade from "../../components/PopUpRemoverModalidade";
import SelectForm from "../../components/SelectForm";
import {
  adicionaJogo,
  listaCompeticoes,
  listaJogos,
  editaJogo,
} from "../../api/Equipas/api";
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
    if (modo == "Editar") {
      setNovoJogo(jogoEscolhido);
    } 
    else {
      setNovoJogo({
        competicao: "",
        adversario: "",
        local: "",
        data: "",
        hora: "",
        estado: "",
        resultado: "",
        resultadoFinal: "",
      });
    }
    setErro("");
  }, [modo]);

  const handleSubmeteJogo = (event) => {
    event.preventDefault();

    //TODO: FAZER DEPOIS A PARTE DAS VERIFICAÇÕES DOS CAMPOS (JÁ TENHO COM OS REQUIREDS MAS É MAIS 1)
    // COLOCAR VERIFICAÇÃO CASO O JOGO ESTEJA FINALIZADO NÃO POSSO ALTERAR A DATA PARA ALGO MAIOR QUE HOJE.PARA ISSO TEM DE COLOCAR POR ACONTECER e BLOQUEAR O CAMPO FINALIZADO CASO A DATA SEJA MAIOR QUE HOJE
    let jogo = novoJogo

    if(jogo.estado == "Por Acontecer") {
      jogo.resultado = "",
      jogo.resultadoFinal = ""
    }
    
    if(modo == "Adicionar") {
      adicionaJogo(id_equipa, jogo, setJogos, setModo, setErro);
    }
    else if (modo == "Editar") {
      editaJogo(jogo, setJogos, setModo, setErro);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div>
          {jogos.length > 0 ? (
            <div className={styles.grelhaJogos}>
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
              onSubmit={handleSubmeteJogo}
            >
              <SelectForm
                label="Competição"
                valor={novoJogo.competicao}
                onChange={(e) =>
                  setNovoJogo({ ...novoJogo, competicao: e.target.value })
                }
                erro={erro}
                opcoes={competicoesDisponiveis}
              />
              <InputForm
                label="Adversário"
                valor={novoJogo.adversario}
                onChange={(e) =>
                  setNovoJogo({ ...novoJogo, adversario: e.target.value })
                }
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
                />
                <InputForm
                  tipo="time"
                  label="Hora"
                  valor={novoJogo.hora}
                  onChange={(e) =>
                    setNovoJogo({ ...novoJogo, hora: e.target.value })
                  }
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
                    placeholder={"Ex: 2-1"}
                  />
                </>
              )}
            </Modal>
          )}

          {modalRemover && (
            <PopUpRemoverModalidade
              titulo="jogo"
              setDesportos={setJogos}
              idModalidade={jogoEscolhido.id}
              modalidadeNome={jogoEscolhido.nome}
              setModalRemover={setModalRemover}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Jogos;
