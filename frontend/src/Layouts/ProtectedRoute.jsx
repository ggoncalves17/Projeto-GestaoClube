import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import { UtilizadorContext } from '../context/UtilizadorContext';

const ProtectedRoute = ({ children }) => {

  const[isAutenticado, setIsAutenticado] = useState(null)
  const { setUtilizador } = useContext(UtilizadorContext)

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/verificaAutenticacao/", { withCredentials: true })
      .then((res) => {
        setIsAutenticado(true);            
        setUtilizador({
          id: res.data.utilizador.id,
          nome: res.data.utilizador.nome,
          foto: res.data.utilizador.foto,
          data: res.data.utilizador.data_nascimento,
          contacto: res.data.utilizador.contacto,
          email: res.data.utilizador.email,
          funcao: res.data.utilizador.funcao,
          id_clube: res.data.utilizador.clube.id,
          nome_clube: res.data.utilizador.clube.nome,
          foto_clube: res.data.utilizador.clube.foto,
        });
      })
      .catch((err) => {
        setIsAutenticado(false);
        console.log("Não Verificado")
        console.log(err)
      })
  }, []);

  if(isAutenticado === null) {
    return <div>A carregar...</div>
  }

  return isAutenticado ? children : <Navigate to="/login"/>

}

export default ProtectedRoute