import React from "react";
import styles from "../css/CardDocumento.module.css";
import { FaRegFileAlt } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import fileDownload from "js-file-download";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";

const CardDocumento = ({ tipo, inscricao, nomeFicheiro }) => {
  const BASE_URL = "http://localhost:8000";

  // Referência -> https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
  const handleDownload = (url, nome) => {
    axios
      .get(url, {
        responseType: "blob",
        withCredentials: true,
      })
      .then((res) => {
        fileDownload(res.data, nome);
      })
      .catch((err) => {
        console.error("Erro ao fazer download:", err);
      });
  };
  return (
    <div className={styles.linhaDocumento}>
      <div className={styles.divInfoDocumento}>
        <div className={styles.divIconDocumento}>
          <FaRegFileAlt
            className={`${styles.iconDocumento} ${styles.iconFicheiro}`}
          />
        </div>
        <p>{tipo}</p>
      </div>
      <button
        className={styles.btnDownload}
        onClick={() =>
          handleDownload(
            `${BASE_URL}${inscricao[nomeFicheiro]}`,
            `${nomeFicheiro}.pdf`
          )
        }
      >
        <IoMdDownload className={styles.iconDocumento} />
        <p>Download</p>
      </button>
    </div>
  );
};

export default CardDocumento;
