import React, { useState } from "react";
import styles from "./Formulario.module.css";
import Input from "./Input";
import axios from "axios";
import Cookies from "js-cookie";
import { usePreviewFotoPerfil } from "../../hooks/usePreviewFotoPerfil";

const Formulario = ({ modo, setStaff, setModo }) => {

  const {
    fotoPerfil: FotoPerfil,
    previewFoto: previewFoto,
    alteraPreviewFotoPerfil: alteraPreviewFotoPerfil,
  } = usePreviewFotoPerfil();

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
      if (modo === "Adicionar") {

        const dados = new FormData();

        dados.append('tipo', dadosFormulario.tipo);
        dados.append('nome', dadosFormulario.nome);
        dados.append('email', dadosFormulario.email);
        dados.append('telefone', dadosFormulario.telefone);
        dados.append('morada', dadosFormulario.morada);
        dados.append('data', dadosFormulario.data);
        dados.append('funcao', dadosFormulario.funcao);
        dados.append('foto', FotoPerfil);

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
            <label className={styles.uploadIcon} htmlFor="upload-foto" />
              {/* <svg
                width="40"
                height="40"
                viewBox="0 0 69 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M68.2 14.918V53.279C68.1984 54.9753 67.5234 56.6017 66.3234 57.8006C65.1233 58.9995 63.4963 59.673 61.8 59.673H6.394C4.69869 59.6714 3.07328 58.9972 1.87451 57.7985C0.67575 56.5997 0.00158861 54.9743 0 53.279L0 14.918C0.00158861 13.2227 0.67575 11.5973 1.87451 10.3985C3.07328 9.19975 4.69869 8.52559 6.394 8.524H18.115L19.753 4.142C20.2097 2.9248 21.0271 1.87601 22.0959 1.13584C23.1647 0.395674 24.4339 -0.000598321 25.734 6.78078e-07H42.45C43.7501 -0.000598321 45.0193 0.395674 46.0881 1.13584C47.1569 1.87601 47.9743 2.9248 48.431 4.142L50.083 8.524H61.8C63.4963 8.524 65.1233 9.19746 66.3234 10.3964C67.5234 11.5953 68.1984 13.2217 68.2 14.918ZM50.083 34.099C50.083 30.9376 49.1455 27.8472 47.3891 25.2187C45.6328 22.5901 43.1363 20.5414 40.2156 19.3316C37.2948 18.1219 34.0809 17.8054 30.9803 18.4222C27.8797 19.039 25.0316 20.5615 22.7963 22.797C20.5609 25.0325 19.0386 27.8806 18.422 30.9813C17.8054 34.0819 18.1221 37.2958 19.332 40.2165C20.5419 43.1372 22.5908 45.6335 25.2195 47.3897C27.8482 49.1459 30.9386 50.0832 34.1 50.083C38.3377 50.0785 42.4006 48.393 45.3971 45.3964C48.3935 42.3997 50.0788 38.3367 50.083 34.099ZM45.821 34.099C45.8208 36.4172 45.1332 38.6832 43.8452 40.6106C42.5571 42.5379 40.7265 44.0401 38.5847 44.9271C36.443 45.8141 34.0863 46.046 31.8127 45.5937C29.5391 45.1413 27.4508 44.0249 25.8116 42.3856C24.1725 40.7464 23.0563 38.6579 22.6041 36.3843C22.152 34.1107 22.3841 31.754 23.2713 29.6123C24.1585 27.4707 25.6608 25.6402 27.5883 24.3523C29.5158 23.0644 31.7818 22.377 34.1 22.377C37.2071 22.382 40.1856 23.6187 42.3824 25.816C44.5793 28.0132 45.8165 30.9919 45.821 34.099Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
            </label> */}
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
              hidden
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
