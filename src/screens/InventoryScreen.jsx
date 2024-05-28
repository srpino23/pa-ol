import React, { useState } from "react";
import Axios from "axios";

import "../assets/styles/InventoryScreen.css";

export default function InventoryScreen() {
  const [showModal, setShowModal] = useState(false);
  var [usernameInput, setUsername] = useState(localStorage.getItem("username"));
  var [passwordInput, setPassword] = useState(localStorage.getItem("password"));
  var [data, setData] = useState([]);

  useState(() => {
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
          setIsAdmin(response.data.data.isAdmin);
          setData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.post("http://localhost:2100/api/inventory/getInventory", {
      user: [
        {
          username: usernameInput,
          password: passwordInput,
        },
      ],
    })
      .then((response) => {
        if (response.data.data) {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="container">
      <div className="title">
        <h2>Inventario</h2>
        <button>Añadir material</button>
      </div>
      <hr />
      <div className="filter">
        <input type="text" placeholder="Buscar..." />
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dato, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{dato.name}</td>
              <td>{dato.type}</td>
              <td>{dato.quantity}</td>
              <td>
                <div className="actions">
                  <button
                    className="primary"
                    onClick={() => setShowModal(true)}
                  >
                    Modificar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <div className="header">
              <h2>Detalles</h2>
              <button className="close" onClick={() => setShowModal(false)}>
                X
              </button>
            </div>

            <div className="details">
              <p>Detalles del elemento</p>

              <div className="elementDetail">
                <div className="element">
                  <p className="title">Nombre:</p>
                  <p>Martillo</p>
                </div>
                <div className="element">
                  <p className="title">Cantidad:</p>
                  <p>3</p>
                </div>
                <div className="element">
                  <p className="title">Tipo:</p>
                  <p>Carpintero</p>
                </div>
              </div>
            </div>

            <div className="footer">
              <button className="confirm">Guardar</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
