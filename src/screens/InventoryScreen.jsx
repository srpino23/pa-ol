import React, { useState } from "react";
import Axios from "axios";

import styles from "../assets/styles/InventoryScreen.module.css";

export default function InventoryScreen() {
  const [showModal, setShowModal] = useState(false);
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");
  var [data, setData] = useState([]);

  useState(() => {
    Axios.post("http://localhost:2100/api/inventory/getInventory", {
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Inventario</h2>
        <button>Añadir material</button>
      </div>
      <hr />
      <div className={styles.filter}>
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
                <div className={styles.actions}>
                  <button
                    className={styles.primary}
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
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <h2>Detalles</h2>
              <button
                className={styles.close}
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>

            <div className={styles.details}>
              <p>Detalles del elemento</p>

              <div className={styles.elementDetail}>
                <div className={styles.element}>
                  <p className={styles.title}>Nombre:</p>
                  <p>Martillo</p>
                </div>
                <div className={styles.element}>
                  <p className={styles.title}>Cantidad:</p>
                  <p>3</p>
                </div>
                <div className={styles.element}>
                  <p className={styles.title}>Tipo:</p>
                  <p>Carpintero</p>
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <button className={styles.confirm}>Guardar</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
