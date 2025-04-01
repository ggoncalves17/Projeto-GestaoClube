import React, { useState } from "react";
import FotoDefault from "../../assets/foto-default.png";
import styles from "./Formulario.module.css";

const Formulario = ({ modo }) => {

  // Referência -> https://react.dev/reference/react/useState#examples-objects
  const [dadosFormulario, setDadosFormulario] = useState({
    tipo: "Gestor",
    nome: "",
    email: "",
    telefone: "",
    morada: "",
    imagem: "",
  });

  const [errosCampos, setErrosCampos] = useState({})

  // Função para validar adicionalmente o formulário, mesmo tendo o "required"
  const validaFormulario = () => {

    const erros = {}

    if(dadosFormulario.nome.trim() == "") {
      erros.nome = "Campo Obrigatório";
    }
    if(dadosFormulario.email.trim() == "") {
      erros.email = "Campo Obrigatório";
    }
    if(dadosFormulario.telefone.trim() == "") {
      erros.telefone = "Campo Obrigatório";
    }
    else if(!/^9\d{8}$/.test(dadosFormulario.telefone)) {
      erros.telefone = "Número de Telefone Inválido";
    }

    if(dadosFormulario.morada.trim() == "") {
      erros.morada = "Campo Obrigatório";
    }

    setErrosCampos(erros);

    // Referência -> https://stackoverflow.com/questions/46859574/reactjs-if-object-has-length
    return Object.keys(erros).length > 0 ? false : true 

  }

  const handleSubmissao = (event) => {
    event.preventDefault();

    if(validaFormulario()) {
      if(modo === "Adicionar") {
        console.log("Gestor Adicionado");    
      }
      else {
        console.log("Gestor Editado");    
      }
    }
    return;
  }

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
            <div className={styles.campo}>
              <label htmlFor="nome">Nome:</label>
              {errosCampos.nome && <p className={styles.erro}>{errosCampos.nome}</p>}
              <input 
                onChange={e => setDadosFormulario({...dadosFormulario, nome: e.target.value})}
                type="text"
                id="nome"
                placeholder="Ex: John Doe"
                value={dadosFormulario.nome}
                disabled={modo === "Detalhes"} 
                required={modo !== "Detalhes"} 
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="email">Email:</label>
              {errosCampos.email && <p className={styles.erro}>{errosCampos.email}</p>}
              <input 
                onChange={e => setDadosFormulario({...dadosFormulario, email: e.target.value})}
                type="email"
                id="email"
                placeholder="Ex: utilizador@gmail.com"
                value={dadosFormulario.email}
                disabled={modo === "Detalhes"} 
                required={modo !== "Detalhes"}
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="telefone">Telefone:</label>
              {errosCampos.telefone && <p className={styles.erro}>{errosCampos.telefone}</p>}
              <input 
                onChange={e => setDadosFormulario({...dadosFormulario, telefone: e.target.value})}
                type="number"
                id="telefone"
                placeholder="Ex: 910111222"
                value={dadosFormulario.telefone}
                disabled={modo === "Detalhes"} 
                required={modo !== "Detalhes"}
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="morada">Morada:</label>
              {errosCampos.morada && <p className={styles.erro}>{errosCampos.morada}</p>}
              <input 
                onChange={e => setDadosFormulario({...dadosFormulario, morada: e.target.value})}
                type="text"
                id="morada"
                placeholder="Ex: Rua do Utilizador"
                value={dadosFormulario.morada}
                disabled={modo === "Detalhes"} 
                required={modo !== "Detalhes"}
              />
            </div>

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
