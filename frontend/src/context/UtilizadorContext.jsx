import React from "react";
import { createContext, useState } from "react";

const UtilizadorContext = createContext();
 
const UtilizadorProvider = ({ children }) => {
  const [utilizador, setUtilizador] = useState(null);

  return (
    <UtilizadorContext.Provider value={{ utilizador, setUtilizador }}>
        { children }
    </UtilizadorContext.Provider>
  );
};

export { UtilizadorProvider, UtilizadorContext };
