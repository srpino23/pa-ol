import React from "react";

import styles from "../assets/styles/orderCard.module.css";

export default function OrderCard({ order }) {
  // formatear la fecha a dd/mm/yyyy

  var date = new Date(order.date);
  var day = date.getDate();
  date = `${day}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <div className={styles.orderBox}>
      <div>
        <div className={styles.cardTop}>
          <p>Pedido</p>
          <p>{date}</p>
        </div>
        <hr />
        {order.materials.map((material, index) => (
          <div className={styles.toolLine}>
            <p>{material.name}</p>
            <p>{material.quantity}</p>
          </div>
        ))}
      </div>

      <div className={`${styles.orderState} ${styles[order.state]}`}>
        {order.state}
      </div>
    </div>
  );
}
