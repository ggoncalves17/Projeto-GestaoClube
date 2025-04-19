import React, { useState } from 'react'
import { useParams, useLoaderData, redirect, useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './DetalhesJogadores.module.css'
import {MdOutlineArrowBackIosNew} from "react-icons/md";
import { differenceInYears } from 'date-fns';

const jogadorLoader = async ({ params }) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/info-jogador/${params.id}/`, {
      withCredentials: true,
    });
    return res.data; 
  } 
  catch (err) {   

    if (err.response.status === 403) {
      return redirect("/login");
    }
    else if (err.response.status == 404) {
      return redirect("/*");
    }
  }
};

const DetalhesJogadores = () => {

  const navigate = useNavigate()

  const infoJogador = useLoaderData();  

  const [opcaoAtual, setOpcaoAtual] = useState("Dados Pessoais")  
  const opcoes = ["Dados Pessoais", "Equipas", "Inscrições"] 

  const campos = ["Tipo", "Sexo", "Data de Nascimento", "Nacionalidade", "Cartão de Cidadão", "Validade CC", "Peso", "Altura", "Modalidade", "Posição"]
  const info = {
    "Tipo" : infoJogador.tipo,
    "Sexo" : infoJogador.sexo,
    // Referência -> https://forum.freecodecamp.org/t/how-to-convert-date-to-dd-mm-yyyy-in-react/431093/2 e https://date-fns.org/v4.1.0/docs/differenceInYears
    "Data de Nascimento" : new Date(infoJogador.data_nascimento).toLocaleDateString() + " ( " + differenceInYears(new Date(), infoJogador.data_nascimento) + " Anos )",
    "Nacionalidade" : infoJogador.nacionalidade,
    "Cartão de Cidadão" : infoJogador.cartao_cidadao ? infoJogador.cartao_cidadao : "-",
    "Validade CC" : infoJogador.data_validade_cc ? infoJogador.data_validade_cc : "-",
    // Referência -> https://stackoverflow.com/questions/46554765/format-javascript-input-numbers-as-float-with-two-decimal-places-and-enforce-on
    "Peso" : infoJogador.peso ? infoJogador.peso.toFixed(1) + " Kg" : "-",
    "Altura" : infoJogador.altura ? infoJogador.altura.toFixed(2) + " m " : "-",
    "Modalidade" : infoJogador.modalidade ? infoJogador.modalidade.nome : "-",
    "Posição" : infoJogador.posicao ? infoJogador.posicao : "-",
  }

  return (
    <div className={styles.estrutura}>
      <div className={styles.painel}>
        <div className={styles.painelSuperior}>
          <div className={styles.voltarAtras} onClick={() => navigate("/utilizadores/jogadores")}>
            <MdOutlineArrowBackIosNew />
            <p>Voltar Atrás</p>
          </div>
          <hr />
            <div className={styles.header}>
                <div className={styles.foto}>
                  <img src={`/Fotos-Jogadores/${infoJogador.foto}`} alt="FotoJogador" className={styles.fotoJogador}/>    
                </div>
                <div className={styles.infoBasica}>
                  <div className={styles.nomeJogador}>
                    <h3>{infoJogador.nome}</h3>
                    <div className={styles.modoDetalhes}>
                      {infoJogador.tipo === "Jogador" ? <p>Jogador</p> : <p>Treinador</p>}
                    </div>
                  </div>
                  <div className={styles.nomeClube}>
                    <img className={styles.fotoClube} src={`/Fotos-Clube/${infoJogador.clube.foto}`} alt="LogoClube" />
                    {infoJogador.clube.nome}                   
                  </div>
                </div>
            </div>
        </div>
        <div className={styles.painelInferior}>
          <div className={styles.opcoes}>
            {opcoes.map((opcao, index) =>
              <li key={index} className={`${(opcaoAtual === opcao) ? styles.opcaoAtiva : styles.opcaoInativa}`}>{opcao}</li>
            )}
          </div>
          <hr />
          <div className={styles.conteudo}>
            <h3><u>Informações Pessoais</u></h3>
            <div className={styles.infoJogador}>
              {campos.map((campo, index) => 
                <div key={index}>
                  <p>{campo}</p>
                  <h4>{info[campo]}</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { DetalhesJogadores as default, jogadorLoader };
