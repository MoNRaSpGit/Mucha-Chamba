import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap primero
import './Css/tarjetas.css'; // Tus estilos personalizados después
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Importa el proveedor de Redux
import store from "../src/store/store"; // Importa tu store configurado
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Proveer el store para toda la app */}
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
