import React, { useState, useEffect, useContext } from "react";
import styles from "./Formulario.module.css";
import Input from "./Input";
import axios from "axios";
import Cookies from "js-cookie";
import { usePreviewFotoPerfil } from "../../hooks/usePreviewFotoPerfil";
import { camposFormulario } from "./camposFormulario";
import { validaFormulario } from "./validaFormulario";
import { UtilizadorContext } from "../../context/UtilizadorContext";

const Formulario = ({ modo, tipo, setStaff, setModo, utilizador }) => {

console.log("MODO DO PAINEL: ", modo, " E TIPO DE UTILIZADOR: ", tipo);


  // Referência -> https://react.dev/reference/react/useState#examples-objects
  const [dadosFormulario, setDadosFormulario] = useState({
    tipo: tipo,
    nome: "",
    email: "",
    telefone: "",
    data: "",
    funcao: "",
    foto: "",
  });

  const { utilizador: utilizadorInfo } = useContext(UtilizadorContext)

  const {
    fotoPerfil: FotoPerfil,
    previewFoto: previewFoto,
    alteraPreviewFotoPerfil: alteraPreviewFotoPerfil,
  } = usePreviewFotoPerfil(modo, dadosFormulario.foto);

  useEffect(() => {
    if (modo != "Adicionar") {
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
          });
        })
        .catch((err) => {
          console.log("Mensagem do erro:", err.response.data.mensagem);
        });
    }
  }, [modo]);

  const [errosCampos, setErrosCampos] = useState({});

  const handleSubmissao = (event) => {
    event.preventDefault();

    const erros = validaFormulario(dadosFormulario, tipo);

    // Referência -> https://stackoverflow.com/questions/46859574/reactjs-if-object-has-length
    if (Object.keys(erros).length > 0) {
      setErrosCampos(erros);
      return;
    }

    const dados = new FormData();
    dados.append("nome", dadosFormulario.nome);
    dados.append("email", dadosFormulario.email);
    dados.append("telefone", dadosFormulario.telefone);
    dados.append("morada", dadosFormulario.morada);
    dados.append("data", dadosFormulario.data);
    dados.append("funcao", dadosFormulario.funcao);
    dados.append("foto", FotoPerfil);
    dados.append("tipo", dadosFormulario.tipo);
    dados.append("id_clube", utilizadorInfo.id_clube)

    if (modo === "Adicionar") {
      axios
        .post("http://localhost:8000/api/adiciona-utilizador/", dados, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Resposta do Backend: ", res.data);
          console.log("Utilizador (Geral ou Gestor) Adicionado");
          setStaff((prev) => [...prev, res.data.utilizador]);
          setModo(null);
        })
        .catch((err) => {
          console.log("Código do erro:", err.response.status);
          if(err.response.status == 404) {
            setErrosCampos({
            ...errosCampos,
              email: "Já existe um email igual ao inserido. Por favor tente outro!",
            })
          }
          console.log("Mensagem do erro:", err.response.data.mensagem);
        });
    } else if (modo === "Editar") {
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
                {tipo === "Gestor" ? <p>Gestor</p> : <p>Utilizador</p>}
              </div>
            </>
          )}
        </div>
        <div className={styles.painelInfo}>
          <div className={styles.painelForm}>
            {camposFormulario.map((campo) => (
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
                disabled={modo === "Detalhes" || (modo === "Editar" && campo.id === "email")}
                hidden={(campo.id === "funcao" && tipo === "Utilizador")}
              />
            ))}

            {modo != "Detalhes" && (
              <button type="submit">
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
