import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import UserList from "./Componentes/UserList";
import Login from "./Componentes/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar el estado de autenticación desde localStorage
  useEffect(() => {
    const authState = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authState === "true");
  }, []);

  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      {/* Página de login */}
      <Route
        path="/"
        element={<Login onAuthenticate={() => setIsAuthenticated(true)} />}
      />
      
      {/* Página principal (UserList) */}
      <Route
        path="/home"
        element={
          isAuthenticated ? (
            <UserList onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      
      {/* Redirección para rutas no definidas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
