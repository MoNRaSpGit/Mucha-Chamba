import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserList from "./Componentes/UserList";
import Login from "./Componentes/Login";
import NotificationBell from "./Componentes/NotificationBell";

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
    <div>
      {/* Encabezado */}
      <header className="header-container">
        <div className="header-content">
          <h1 className="header-title">Chamba Ya!!!</h1>
          <NotificationBell />
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mt-4">
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
      </main>
    </div>
  );
};

export default App;
