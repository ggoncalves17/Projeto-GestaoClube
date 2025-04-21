import React, { useContext, useState } from "react";
import styles from "./Perfil.module.css";
import { UtilizadorContext } from "../../context/UtilizadorContext";
import { MdEdit } from "react-icons/md";

const Perfil = () => {
  const { utilizador: infoUtilizador } = useContext(UtilizadorContext);

  const campos = ["Email", "Contacto", "Data Nascimento", "Função"];
  const dadosUtilizador = {
    Email: infoUtilizador.email,
    Contacto: infoUtilizador.contacto,
    "Data Nascimento": new Date(infoUtilizador.data).toLocaleDateString(),
    Função: infoUtilizador.funcao,
  };

  const [dados, setDados] = useState({
    Email: infoUtilizador.email,
    Contacto: infoUtilizador.contacto,
    "Data Nascimento": new Date(infoUtilizador.data).toLocaleDateString(),
    Função: infoUtilizador.funcao,
  });

  const verificaAlteracaoDados = () => {
    if (dadosUtilizador.Email !== dados.Email) {
        return false;
    }
    if (dadosUtilizador.Contacto !== dados.Contacto) {
        return false;
    }
    if (dadosUtilizador["Data Nascimento"] !== dados["Data Nascimento"] ) {
        return false;
    }
    if (dadosUtilizador.Função !== dados.Função) {
        return false;
    }
    return true
  };

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <p className={styles.titulo}>Meu Perfil</p>
        <div className={styles.conteudo}>
          <div className={styles.foto}>
            <img
              src={`/Fotos-Perfil/${infoUtilizador.foto}`}
              alt="FotoPerfil"
              className={styles.fotoUtilizador}
            />
          </div>
          <div className={styles.modoDetalhes}>
            <p>Gestor</p>
          </div>
          <div className={styles.alterarPassword}>
            <MdEdit />
            <p>Alterar Password</p>
          </div>
          <h1>{infoUtilizador.nome}</h1>
          {campos.map((campo, index) => (
            <div className={styles.campo} key={index}>
              <label>
                <b>{campo}:</b>
              </label>
              <input
                type="text"
                value={dados[campo]}
                onChange={(e) =>
                  setDados((prev) => ({
                    ...prev,
                    [campo]: e.target.value,
                  }))
                }
                className={styles.inputCampo}
              />
            </div>
          ))}
          <button type="submit" className={styles.botaoGuardar} disabled={verificaAlteracaoDados()}>
            Guardar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
