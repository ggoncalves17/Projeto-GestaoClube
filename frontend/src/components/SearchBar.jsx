import React from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ filtro, setFiltro }) => {
  return (
    <div className={styles.searchBar}>
      <FaSearch className={styles.iconBotao}/>
      <input
        type="text"
        placeholder="Pesquisar por utilizador..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
