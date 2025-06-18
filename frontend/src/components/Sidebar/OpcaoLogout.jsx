import React from "react";
import Sair from "../../assets/Icons-Sidebar/logout.png";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const OpcaoLogout = ({ isExpandido }) => {
  const navigate = useNavigate();

  const realizaLogout = () => {
    axios
      .post(
        "http://localhost:8000/api/logout/",
        {},
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Resposta do Backend: ", res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Mensagem do erro:", err.response.data);
      });
  };

  return (
    <li className={styles.sair} onClick={realizaLogout}>
      <img className={styles.icon} src={Sair} alt="IconSair" />
      {isExpandido && "Sair"}
    </li>
  );
};

export default OpcaoLogout;
