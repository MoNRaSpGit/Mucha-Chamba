import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Slice/userSlice";
import "../Css/registros.css";


const Register = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  //const LOCAL_URL = "http://localhost:3001";
  const SERVER_URL = "https://chamba-back.onrender.com";
  //const BACKEND_URL = LOCAL_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${SERVER_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, address, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Usuario registrado exitosamente");
        dispatch(setUser({ username, email, address, role }));
      } else {
        setMessage(data.error || "Error al registrar usuario");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>
        {/* Formulario de registro */}
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Rol</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">Usuario</option>
            <option value="worker">Obrero</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
        {message && <p>{message}</p>}
        <p
          style={{
            marginTop: "15px",
            fontSize: "14px",
            color: "#007bff",
            cursor: "pointer",
          }}
          onClick={onSwitchToLogin} // Volver al login al hacer clic
        >
          ¿Ya tienes cuenta? <strong>Inicia sesión aquí</strong>
        </p>
      </form>
    </div>
  );
};

export default Register;
