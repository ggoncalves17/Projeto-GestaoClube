import React, { useEffect, useState } from "react";
import styles from "../../../css/Categorias.module.css";
import SearchBar from "../../../components/SearchBar";
import Dropdown from "../../../components/Dropdown";

const PainelBotoesQuotas = ({ filtros, anos }) => {
  const meses = {
    Todos: "Todos",
    Janeiro: 1,
    Fevereiro: 2,
    Março: 3,
    Abril: 4,
    Maio: 5,
    Junho: 6,
    Julho: 7,
    Agosto: 8,
    Setembro: 9,
    Outubro: 10,
    Novembro: 11,
    Dezembro: 12,
  };

  return (
    <div className={styles.painelBotoes}>
      <div className={styles.links}>
        <SearchBar filtro={filtros.nome} setFiltro={filtros.setNome} />
        <Dropdown
          tipo={filtros.mes}
          setTipo={filtros.setMes}
          dados={Object.keys(meses)}
          campo="Mês"
        />
        <Dropdown
          tipo={filtros.ano}
          setTipo={filtros.setAno}
          dados={anos}
          campo="Ano"
        />
        <Dropdown
          tipo={filtros.tipo}
          setTipo={filtros.setTipo}
          dados={["Todos", "Mensal", "Anual", "Inscrição"]}
          campo="Tipo"
        />
        <Dropdown
          tipo={filtros.estado}
          setTipo={filtros.setEstado}
          dados={["Todos", "Pago", "Pendente", "Atrasado"]}
          campo="Estado"
        />
      </div>
    </div>
  );
};

export default PainelBotoesQuotas;
