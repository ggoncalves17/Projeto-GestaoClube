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
          email: res.data.utilizador.email,
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