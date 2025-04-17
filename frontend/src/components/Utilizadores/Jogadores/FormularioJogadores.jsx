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

const FormularioJogadores = ({ modo, tipo, setStaff, setModo, utilizador }) => {

  console.log("MODO DO PAINEL: ", modo, " E TIPO DE UTILIZADOR: ", tipo);

  const { utilizador: utilizadorInfo } = useContext(UtilizadorContext)

  const [dadosFormulario, setDadosFormulario] = useState({
    tipo: "",
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
  const [faseAdicionar, setFaseAdicionar] = useState(1)
  const [desportosExistentes, setDesportosExistentes] = useState([])

  const {
    fotoPerfil: FotoPerfil,
    previewFoto: previewFoto,
    alteraPreviewFotoPerfil: alteraPreviewFotoPerfil,
  } = usePreviewFotoPerfil(modo, dadosFormulario.foto);

  // Função para selecionar o desporto a associar ao Jogador/Treinador
  const selecionaDesporto = (desportoSelecionado) => {
    if(dadosFormulario.desporto == desportoSelecionado) {
      setDadosFormulario({...dadosFormulario, desporto: ""})
    }
    else {
      setDadosFormulario({...dadosFormulario, desporto: desportoSelecionado});
    }
  }

  useEffect(() => {
    if(modo == "Adicionar"){
      axios
      // TODO: PASSAR O ID DO CLUBE PARA IR BUSCAR AS MODALIDADES DESTE MESMO CLUBE E NÃO DE TODOS E DEPOIS METER CASO NÃO EXISTAM DESPORTOS ESCREVER NO SITIO DA CAIXA ATUAL DOS DESPORTOS
      .get("http://localhost:8000/api/listaModalidades/", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        const nomesModalidades = res.data.map((elemento) => elemento.nome);
        setDesportosExistentes(nomesModalidades);
      })
      .catch((err) => {
        console.log("Mensagem do erro:", err.response.data.mensagem);
      });
    }
  }, []);

  // useEffect(() => {
  //   if (modo != "Adicionar") {
  //     axios
  //       .get(`http://localhost:8000/api/info-utilizador/${utilizador}/`, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         console.log("Resposta do Backend: ", res.data);
  //         setDadosFormulario({
  //           nome: res.data.nome,
  //           email: res.data.email,
  //           telefone: String(res.data.contacto),
  //           data: res.data.data_nascimento,
  //           funcao: res.data.funcao,
  //           foto: res.data.foto,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log("Mensagem do erro:", err.response.data.mensagem);
  //       });
  //   }
  // }, [modo]);

  const handleSubmissao = (event) => {
    event.preventDefault();

    const erros = validaFormularioJogadores(dadosFormulario);
    
    if (Object.keys(erros).length > 0) {
      setErrosCampos(erros);
      setFaseAdicionar(1)
      return;
    }

    const dados = new FormData();
    dados.append("tipo", dadosFormulario.tipo);
    dados.append("nome", dadosFormulario.nome);
    dados.append("data", dadosFormulario.data);
    dados.append("nacionalidade", dadosFormulario.nacionalidade);
    dados.append("cc", dadosFormulario.cc);
    dados.append("cc_validade", dadosFormulario.cc_validade);
    dados.append("peso", dadosFormulario.peso);
    dados.append("altura", dadosFormulario.altura);
    dados.append("foto", FotoPerfil);
    dados.append("desporto", dadosFormulario.desporto);
    dados.append("id_clube", utilizadorInfo.id_clube)

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
          console.log("Resposta do Backend: ", res.data);
          setStaff((prev) => [...prev, res.data.utilizador]);
          setModo(null);
        })
        .catch((err) => {
          console.log("Código do erro:", err.response.status);
          console.log("Mensagem do erro:", err.response.data.mensagem);
        });
    } 
    // else if (modo === "Editar") {
    //   axios
    //     .post(
    //       `http://localhost:8000/api/edita-jogador/${utilizador}/`,
    //       dados,
    //       {
    //         withCredentials: true,
    //         headers: {
    //           "X-CSRFToken": Cookies.get("csrftoken"),
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log("Resposta do Backend: ", res.data);
    //       console.log("Gestor Adicionado");
    //       setModo(null);
    //     })
    //     .catch((err) => {
    //       console.log("Código do erro:", err.response.status);
    //       console.log("Mensagem do erro:", err.response.data.mensagem);
    //     });
    // }
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

              {faseAdicionar == 1 ?
              
                <>
                  <div className={styles.campo}>
                    <label htmlFor="">Tipo *</label>
                    {errosCampos["tipo"] && <p className={styles.erro}>{errosCampos["tipo"]}</p>}
                    <Dropdown tipo={dadosFormulario.tipo} setTipo={setDadosFormulario} dadosFormulario={dadosFormulario} dados={["Jogador", "Treinador"]} jogador={true}/>
                  </div>

                  {camposFormularioJogadores
                    .filter(campo => !campo.grupo)
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
                        required={!(campo.id === "funcao" && tipo === "Utilizador")}
                      />
                  ))}
              
                  <div className={styles.formLinhasAgrupadas}>
                    {camposFormularioJogadores
                      .filter(campo => campo.grupo)
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
                        />
                    ))} 
                  </div>
                </>
              :
                <div className={styles.painelAssociarDesporto}>
                  <h3>Associar Desporto</h3>
                  <div className={styles.painelDesportosExistentes}>
                      {desportosExistentes.map((desporto, index) =>
                        <div key={index} className={`${styles.caixaDesporto} ${dadosFormulario.desporto == desporto && styles.desportoSelecionado}`} onClick={() => selecionaDesporto(desporto)}>
                          <div className={styles.desportoExistente} >{desporto}</div>
                          <img src={`/Fotos-Desportos/${desporto}.png`} alt="FotoDesporto" className={styles.fotoDesporto}/>    
                        </div>
                      )}
                  </div>
                </div>}


            {faseAdicionar == 1 && modo == "Adicionar"  ?
              <button onClick={() => setFaseAdicionar(2)}>
                Avançar
              </button>
            :
            <div className={styles.botoesFinais}> 
              {modo == "Adicionar" &&
                <button className={styles.botaoVoltar} onClick={() => setFaseAdicionar(1)}>
                  Voltar Atrás
                </button>
              }

              <button type="submit">
                {modo == "Adicionar"
                  ? "Adicionar Utilizador"
                    : "Guardar Alterações"}
              </button>
            </div>

            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioJogadores;
