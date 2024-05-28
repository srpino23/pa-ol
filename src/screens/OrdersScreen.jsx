import React, { useState } from "react";
import Axios from "axios";

import "../assets/styles/orderScreen.css";

export default function OrderScreen() {
  const [showModal, setShowModal] = useState(false);
  var [usernameInput, setUsername] = useState(localStorage.getItem("username"));
  var [passwordInput, setPassword] = useState(localStorage.getItem("password"));
  var [data, setData] = useState([]);
  var [materials, setMaterials] = useState([]);

  useState(() => {
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
          setIsAdmin(response.data.data.isAdmin);
          setData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.post("http://pinotech.v6.army:2100/api/order/getOrders", {
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
          setMaterials(response.data.data[0].materials);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="container">
      <div className="title">
        <h2>Pedidos</h2>
      </div>
      <hr />
      <div className="filter">
        <input type="text" placeholder="Buscar..." />
        <div className="options">
          <select>
            <option value="all">Todos</option>
            <option value="pending">Pendiente</option>
            <option value="withdrawn">Retirar</option>
            <option value="delivered">Entregado</option>
            <option value="returned">Devuelto</option>
          </select>
        </div>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Profesor</th>
            <th>Curso</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dato, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{dato.teacher}</td>
              <td>{dato.grade}</td>
              <td>
                <div className="status">
                  <p className={dato.state}>{dato.state}</p>
                </div>
              </td>
              <td>
                <div className="actions">
                  <button
                    className="primary"
                    onClick={() => setShowModal(true)}
                  >
                    Ver pedido
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
              <h2>Detalles del pedido</h2>
              <button className="close" onClick={() => setShowModal(false)}>
                X
              </button>
            </div>

            <div className="details">
              <p>Lista de herramientas</p>

              <div className="order">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((dato, index) => (
                      <tr key={index}>
                        <td>{dato.name}</td>
                        <td>{dato.type}</td>
                        <td>{dato.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="footer">
              <button className="confirm">Confirmar pedido</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}