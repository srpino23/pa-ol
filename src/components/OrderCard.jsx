import React from "react";

import styles from "../assets/styles/orderCard.module.css";

export default function OrderCard() {
  return (
    <div className={styles.orderBox}>
      <div className={styles.cardTop}>
        <p>Pedido</p>
        <div className={styles.eye}>
          <img src="src/assets/eyeIcon.svg" alt="" />
        </div>
      </div>
      <hr />
      <div className={styles.toolLine}>
        <p>Martillo</p>
        <p>3</p>
      </div>
      <div className={styles.toolLine}>
        <p>Destornillador</p>
        <p>3</p>
      </div>
      <div className={styles.toolLine}>
        <p>Pinzas</p>
        <p>3</p>
      </div>

      <div className={`${styles.orderState} ${styles.Devuelto}`}>Pendiente</div>
    </div>
  );
}
