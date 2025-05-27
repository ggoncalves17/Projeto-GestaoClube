import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { listaUtilizadoresDisponiveis } from "../api/Socios/api";

export default function InputAutocomplete({ onSelecionar }) {
  const [inputValue, setInputValue] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Autocomplete
      sx={{ marginTop: "15px"}}
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
          {...params}
          label="Sócio"
          placeholder="Pesquise o utilizador..."
        />
      )}
    />
  );
}
