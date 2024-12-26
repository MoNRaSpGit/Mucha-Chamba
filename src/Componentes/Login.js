import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onAuthenticate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Generar credenciales aleatorias
  const generateRandomCredentials = () => {
    const randomUsername = `user${Math.random().toString(36).substring(2, 8)}`;
    const randomPassword = Math.random().toString(36).substring(2, 10);
    setUsername(randomUsername);
    setPassword(randomPassword);
  };

  // Manejo del registro automático
  const handleRegisterAndNavigate = async () => {
    try {
      const registerResponse = await fetch("https://chamba-back.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email: username, password }),
      });

      if (registerResponse.ok) {
        setMessage("Usuario registrado automáticamente. ¡Bienvenido!");
        localStorage.setItem("isAuthenticated", "true");
        onAuthenticate();
        setTimeout(() => navigate("/home"), 1000);
      } else {
        const errorData = await registerResponse.json();
        setMessage(errorData.error || "Error al registrar usuario.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error en el servidor.");
    }
  };

  useEffect(() => {
    generateRandomCredentials();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px 40px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "20px" }}>Registro Automático</h2>
        <form>
          <input
            type="text"
            value={username}
            readOnly
            placeholder="Usuario"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <input
            type="password"
            value={password}
            readOnly
            placeholder="Contraseña"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <button
            type="button"
            onClick={handleRegisterAndNavigate}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
          >
            Login Automatico
          </button>
        </form>
        <p style={{ marginTop: "15px", fontSize: "14px", color: "green" }}>{message}</p>
      </div>
    </div>
  );
};

export default Login;
