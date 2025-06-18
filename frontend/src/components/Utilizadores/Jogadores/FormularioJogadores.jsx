import React, { useState, useEffect, useContext } from "react";
import styles from "../Formulario.module.css";
import Input from "../Input";
import axios from "axios";
import Cookies from "js-cookie";
import { usePreviewFotoPerfil } from "../../../hooks/usePreviewFotoPerfil";
import { camposFormularioJogadores } from "../camposFormulario";
import { validaFormularioJogadores } from "../validaFormulario";
import Dropdown from "../../Dropdown";
import { UtilizadorContext } from "../../../context/UtilizadorContext";
import { listaModalidades } from "../../../api/Modalidades/api";

const FormularioJogadores = ({ modo, tipo, setStaff, setModo, utilizador }) => {
  const { utilizador: utilizadorInfo } = useContext(UtilizadorContext);

  const [dadosFormulario, setDadosFormulario] = useState({
    tipo: "",
    sexo: "",
    nome: "",
    data: "",
    nacionalidade: "",
    cc: "",
    cc_validade: "",
    peso: "",
    altura: "",
    foto: "",
    desporto: "",
  });

  const [errosCampos, setErrosCampos] = useState({});
  const [faseAdicionar, setFaseAdicionar] = useState(1);
  const [desportosExistentes, setDesportosExistentes] = useState([]);

  const {
    fotoPerfil: FotoPerfil,
    previewFoto: previewFoto,
    alteraPreviewFotoPerfil: alteraPreviewFotoPerfil,
  } = usePreviewFotoPerfil(true, modo, dadosFormulario.foto);

  // Função para selecionar o desporto a associar ao Jogador/Treinador
  const selecionaDesporto = (desportoSelecionado) => {
    if (dadosFormulario.desporto == desportoSelecionado) {
      setDadosFormulario({ ...dadosFormulario, desporto: "" });
    } else {
      setDadosFormulario({ ...dadosFormulario, desporto: desportoSelecionado });
    }
  };

  useEffect(() => {
    // Função para ir buscar as modalidades ao carregar o componente
    listaModalidades(
      utilizadorInfo.id_clube,
      setDesportosExistentes,
      null,
      true
    );

    if (modo === "Editar") {
      axios
        .get(`http://localhost:8000/api/info-jogador/${utilizador}/`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Resposta do Backend: ", res.data);
          setDadosFormulario({
            tipo: res.data.tipo,
            sexo: res.data.sexo,
            nome: res.data.nome,
            data: res.data.data_nascimento,
            nacionalidade: res.data.nacionalidade,
            cc: res.data.cartao_cidadao != null ? res.data.cartao_cidadao : "",
            cc_validade:
              res.data.data_validade_cc != null
                ? res.data.data_validade_cc
                : "",
            peso: res.data.peso != null ? res.data.peso : "",
            altura: res.data.altura != null ? res.data.altura : "",
            foto: res.data.foto,
            desporto:
              res.data.modalidade != null ? res.data.modalidade.nome : "",
          });
        })
        .catch((err) => {
          console.log("Mensagem do erro:", err.response.data.mensagem);
        });
    }
  }, []);

  const handleSubmissao = (event) => {
    event.preventDefault();

    const erros = validaFormularioJogadores(dadosFormulario);

    if (Object.keys(erros).length > 0) {
      setErrosCampos(erros);
      setFaseAdicionar(1);
      return;
    }

    const dados = new FormData();
    dados.append("tipo", dadosFormulario.tipo);
    dados.append("sexo", dadosFormulario.sexo);
    dados.append("nome", dadosFormulario.nome);
    dados.append("data", dadosFormulario.data);
    dados.append("nacionalidade", dadosFormulario.nacionalidade);
    dados.append("cc", dadosFormulario.cc);
    dados.append("cc_validade", dadosFormulario.cc_validade);
    dados.append("peso", dadosFormulario.peso);
    dados.append("altura", dadosFormulario.altura);
    if (FotoPerfil) {
      dados.append("foto", FotoPerfil);
    }
    dados.append("desporto", dadosFormulario.desporto);
    dados.append("id_clube", utilizadorInfo.id_clube);

    if (modo === "Adicionar") {
      axios
        .post("http://localhost:8000/api/adiciona-jogador/", dados, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Resposta do Backend 54: ", res.data);
          // setStaff((prev) => [...prev, res.data.utilizador]);
          setModo(null);
        })
        .catch((err) => {
          console.log("Código do erro:", err.response.status);
          console.log("Mensagem do erro:", err.response.data.mensagem);
        });
    } else if (modo === "Editar") {
      axios
        .post(`http://localhost:8000/api/edita-jogador/${utilizador}/`, dados, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Resposta do Backend: ", res.data);
          setModo(null);
        })
        .catch((err) => {
          console.log("Código do erro:", err.response.status);
          console.log("Mensagem do erro:", err.response.data.mensagem);
        });
    }
    return;
  };

  return (
    <div>
      <form className={styles.formulario} onSubmit={handleSubmissao}>
        <div className={styles.painelFoto}>
          {modo != "Detalhes" && (
            <div
              className={`${styles.modo} ${
                modo === "Editar" && styles.modoEditar
              }`}
            >
              <p>Modo {modo === "Adicionar" ? "Adição" : "Edição"}</p>
            </div>
          )}

          {/* //TODO: CRIAR UM COMPONENTE SÓ PARA ESTA PARTE DA FOTO VISTO QUE TENHO EM MAIS PÁGINAS */}
          <div className={styles.foto}>
            <label className={styles.uploadIcon} htmlFor="upload-foto" />
            <img
              src={previewFoto}
              alt="Preview da foto"
              className={styles.fotoPerfil}
            />
            <input
              type="file"
              accept="image/*"
              id="upload-foto"
              name="fotoPerfil"
              onChange={alteraPreviewFotoPerfil}
              disabled={modo === "Detalhes"}
              hidden
            />
          </div>
        </div>
        <div className={styles.painelInfo}>
          <div className={styles.painelForm}>
            {faseAdicionar == 1 ? (
              <>
                <div className={styles.campo}>
                  <label htmlFor="">Tipo *</label>
                  {errosCampos["tipo"] && (
                    <p className={styles.erro}>{errosCampos["tipo"]}</p>
                  )}
                  <Dropdown
                    tipo={dadosFormulario.tipo}
                    setTipo={setDadosFormulario}
                    dadosFormulario={dadosFormulario}
                    campo={"tipo"}
                    dados={["Jogador", "Treinador"]}
                    jogador={true}
                  />
                </div>

                <div className={styles.campo}>
                  <label htmlFor="">Sexo *</label>
                  {errosCampos["sexo"] && (
                    <p className={styles.erro}>{errosCampos["sexo"]}</p>
                  )}
                  <Dropdown
                    tipo={dadosFormulario.sexo}
                    setTipo={setDadosFormulario}
                    dadosFormulario={dadosFormulario}
                    campo={"sexo"}
                    dados={["Masculino", "Feminino"]}
                    jogador={true}
                  />
                </div>

                {camposFormularioJogadores
                  .filter((campo) => !campo.grupo)
                  .map((campo) => (
                    <Input
                      key={campo.id}
                      label={campo.label}
                      tipo={campo.tipo}
                      id={campo.id}
                      placeholder={campo.placeholder}
                      valor={dadosFormulario[campo.id]}
                      onChange={(e) =>
                        setDadosFormulario({
                          ...dadosFormulario,
                          [campo.id]: e.target.value,
                        })
                      }
                      erro={errosCampos[campo.id]}
                      required={true}
                    />
                  ))}

                <div className={styles.formLinhasAgrupadas}>
                  {camposFormularioJogadores
                    .filter((campo) => campo.grupo)
                    .map((campo) => (
                      <Input
                        key={campo.id}
                        label={campo.label}
                        tipo={campo.tipo}
                        id={campo.id}
                        placeholder={campo.placeholder}
                        valor={dadosFormulario[campo.id]}
                        onChange={(e) =>
                          setDadosFormulario({
                            ...dadosFormulario,
                            [campo.id]: e.target.value,
                          })
                        }
                        erro={errosCampos[campo.id]}
                        required={true}
                        disabled={
                          campo.id == "cc_validade" &&
                          dadosFormulario.cc.trim() == ""
                        }
                      />
                    ))}
                </div>
              </>
            ) : (
              <div className={styles.painelAssociarDesporto}>
                <h3>Associar Desporto</h3>
                {errosCampos["desporto"] && (
                  <p className={styles.erro}>{errosCampos["desporto"]}</p>
                )}
                <div className={styles.painelDesportosExistentes}>
                  {desportosExistentes.map((desporto, index) => (
                    <div
                      key={index}
                      className={`${styles.caixaDesporto} ${
                        dadosFormulario.desporto == desporto &&
                        styles.desportoSelecionado
                      }`}
                      onClick={() => selecionaDesporto(desporto)}
                    >
                      <div className={styles.desportoExistente}>{desporto}</div>
                      <img
                        src={`/Fotos-Desportos/${desporto}.png`}
                        alt="FotoDesporto"
                        className={styles.fotoDesporto}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/Fotos-Desportos/Default.png";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {faseAdicionar == 1 ? (
              <button onClick={() => setFaseAdicionar(2)}>Avançar</button>
            ) : (
              <div className={styles.botoesFinais}>
                <button
                  type="button"
                  className={styles.botaoVoltar}
                  onClick={() => setFaseAdicionar(1)}
                >
                  Voltar Atrás
                </button>

                <button type="submit">
                  {modo == "Adicionar"
                    ? "Adicionar Utilizador"
                    : "Guardar Alterações"}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioJogadores;
