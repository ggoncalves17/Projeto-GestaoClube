import React from "react";
import LogoCoja from "../assets/LogoCoja.png";
import "./Login.css";

const Login = () => {
  return (
    <div id="divteste">
      <div id="box-Login">
        <div id="imagem-Login">
          <img id="logo-Login" src={LogoCoja} alt="LogoClube" />
        </div>
        <div id="texto-Login">
          <h2>Bem Vindo!</h2>
          <h2>Iniciar Sessão</h2>

          <form>
            <input name="email" placeholder="Email" />
            <input type="email" name="password" placeholder="Password" />
            <button>Entrar</button>
          </form>

          <a id="corAzul-Login" href="#">
            Esqueceu-se da password? Clique aqui.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
