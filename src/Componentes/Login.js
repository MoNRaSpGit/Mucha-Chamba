import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/tarjetas.css";

const Login = ({ onAuthenticate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const generateRandomCredentials = () => {
    const randomUsername = `user${Math.random().toString(36).substring(2, 8)}`;
    const randomPassword = Math.random().toString(36).substring(2, 10);
    setUsername(randomUsername);
    setPassword(randomPassword);
  };

  const handleAutoLogin = async () => {
    try {
      const loginResponse = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (loginResponse.ok) {
        const data = await loginResponse.json();
        setMessage(`¡Bienvenido de nuevo, ${data.username}!`);
        localStorage.setItem("isAuthenticated", "true");
        onAuthenticate();
        setTimeout(() => navigate("/home"), 1000);
      } else if (loginResponse.status === 404) {
        const registerResponse = await fetch("http://localhost:3001/register", {
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
          setMessage("Error al registrar usuario.");
        }
      } else {
        setMessage("Error al iniciar sesión.");
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
    <div className="login-container">
      <div className="login-form">
        <h2>Inicio de Sesión</h2>
        <form>
          <input type="text" value={username} readOnly placeholder="Usuario" />
          <input type="password" value={password} readOnly placeholder="Contraseña" />
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleAutoLogin}
          >
            Login Automático
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;
