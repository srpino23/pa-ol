import React, { useState } from "react";
import Axios from "axios";

import styles from "../assets/styles/homeScreen.module.css";

export default function HomeScreen() {
  const [usernameInput, setUsername] = useState("");
  const [passwordInput, setPassword] = useState("");
  const isLocalLogged = JSON.parse(localStorage.getItem("isLogged"));
  const isLocalAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  useState(() => {
    if (isLocalLogged && isLocalAdmin) {
      window.location.href = "/pedidos";
    } else if (isLocalLogged && !isLocalAdmin) {
      window.location.href = "/hacerPedido";
    }
  });

  function getUser() {
    // manejar datos con axios
    Axios.post("http://localhost:2100/api/account/getUser", {
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

          localStorage.setItem("isLogged", true);
          localStorage.setItem("isAdmin", isAdmin);
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getUser();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.login}>
          <h3>Inicio de Sesion</h3>
          <div className={styles.inputs}>
            <label htmlFor="">Usuario</label>
            <input
              type="text"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="">Contraseña</label>
            <input
              type="password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={styles.loginBtn}>
            <button onClick={() => getUser()} id="loginBtn">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
