import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideBar from "./SideBar";
import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import InventoryScreen from "../screens/InventoryScreen";
import MadeOrderScreen from "../screens/MadeOrderScreen";

import styles from "../assets/styles/navigation.module.css";

export default function Navigation() {
  return (
    <Router>
      <div className={styles.mainContainer}>
        <SideBar />

        <div className={styles.subContainer}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/pedidos" element={<OrdersScreen />} />
            <Route path="/inventario" element={<InventoryScreen />} />
            <Route path="/hacerPedido" element={<MadeOrderScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
