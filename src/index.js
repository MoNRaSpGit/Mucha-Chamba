import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap primero
import './Css/tarjetas.css'; // Tus estilos después
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Cambia a HashRouter
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
