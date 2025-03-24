import React from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ filtroNome, setfiltroNome }) => {
  return (
    <div className={styles.searchBar}>
      <FaSearch className={styles.iconBotao}/>
      <input
        type="text"
        placeholder="Pesquisar por utilizador..."
        value={filtroNome}
        onChange={(e) => setfiltroNome(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
