import Axios from "axios";
import React, { useState } from "react";
import OrderCard from "../components/OrderCard";

import styles from "../assets/styles/madeOrderScreen.module.css";

export default function MadeOrderScreen() {
  var [showModal, setShowModal] = useState(false);
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");
  var allOrders = [];
  var orders = [];
  var [userOrders, setUserOrders] = useState([]);
  var [inventory, setInventory] = useState([]);
  var [initialInventory, setInitialInventory] = useState([]);
  var [inputValues, setInputValues] = useState({});
  var [grade, setGrade] = useState("");
  var [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    await Axios.post("http://10.0.15.65:2100/api/order/getOrders", {
      user: [
        {
          username: username,
          password: password,
        },
      ],
    })
      .then((response) => {
        if (response.data.data) {
          allOrders = response.data.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await Axios.post("http://10.0.15.65:2100/api/account/getUser", {
      user: [
        {
          username: username,
          password: password,
        },
      ],
    })
      .then((response) => {
        if (response.data.data) {
          orders = response.data.data.ordersHistory;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    await Axios.post("http://10.0.15.65:2100/api/inventory/getInventory", {
      user: [
        {
          username: username,
          password: password,
        },
      ],
    })
      .then((response) => {
        if (response.data.data) {
          setInventory(response.data.data);
          setInitialInventory(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    getUserOrders(allOrders, orders);
  };

  useState(async () => {
    fetchData();
  });

  function getUserOrders(fullOrder, orders) {
    setUserOrders([]);
    orders.forEach((orderId) => {
      fullOrder.forEach((order) => {
        if (order._id === orderId) {
          setUserOrders((prevOrders) => [order, ...prevOrders]);
        }
      });
    });
  }

  const handleInputChange = (e, tool) => {
    const { value } = e.target;

    const updatedValues = { ...inputValues };

    if (value === "" || value === "0") {
      delete updatedValues[tool._id];
    } else {
      updatedValues[tool._id] = {
        name: tool.name,
        type: tool.type,
        quantity: value,
      };
    }

    setInputValues(updatedValues);
  };

  const newOrder = async () => {
    const materialsArray = Object.values(inputValues).map((input) => ({
      name: input.name,
      type: input.type,
      quantity: input.quantity,
    }));

    const toolToSend = {
      user: [
        {
          username: "test",
          password: "test",
        },
      ],
      newOrder: [
        {
          grade: grade,
          materials: materialsArray,
        },
      ],
    };

    await Axios.post("http://10.0.15.65:2100/api/order/newOrder", toolToSend)
      .then((response) => {
        if (response.data.data) {
          orders = response.data.data.ordersHistory;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setGrade("");
    setInputValues({});
    fetchData();
    setShowModal(false);
  };

  const searchMaterials = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      // Restablecer el inventario al estado inicial
      setInventory(initialInventory);
    } else {
      setInventory(
        initialInventory.filter((material) =>
          material.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Hacer pedido</h2>
        <button className={styles.primary} onClick={() => setShowModal(true)}>
          +
        </button>
      </div>
      <hr />
      <div className={styles.orders}>
        {userOrders.map((order) => (
          <OrderCard order={order} />
        ))}
      </div>
      {showModal ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <h2>Hacer un pedido</h2>
              <button
                className={styles.close}
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>

            <div className={styles.details}>
              <div className={styles.search}>
                <p>Lista de herramientas</p>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm || ""}
                  onChange={(e) => searchMaterials(e.target.value)}
                />
              </div>

              <div className={styles.order}>
                {inventory.map((tool, index) => (
                  <div key={index} className={styles.tool}>
                    <div className={styles.toolData}>
                      <p>{tool.name}</p>
                      <p>{tool.type}</p>
                      <p>{tool.quantity}</p>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="99"
                      placeholder="Cantidad"
                      value={inputValues[tool._id]?.quantity || ""}
                      onChange={(e) => handleInputChange(e, tool)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.footer}>
              <p>Curso</p>
              <input
                type="text"
                placeholder="EJ: 2c"
                value={grade || ""}
                onChange={(e) => setGrade(e.target.value)}
              />
              <button onClick={newOrder} className={styles.confirm}>
                Confirmar pedido
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
