import React, { useState, useEffect } from "react";
import FotoDefault from "/Fotos-Perfil/foto-default.png";

export function usePreviewFotoPerfil (jogador, modo, caminhoFoto)  {
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(FotoDefault);

  // Referência -> https://stackoverflow.com/a/57781164
  useEffect(() => {
    if (fotoPerfil) {
      const objectUrl = URL.createObjectURL(fotoPerfil);
      setPreviewFoto(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    if (modo === "Adicionar") {
      setPreviewFoto(FotoDefault);
    } 
    else if (caminhoFoto) {

      if (jogador) {
        setPreviewFoto(`/Fotos-Jogadores/${caminhoFoto}`);
      }
      else {
        setPreviewFoto(`/Fotos-Perfil/${caminhoFoto}`);
      }
      
    }
    else{
      setPreviewFoto(FotoDefault);
    }

  }, [fotoPerfil, caminhoFoto]);

  const alteraPreviewFotoPerfil = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFotoPerfil(null);
      return;
    }

    setFotoPerfil(e.target.files[0]);
  };

  const resetaFotoPerfil = () => {
    setFotoPerfil(null);
  };

  return {
    fotoPerfil,
    previewFoto,
    alteraPreviewFotoPerfil,
    resetaFotoPerfil,
  };
};

