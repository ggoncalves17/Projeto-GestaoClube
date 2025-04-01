import React, { useState } from "react";
import FotoDefault from "../../assets/foto-default.png";
import styles from "./Formulario.module.css";
import Input from "./Input";
import axios from "axios";
import Cookies from "js-cookie";

const Formulario = ({ modo }) => {
  // Referência -> https://react.dev/reference/react/useState#examples-objects
  const [dadosFormulario, setDadosFormulario] = useState({
    tipo: "Gestor",
    nome: "",
    email: "",
    telefone: "",
    morada: "",
    data: "",
    funcao: "",
    foto: "",
  });

  const [errosCampos, setErrosCampos] = useState({});

  //TODO: VERIFICAR OS CAMPOS DA DATA NASCIMENTO > 18 ANOS E A FUNCAO SE TEM CONTEUDO E TALVEZ COLOCAR UM SELECT
  // Função para validar adicionalmente o formulário, mesmo tendo o "required"
  const validaFormulario = () => {
    const erros = {};

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

    if (dadosFormulario.morada.trim() == "") {
      erros.morada = "Campo Obrigatório";
    }

    setErrosCampos(erros);

    // Referência -> https://stackoverflow.com/questions/46859574/reactjs-if-object-has-length
    return Object.keys(erros).length > 0 ? false : true;
  };

  const handleSubmissao = (event) => {
    event.preventDefault();

    if (validaFormulario()) {
      if (modo === "Adicionar") {
        axios
          .post(
            "http://localhost:8000/api/adiciona-utilizador/",
            {   
                tipo: dadosFormulario.tipo,
                nome: dadosFormulario.nome,
                email: dadosFormulario.email,
                telefone: dadosFormulario.telefone,
                morada: dadosFormulario.morada,
                data: dadosFormulario.data,
                funcao: dadosFormulario.funcao,
                foto: dadosFormulario.foto,
            },
            {
              withCredentials: true,
              headers: {
                "X-CSRFToken": Cookies.get("csrftoken"),
                "Content-type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("Resposta do Backend: ", res.data);
            console.log("Gestor Adicionado");
          })
          .catch((err) => {
            console.log("Código do erro:", err.response.status);
            console.log("Mensagem do erro:", err.response.data.mensagem);
          });
      } else {
        console.log("Gestor Editado");
      }
    }
    return;
  };

  return (
    <div>
      <form className={styles.formulario} onSubmit={handleSubmissao}>
        <div className={styles.painelFoto}>
          <div className={styles.modo}>
            <p>Modo {modo === "Adicionar" ? "Adição" : "Edição"}</p>
          </div>
          <div className={styles.foto}>
            <img
              src={FotoDefault}
              alt="FotoPerfil"
              className={styles.fotoPerfil}
            />
          </div>
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
              disabled={modo === "Detalhes"}
              required={modo !== "Detalhes"}
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
              label="Morada:"
              tipo="text"
              id="morada"
              placeholder="Ex: Rua do Utilizador"
              valor={dadosFormulario.morada}
              onChange={(e) =>
                setDadosFormulario({
                  ...dadosFormulario,
                  morada: e.target.value,
                })
              }
              erro={errosCampos.morada}
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
