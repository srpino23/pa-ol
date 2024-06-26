import React, { useState } from "react";
import Axios from "axios";

import styles from "../assets/styles/orderScreen.module.css";

export default function OrderScreen() {
  const [showModal, setShowModal] = useState(false);
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");
  var [data, setData] = useState([]);
  var [initialData, setInitialData] = useState([]);
  var [materials, setMaterials] = useState([]);

  const fetchData = () => {
    Axios.post("http://10.0.15.65:2100/api/order/getOrders", {
      user: [
        {
          username: username,
          password: password,
        },
      ],
    })
      .then((response) => {
        if (response.data.data) {
          setData(
            response.data.data.filter((dato) =>
              dato.state.includes("Pendiente")
            )
          );
          setInitialData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useState(() => {
    fetchData();
  });

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value !== "Todos") {
      setData(initialData.filter((dato) => dato.state.includes(value)));
    } else {
      setData(initialData);
    }
  };

  const changeStatus = (status, id) => {
    Axios.post("http://10.0.15.65:2100/api/order/updateOrderState", {
      user: [
        {
          username: username,
          password: password,
        },
      ],
      order: [
        {
          orderId: id,
          state: status,
        },
      ],
    })
      .then((response) => {
        if (response.data.data) {
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirm = () => {
    console.log(materials._id);
    console.log(materials.state);
    switch (materials.state) {
      case "Pendiente":
        {
          changeStatus("Retirar", materials._id);
        }
        break;
      case "Retirar":
        {
          changeStatus("Entregado", materials._id);
        }
        break;
      case "Entregado":
        {
          changeStatus("Devuelto", materials._id);
        }
        break;
    }
    setShowModal(false);
  };

  const getOrderMaterials = (dato) => {
    setShowModal(true);
    setMaterials(dato);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Pedidos</h2>
        <div className={styles.filter}>
          <div className={styles.options}>
            <select onChange={(e) => handleFilter(e)}>
              <option value="Todos">Todos</option>
              <option value="Pendiente" selected>
                Pendiente
              </option>
              <option value="Retirar">Retirar</option>
              <option value="Entregado">Entregado</option>
              <option value="Devuelto">Devuelto</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.orders}>
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
                <td>{dato._id.slice(-4)}</td>
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
                      onClick={() => getOrderMaterials(dato)}
                    >
                      Ver pedido
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                    {materials.materials.map((dato, index) => (
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
              <button onClick={handleConfirm} className={styles.confirm}>
                Confirmar pedido
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
