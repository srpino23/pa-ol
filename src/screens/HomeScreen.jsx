import React, { useState } from "react";
import Axios from "axios";

import "../assets/styles/homeScreen.css";

export default function HomeScreen() {
  const [usernameInput, setUsername] = useState("");
  const [passwordInput, setPassword] = useState("");

  function getUser() {
    // manejar datos con axios
    Axios.post("http://pinotech.v6.army:2100/api/account/getUser", {
      user: [
        {
          username: usernameInput,
          password: passwordInput,
        },
      ],
    })
      .then((response) => {
        if (response.data.data) {
          var username = response.data.data.username;
          var password = response.data.data.password;
          var isAdmin = response.data.data.isAdmin;

          localStorage.setItem("isLogged", "true");
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);

          if (isAdmin) {
            window.location.href = "/pedidos";
          } else {
            window.location.href = "/hacerPedido";
          }
        } else {
          alert("Usuario y/o contraseaña incorrectos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="loginContainer">
        <div className="login">
          <h3>Inicio de Sesion</h3>
          <div className="inputs">
            <label htmlFor="">Usuario</label>
            <input
              type="text"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="">Contraseña</label>
            <input
              type="password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="loginBtn">
            <button onClick={() => getUser()}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
