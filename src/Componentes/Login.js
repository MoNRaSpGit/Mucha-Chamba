import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        localStorage.setItem("isAuthenticated", "true"); // Guardar estado de autenticación
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
          localStorage.setItem("isAuthenticated", "true"); // Guardar estado de autenticación
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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Inicio de Sesión</h2>
      <form>
        <div>
          <label>
            Nombre de Usuario:
            <input
              type="text"
              value={username}
              readOnly
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              readOnly
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleAutoLogin}
        >
          Login Automático
        </button>
      </form>
      <p style={{ marginTop: "20px", color: "green" }}>{message}</p>
    </div>
  );
};

export default Login;
