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
    <Routes>
      {/* Página de login */}
      <Route
        path="/"
        element={
          <main className="container mt-4">
            <Login onAuthenticate={() => setIsAuthenticated(true)} />
          </main>
        }
      />

      {/* Página principal con encabezado */}
      <Route
        path="/home"
        element={
          isAuthenticated ? (
            <>
              <header className="header-container">
                <div className="header-content">
                  <h1 className="header-title">Chamba Ya!!!</h1>
                  <NotificationBell />
                </div>
              </header>
              <main className="container mt-4">
                <UserList onLogout={handleLogout} />
              </main>
            </>
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
