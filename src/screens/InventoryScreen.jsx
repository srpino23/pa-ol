import React, { useState } from "react";
import Axios from "axios";

import styles from "../assets/styles/InventoryScreen.module.css";

export default function InventoryScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");
  var [data, setData] = useState([]);
  var [initialData, setInitialData] = useState([]);
  const [search, setSearch] = useState("");
  var [name, setName] = useState("");
  var [type, setType] = useState("");
  var [quantity, setQuantity] = useState("");
  var [materialId, setMaterialId] = useState("");

  const fetchData = async () => {
    Axios.post("http://10.0.15.65:2100/api/inventory/getInventory", {
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      setData(
        initialData.filter((material) =>
          material.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setData(initialData);
    }
  };

  const addMaterial = async () => {
    Axios.post("http://10.0.15.65:2100/api/inventory/newMaterial", {
      user: [
        {
          username: username,
          password: password,
        },
      ],
      newMaterial: [
        {
          name: name,
          type: type,
          quantity: quantity,
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

    setName("");
    setType("");
    setQuantity("");
    fetchData();
    setShowModal2(false);
  };

  const editMaterial = () => {
    Axios.post("http://10.0.15.65:2100/api/inventory/updateMaterialQuantity", {
      user: [
        {
          username: username,
          password: password,
        },
      ],
      material: [
        {
          name: name,
          type: type,
          quantity: quantity,
        },
      ],
    })
      .then((response) => {
        if (response.data.data) {
          console.log(response.data.data);
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setName("");
    setType("");
    setQuantity("");
    fetchData();
    setShowModal(false);
  };

  const getDataMaterial = (dato) => {
    setShowModal(true);
    setName(dato.name);
    setType(dato.type);
    setQuantity(dato.quantity);
  };

  const deleteMaterial = () => {
    Axios.post("http://10.0.15.65:2100/api/inventory/deleteMaterial", {
      user: [
        {
          username: username,
          password: password,
        },
      ],
      id: materialId,
    });

    fetchData();
    setShowModal3(false);
  };

  const getDataMaterial2 = (dato) => {
    setShowModal3(true);
    setName(dato.name);
    setType(dato.type);
    setQuantity(dato.quantity);
    setMaterialId(dato._id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Inventario</h2>
        <button onClick={() => setShowModal2(true)}>Añadir material</button>
      </div>
      <hr />
      <div className={styles.filter}>
        <input
          type="text"
          placeholder="Buscar..."
          value={search || ""}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <hr />
      <div className={styles.orders}>
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
                      onClick={() => getDataMaterial(dato)}
                    >
                      Modificar
                    </button>
                    <button
                      className={styles.secondary}
                      onClick={() => getDataMaterial2(dato)}
                    >
                      <p>
                        <svg
                          fill="#ffffff"
                          viewBox="-2.94 0 31.716 31.716"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#ffffff"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g transform="translate(-355.957 -579)">
                              {" "}
                              <path d="M376.515,610.716H361.231a2.361,2.361,0,0,1-2.358-2.359V584.1a1,1,0,0,1,2,0v24.255a.36.36,0,0,0,.358.359h15.284a.36.36,0,0,0,.358-.359V584.1a1,1,0,0,1,2,0v24.255A2.361,2.361,0,0,1,376.515,610.716Z"></path>{" "}
                              <path d="M365.457,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,365.457,604.917Z"></path>{" "}
                              <path d="M372.29,604.917a1,1,0,0,1-1-1v-14a1,1,0,0,1,2,0v14A1,1,0,0,1,372.29,604.917Z"></path>{" "}
                              <path d="M380.79,585.1H356.957a1,1,0,0,1,0-2H380.79a1,1,0,0,1,0,2Z"></path>{" "}
                              <path d="M372.79,581h-7.917a1,1,0,1,1,0-2h7.917a1,1,0,0,1,0,2Z"></path>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </p>
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
                  <p>{name}</p>
                </div>
                <div className={styles.element}>
                  <p className={styles.title}>Tipo:</p>
                  <p>{type}</p>
                </div>
                <div className={styles.element}>
                  <p className={styles.title}>Cantidad:</p>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <button className={styles.confirm} onClick={() => editMaterial()}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showModal2 ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <h2>Añadir herramienta</h2>
              <button
                className={styles.close}
                onClick={() => setShowModal2(false)}
              >
                X
              </button>
            </div>

            <div className={styles.details}>
              <p>Datos de la herramienta</p>

              <div className={styles.order}>
                <div className={styles.toolData}>
                  <p>Nombre</p>
                  <input
                    type="text"
                    placeholder="EJ: Martillo"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.toolData}>
                  <p>Tipo</p>
                  <input
                    type="text"
                    placeholder="EJ: Madera"
                    value={type || ""}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div className={styles.toolData}>
                  <p>Cantidad</p>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="EJ: Martillo"
                    value={quantity || ""}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <button onClick={addMaterial} className={styles.confirm}>
                Añadir
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showModal3 ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <h2>Eliminar herramienta</h2>
              <button
                className={styles.close}
                onClick={() => setShowModal3(false)}
              >
                X
              </button>
            </div>

            <div className={styles.footer2}>
              <p>Esta seguro de eliminar la herramienta?</p>
              <button onClick={deleteMaterial} className={styles.confirm}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
