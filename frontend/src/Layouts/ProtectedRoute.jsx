import React from 'react'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {

  const[isAutenticado, setIsAutenticado] = useState(null)

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/verificaAutenticacao/", { withCredentials: true })
      .then((res) => {
        setIsAutenticado(true);
        console.log("Verificado")
        console.log(res)
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