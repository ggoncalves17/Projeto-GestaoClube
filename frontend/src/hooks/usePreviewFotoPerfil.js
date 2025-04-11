import React, { useState, useEffect } from "react";
import FotoDefault from "../assets/Fotos-Perfil/foto-default.png";

export function usePreviewFotoPerfil ()  {
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(FotoDefault);

  // Referência -> https://stackoverflow.com/a/57781164
  useEffect(() => {
    if (!fotoPerfil) {
      setPreviewFoto(FotoDefault);
      return;
    }

    const objectUrl = URL.createObjectURL(fotoPerfil);
    setPreviewFoto(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [fotoPerfil]);

  const alteraPreviewFotoPerfil = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFotoPerfil(null);
      return;
    }

    setFotoPerfil(e.target.files[0]);
  };

  return {
    fotoPerfil,
    previewFoto,
    alteraPreviewFotoPerfil,
  };
};