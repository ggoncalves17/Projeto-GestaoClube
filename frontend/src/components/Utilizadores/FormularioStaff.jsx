import React, { useState, useEffect } from "react";
import styles from "./Formulario.module.css";
import Input from "./Input";
import axios from "axios";
import Cookies from "js-cookie";
import { usePreviewFotoPerfil } from "../../hooks/usePreviewFotoPerfil";

const Formulario = ({ modo, setStaff, setModo, utilizador }) => {

  // Referência -> https://react.dev/reference/react/useState#examples-objects
  const [dadosFormulario, setDadosFormulario] = useState({
    tipo: "Gestor",
    nome: "",
    email: "",
    telefone: "",
    data: "",
    funcao: "",
    foto: "",
  });

  const {
    fotoPerfil: FotoPerfil,
    previewFoto: previewFoto,
    alteraPreviewFotoPerfil: alteraPreviewFotoPerfil,
  } = usePreviewFotoPerfil(modo, dadosFormulario.foto);

  useEffect(() => {
    if(modo != "Adicionar"){
      axios
      .get(`http://localhost:8000/api/info-utilizador/${utilizador}/`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        setDadosFormulario({
          nome: res.data.nome,
          email: res.data.email,
          telefone: String(res.data.contacto),
          data: res.data.data_nascimento,
          funcao: res.data.funcao,
          foto: res.data.foto,
        })
      })
      .catch((err) => {
        console.log("Mensagem do erro:", err.response.data.mensagem);
      });
    }
  }, [modo]);

  const [errosCampos, setErrosCampos] = useState({});
  
  // Função para validar adicionalmente o formulário, mesmo tendo o "required"
  const validaFormulario = () => {
    const erros = {};

    const dataHoje = new Date();
    const dataNascimento = new Date(dadosFormulario.data);

    if (dadosFormulario.nome.trim() == "") {
      erros.nome = "Campo Obrigatório";
    }
    if (dadosFormulario.email.trim() == "") {
      erros.email = "Campo Obrigatório";
    }
    if (dadosFormulario.telefone.trim() == "") {
      erros.telefone = "Campo Obrigatório";
    } else if (!/^9\d{8}$/.test(dadosFormulario.telefone)) {
      erros.telefone = "Número de Telefone Inválido";
    }

    if (dadosFormulario.data.trim() == "") {
      erros.data = "Campo Obrigatório";
    } else if (dataNascimento > dataHoje) {
      erros.data = "Data Inválida. Não pode ser superior a hoje.";
    } else {
      if (dataHoje - dataNascimento < 568036800000) {
        erros.data = "É necessário ter pelo menos 18 anos.";
      }
    }

    if (dadosFormulario.funcao.trim() == "") {
      erros.morada = "Campo Obrigatório";
    }

    setErrosCampos(erros);

    // Referência -> https://stackoverflow.com/questions/46859574/reactjs-if-object-has-length
    return Object.keys(erros).length > 0 ? false : true;
  };

  const handleSubmissao = (event) => {
    event.preventDefault();

    if (validaFormulario()) {
      const dados = new FormData();

      console.log(FotoPerfil);
    
      dados.append('nome', dadosFormulario.nome);
      dados.append('email', dadosFormulario.email);
      dados.append('telefone', dadosFormulario.telefone);
      dados.append('morada', dadosFormulario.morada);
      dados.append('data', dadosFormulario.data);
      dados.append('funcao', dadosFormulario.funcao);
      dados.append('foto', FotoPerfil);
      dados.append('tipo', dadosFormulario.tipo);
      
      if (modo === "Adicionar") {

        axios
          .post(
            "http://localhost:8000/api/adiciona-utilizador/", 
            dados,
            {
              withCredentials: true,
              headers: {
                "X-CSRFToken": Cookies.get("csrftoken"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            console.log("Resposta do Backend: ", res.data);
            console.log("Gestor Adicionado");
            setStaff((prev) => [...prev, res.data.utilizador]);
            setModo(null)
          })
          .catch((err) => {
            console.log("Código do erro:", err.response.status);
            console.log("Mensagem do erro:", err.response.data.mensagem);
          });
      } 
      else if (modo === "Editar") {
        axios
          .post(
            `http://localhost:8000/api/edita-utilizador/${utilizador}/`, 
            dados,
            {
              withCredentials: true,
              headers: {
                "X-CSRFToken": Cookies.get("csrftoken"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            console.log("Resposta do Backend: ", res.data);
            console.log("Gestor Adicionado");
            setModo(null)
          })
          .catch((err) => {
            console.log("Código do erro:", err.response.status);
            console.log("Mensagem do erro:", err.response.data.mensagem);
          });
      }
    }
    return;
  };

  return (
    <div>
      <form className={styles.formulario} onSubmit={handleSubmissao}>
        <div className={styles.painelFoto}>
          {modo != "Detalhes" &&
            <div className={`${styles.modo} ${modo === "Editar" && styles.modoEditar}`}>
                <p>Modo {modo === "Adicionar" ? "Adição" : "Edição"}</p>
            </div>
          }
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
          {modo == "Detalhes" && (
            <>
              <p className={styles.nomeUtilizador}>{dadosFormulario.nome}</p>
              <div className={styles.modoDetalhes}>
                  <p>Gestor</p>
              </div>
            </>
            )
          }
        </div>
        <div className={styles.painelInfo}>
          <div className={styles.painelForm}>
            <Input
              label="Nome:"
              tipo="text"
              id="nome"
              placeholder="Ex: John Doe"
              valor={dadosFormulario.nome}
              onChange={(e) =>
                setDadosFormulario({ ...dadosFormulario, nome: e.target.value })
              }
              erro={errosCampos.nome}
              disabled={modo === "Detalhes"}
              required={modo !== "Detalhes"}
            />

            <Input
              label="Email:"
              tipo="email"
              id="email"
              placeholder="Ex: utilizador@gmail.com"
              valor={dadosFormulario.email}
              onChange={(e) =>
                setDadosFormulario({
                  ...dadosFormulario,
                  email: e.target.value,
                })
              }
              erro={errosCampos.email}
              disabled={modo != "Adicionar"}
              required={modo === "Adicionar"}
            />

            <Input
              label="Telefone:"
              tipo="number"
              id="telefone"
              placeholder="Ex: 910111222"
              valor={dadosFormulario.telefone}
              onChange={(e) =>
                setDadosFormulario({
                  ...dadosFormulario,
                  telefone: e.target.value,
                })
              }
              erro={errosCampos.telefone}
              disabled={modo === "Detalhes"}
              required={modo !== "Detalhes"}
            />

            <Input
              label="Data Nascimento:"
              tipo="date"
              id="data"
              placeholder="Ex: 22/07/2004"
              valor={dadosFormulario.data}
              onChange={(e) =>
                setDadosFormulario({
                  ...dadosFormulario,
                  data: e.target.value,
                })
              }
              erro={errosCampos.data}
              disabled={modo === "Detalhes"}
              required={modo !== "Detalhes"}
            />

            <Input
              label="Função:"
              tipo="text"
              id="funcao"
              placeholder="Ex: Presidente"
              valor={dadosFormulario.funcao}
              onChange={(e) =>
                setDadosFormulario({
                  ...dadosFormulario,
                  funcao: e.target.value,
                })
              }
              erro={errosCampos.funcao}
              disabled={modo === "Detalhes"}
              required={modo !== "Detalhes"}
            />

            {modo != "Detalhes" && (
              <button tipo="submit">
                {modo == "Adicionar"
                  ? "Adicionar Utilizador"
                  : "Guardar Alterações"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
