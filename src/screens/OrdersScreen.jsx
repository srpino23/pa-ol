import React, { useState } from "react";
import Axios from "axios";

import styles from "../assets/styles/orderScreen.module.css";

export default function OrderScreen() {
  const [showModal, setShowModal] = useState(false);
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");
  var [data, setData] = useState([]);
  var [materials, setMaterials] = useState([]);

  useState(() => {
    Axios.post("http://localhost:2100/api/order/getOrders", {
      user: [
        {
          username: username,
          password: password,
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
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Pedidos</h2>
      </div>
      <hr />
      <div className={styles.filter}>
        <input type="text" placeholder="Buscar..." />
        <div className={styles.options}>
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
                <div className={styles.status}>
                  <p className={styles[dato.state]}>{dato.state}</p>
                </div>
              </td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.primary}
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
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <h2>Detalles del pedido</h2>
              <button
                className={styles.close}
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>

            <div className={styles.details}>
              <p>Lista de herramientas</p>

              <div className={styles.order}>
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

            <div className={styles.footer}>
              <button className={styles.confirm}>Confirmar pedido</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
