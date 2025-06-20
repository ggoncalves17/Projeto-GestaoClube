import React, { useContext, useEffect, useState } from "react";
import styles from "./Perfil.module.css";
import { UtilizadorContext } from "../../context/UtilizadorContext";
import { MdEdit } from "react-icons/md";
import {
  validaFormularioPerfil,
  validaCamposPassword,
} from "../../components/Utilizadores/validaFormulario";
import { usePreviewFotoPerfil } from "../../hooks/usePreviewFotoPerfil";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "../../components/JanelaModal/Modal";
import InputForm from "../../components/InputForm";
import { toast } from "react-toastify";

const Perfil = () => {
  const { utilizador: infoUtilizador, setUtilizador } =
    useContext(UtilizadorContext);

  const campos = ["Email", "Contacto", "Data Nascimento"];
  const camposPassword = [
    "Password Atual",
    "Nova Password",
    "Confirmar Nova Password",
  ];

  const [passwordModal, setPasswordModal] = useState(false);

  const dadosUtilizador = {
    Nome: infoUtilizador.nome,
    Email: infoUtilizador.email,
    Contacto: String(infoUtilizador.contacto),
    "Data Nascimento": infoUtilizador.data,
  };

  const [dados, setDados] = useState({
    Nome: infoUtilizador.nome,
    Email: infoUtilizador.email,
    Contacto: String(infoUtilizador.contacto),
    "Data Nascimento": infoUtilizador.data,
  });

  const [dadosPassword, setDadosPassword] = useState({
    "Password Atual": "",
    "Nova Password": "",
    "Confirmar Nova Password": "",
  });

  useEffect(() => {
    setDadosPassword({
      "Password Atual": "",
      "Nova Password": "",
      "Confirmar Nova Password": "",
    });

    setErrosCamposPassword({});
  }, [passwordModal]);

  const {
    fotoPerfil: FotoPerfil,
    previewFoto: previewFoto,
    alteraPreviewFotoPerfil: alteraPreviewFotoPerfil,
    resetaFotoPerfil,
  } = usePreviewFotoPerfil(false, "Detalhes", infoUtilizador.foto);

  const verificaAlteracaoDados = () => {
    if (previewFoto.split("/")[2] !== infoUtilizador.foto) {
      return false;
    }
    if (dadosUtilizador.Nome !== dados.Nome) {
      return false;
    }
    if (dadosUtilizador.Email !== dados.Email) {
      return false;
    }
    if (dadosUtilizador.Contacto !== dados.Contacto) {
      return false;
    }
    if (dadosUtilizador["Data Nascimento"] !== dados["Data Nascimento"]) {
      return false;
    }
    if (dadosUtilizador.Função !== dados.Função) {
      return false;
    }
    return true;
  };

  const [errosCampos, setErrosCampos] = useState({});

  const handleSubmissao = (event) => {
    event.preventDefault();

    const erros = validaFormularioPerfil(dados);

    if (Object.keys(erros).length > 0) {
      setErrosCampos(erros);
      return;
    }

    const dadosEnvio = new FormData();
    dadosEnvio.append("nome", dados.Nome);
    dadosEnvio.append("contacto", dados.Contacto);
    dadosEnvio.append("data", dados["Data Nascimento"]);
    dadosEnvio.append("foto", FotoPerfil);

    axios
      .post(
        `http://localhost:8000/api/edita-perfil/${infoUtilizador.id}/`,
        dadosEnvio,
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
        toast.success("Perfil Atualizado com Sucesso!");
        setUtilizador({
          ...infoUtilizador,
          nome: res.data.utilizador.nome,
          data: res.data.utilizador.data_nascimento,
          contacto: res.data.utilizador.contacto,
        });
      })
      .catch((err) => {
        console.log("Código do erro:", err.response.status);
        console.log("Mensagem do erro:", err.response.data.mensagem);
      });
  };

  const [errosCamposPassword, setErrosCamposPassword] = useState({});

  const handleAlterarPassword = (event) => {
    event.preventDefault();

    const erros = validaCamposPassword(dadosPassword);

    if (Object.keys(erros).length > 0) {
      setErrosCamposPassword(erros);
      return;
    }

    setErrosCamposPassword({});

    axios
      .post(
        `http://localhost:8000/api/altera-password/${infoUtilizador.id}/`,
        {
          password: dadosPassword["Password Atual"],
          novaPassword: dadosPassword["Nova Password"],
        },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        toast.success("Password Alterada com Sucesso!");
        setPasswordModal(false);
      })
      .catch((err) => {
        console.log("Código do erro:", err.response.status);
        console.log("Mensagem do erro:", err.response.data.mensagem);
        if (err.response.status == 400) {
          setErrosCamposPassword({
            "Password Atual": err.response.data.mensagem,
          });
        }
      });
  };

  const repoeDadosUtilizador = () => {
    setDados({
      Nome: infoUtilizador.nome,
      Email: infoUtilizador.email,
      Contacto: String(infoUtilizador.contacto),
      "Data Nascimento": infoUtilizador.data,
    });

    setErrosCampos({});
    resetaFotoPerfil();
  };

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <p className={styles.titulo}>Meu Perfil</p>
        <div className={styles.conteudo}>
          <div className={styles.foto}>
            <label className={styles.uploadIcon} htmlFor="upload-foto" />
            <img
              src={previewFoto}
              alt="FotoPerfil"
              className={styles.fotoUtilizador}
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

          <div className={styles.modoDetalhes}>
            <p>Gestor</p>
          </div>
          <div
            className={styles.alterarPassword}
            onClick={() => setPasswordModal(true)}
          >
            <MdEdit />
            <p>Alterar Password</p>
          </div>
          <form onSubmit={handleSubmissao} className={styles.formPerfil}>
            <input
              type="text"
              value={dados.Nome}
              onChange={(e) =>
                setDados((prev) => ({
                  ...prev,
                  Nome: e.target.value,
                }))
              }
              className={styles.inputNome}
              required
            />
            {campos.map((campo, index) => (
              <div className={styles.caixaCampo} key={index}>
                {errosCampos[campo] && (
                  <p className={styles.erro}>{errosCampos[campo]}</p>
                )}

                <div className={styles.campo}>
                  <label>
                    <b>{campo}:</b>
                  </label>
                  <input
                    type={
                      campo === "Email"
                        ? "email"
                        : campo === "Data Nascimento"
                        ? "date"
                        : campo === "Contacto"
                        ? "number"
                        : "text"
                    }
                    value={dados[campo]}
                    onChange={(e) =>
                      setDados({
                        ...dados,
                        [campo]: e.target.value,
                      })
                    }
                    className={styles.inputCampo}
                    required
                    disabled={campo === "Email"}
                    max={
                      campo === "Data Nascimento"
                        ? new Date().toISOString().split("T")[0]
                        : ""
                    }
                  />
                </div>
              </div>
            ))}
            <div className={styles.caixaBotoes}>
              <button
                type="button"
                className={styles.botaoResetar}
                onClick={repoeDadosUtilizador}
                disabled={verificaAlteracaoDados()}
              >
                Repor
              </button>
              <button
                type="submit"
                className={styles.botaoGuardar}
                disabled={verificaAlteracaoDados()}
              >
                Guardar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>

      {passwordModal && (
        <Modal
          setModal={setPasswordModal}
          titulo="Alterar Password"
          botao="Guardar"
          onSubmit={handleAlterarPassword}
        >
          <div>
            {camposPassword.map((campo, index) => (
              <InputForm
                key={index}
                tipo="password"
                label={campo}
                valor={dadosPassword[campo]}
                onChange={(e) =>
                  setDadosPassword({
                    ...dadosPassword,
                    [campo]: e.target.value,
                  })
                }
                erro={errosCamposPassword[campo]}
                placeholder="********"
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Perfil;
