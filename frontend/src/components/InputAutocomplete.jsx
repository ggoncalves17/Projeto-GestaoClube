import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { listaUtilizadoresDisponiveis } from "../api/Socios/api";
import { red } from "@mui/material/colors";

export default function InputAutocomplete({ onSelecionar }) {
  const [inputValue, setInputValue] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Autocomplete
      sx={{ marginTop: "15px", bgcolor: 'white', color: 300}}
      options={opcoes}
      loading={loading}
      getOptionLabel={(opcao) => opcao.nome}
      onInputChange={(event, valor) => {
        setInputValue(valor);
        if (valor.length >= 2) {
          listaUtilizadoresDisponiveis(valor, setOpcoes, setLoading);
        } else {
          setOpcoes([]);
        }
      }}
      onChange={(event, opcaoSelecionada) => {
        if (opcaoSelecionada) onSelecionar(opcaoSelecionada.id);
      }}
      renderInput={(params) => (
        <TextField
          sx={{ color: '300'}}
          {...params}
          label="Sócio"
          placeholder="Pesquise o utilizador..."
        />
      )}
    />
  );
}
