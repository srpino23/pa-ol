import Axios from "axios";
import React, { useState } from "react";
import OrderCard from "../components/OrderCard";

import styles from "../assets/styles/madeOrderScreen.module.css";

export default function MadeOrderScreen() {
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

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
          setAllOrders(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.post("http://localhost:2100/api/account/getUser", {
      user: [
        {
          username: username,
          password: password,
        },
      ],
    })
      .then((response) => {
        if (response.data.data) {
          setOrders(response.data.data.ordersHistory);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    getUserOrders();
  });

  function getUserOrders() {
    orders.map((element) => {
      allOrders.map((order) => {
        if (order._id === element) {
          const newUserOrders = [...userOrders, order];
          setUserOrders(newUserOrders);
        }
      });
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Hacer pedido</h2>
        <button>+</button>
      </div>
      <hr />
      <div className={styles.orders}>
        {orders.map((order) => (
          <OrderCard />
        ))}
      </div>
    </div>
  );
}
