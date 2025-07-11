import React, { useState } from "react";
import LogoCoja from "/Fotos-Clube/LogoCoja.png";
import { useNavigate, Link } from 'react-router-dom'
import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const navigate = useNavigate()

  const autenticaUtilizador = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/login/",
        {
          email: email,
          password: password,
        },
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
        setMensagemErro("");
        navigate("/")
      })
      .catch((err) => {
        console.log("Código do erro:", err.response.status);
        console.log("Mensagem do erro:", err.response.data.mensagem);
        setMensagemErro(err.response.data.mensagem);
      });
  };

  return (
    <div id="overlay">
      <div id="box-Login">
        <div id="imagem-Login">
          <img id="logo-Login" src={LogoCoja} alt="LogoClube" />
        </div>
        <div id="texto-Login">
          <h2>Bem Vindo!</h2>
          <h2>Iniciar Sessão</h2>

          {mensagemErro && <p id="erro"> {mensagemErro} </p>}

          <form onSubmit={autenticaUtilizador}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              required
            />
            <button type="submit">Entrar</button>
          </form>
          

          <Link id="corAzul-Login" to="/login/recuperar-password">
            Esqueceu-se da password? Clique aqui.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
