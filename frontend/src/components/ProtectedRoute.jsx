import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const utilizador = true

  return utilizador ? children : <Navigate to="/login"/>

}

export default ProtectedRoute