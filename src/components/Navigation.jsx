import React, { useState } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideBar from "./SideBar";
import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import InventoryScreen from "../screens/InventoryScreen";
import HacerPedido from "../screens/HacerPedido";

import "../assets/styles/navigation.css";

export default function Navigation() {
  return (
    <Router>
      <div className="mainContainer">
        <SideBar />

        <div className="subContainer">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/pedidos" element={<OrdersScreen />} />
            <Route path="/inventario" element={<InventoryScreen />} />
            <Route path="/hacerPedido" element={<HacerPedido />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
