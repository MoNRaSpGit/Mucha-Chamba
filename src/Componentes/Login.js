import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Slice/userSlice"; // Importar acción para guardar usuario registrado
import "../Css/login.css";
import Register from "./Register"; // Importar el componente de registro

const Login = ({ onAuthenticate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // Estado para alternar entre login y registro

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // URLs para backend
 // const LOCAL_URL = "http://localhost:3001";
 const SERVER_URL = "https://chamba-back.onrender.com";

  // Cambiar entre local y servidor según necesidad
  //const BACKEND_URL = LOCAL_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Limpiar mensajes anteriores
    setIsLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Inicio de sesión exitoso");

        // Guardar usuario en el store global
        dispatch(setUser(data.user));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(data.user)); // Guardar datos en localStorage
        onAuthenticate(); // Actualizar estado global de autenticación
        navigate("/home"); // Redirigir al home
      } else {
        setMessage(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setMessage("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return showRegister ? (
    // Mostrar el componente Register si showRegister es true
    <Register onSwitchToLogin={() => setShowRegister(false)} />
  ) : (
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
        <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "20px" }}>
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: isLoading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: isLoading ? "not-allowed" : "pointer",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        <p style={{ marginTop: "15px", fontSize: "14px", color: "red" }}>
          {message}
        </p>
        <p
          style={{
            marginTop: "15px",
            fontSize: "14px",
            color: "#007bff",
            cursor: "pointer",
          }}
          onClick={() => setShowRegister(true)} // Mostrar registro al hacer clic
        >
          ¿No tienes cuenta? <strong>Regístrate aquí</strong>
        </p>
      </div>
    </div>
  );
};

export default Login;
