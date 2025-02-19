import React, { useState, useRef, useEffect } from "react";
import UserItem from "./UserItem";
import UserDetails from "./UserDetails";
import "../Css/tarjetas.css";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const users = [
    { id: 1, name: "Ramon", profession: "Carpintero", available: false, age: 25, experience: "+10 años" },
    { id: 2, name: "Stven", profession: "Pintor", available: true, age: 35, experience: "+25 años" },
    { id: 3, name: "Victor", profession: "Electricista", available: true, age: 35, experience: "+15 años" },
    { id: 4, name: "Juan", profession: "Plomero", available: true, age: 42, experience: "+25 años" },
    { id: 5, name: "Carlos", profession: "Peluquero", available: true, age: 45, experience: "+20 años" },
    { id: 6, name: "Ana", profession: "Peluquera", available: false, age: 33, experience: "+12 años" },
    { id: 7, name: "Luis", profession: "Carpintero", available: true, age: 50, experience: "+25 años" },
    { id: 8, name: "Sofia", profession: "Carpintero", available: false, age: 27, experience: "+7 años" },
    { id: 9, name: "Ricardo", profession: "Mecánico", available: true, age: 38, experience: "+15 años" },
    { id: 10, name: "Elena", profession: "Mecánica", available: false, age: 29, experience: "+6 años" },
    { id: 11, name: "Patricia", profession: "Peluquera", available: true, age: 30, experience: "+12 años" },
    { id: 12, name: "Juan", profession: "Plomero", available: true, age: 35, experience: "+10 años" },
    { id: 13, name: "Maria", profession: "Plomero", available: false, age: 29, experiencia: "+5 años" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const authState = localStorage.getItem("isAuthenticated");
    if (authState !== "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const [filterAvailable, setFilterAvailable] = useState(null); // Estado para los filtros
  const [isPremiumMode, setIsPremiumMode] = useState(false); // Estado del modo Premium
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const detailsRef = useRef(null);

  const handlePremiumToggle = () => {
    setIsPremiumMode(!isPremiumMode);
    console.log("Modo Premium activado:", !isPremiumMode);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    console.log("Usuario seleccionado:", user);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Filtrar usuarios según disponibilidad o búsqueda
  const filteredUsers = users
    .filter((user) => (filterAvailable === null ? true : user.available === filterAvailable))
    .filter((user) => user.profession.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mt-3">
      {/* Botón Premium */}
      <div className="text-center mb-3">
        <button
          className={`btn ${isPremiumMode ? "btn-danger" : "btn-primary"}`}
          onClick={handlePremiumToggle}
        >
          {isPremiumMode ? "Salir de Modo Premium" : "Modo Premium"}
        </button>
      </div>

      {/* Filtros */}
      <div className="row mb-3">
        <div className="col-12 col-md-4 mb-2">
          <button
            className={`btn w-100 ${filterAvailable === null ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilterAvailable(null)}
          >
            Todos
          </button>
        </div>
        <div className="col-12 col-md-4 mb-2">
          <button
            className={`btn w-100 ${filterAvailable === true ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilterAvailable(true)}
          >
            Disponibles
          </button>
        </div>
        <div className="col-12 col-md-4">
          <button
            className={`btn w-100 ${filterAvailable === false ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilterAvailable(false)}
          >
            No Disponibles
          </button>
        </div>
      </div>

      {/* Buscador */}
      <div className="row mb-3">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por profesión..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de Usuarios */}
      <div className="row">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div className="col-12 col-sm-6 col-lg-4 mb-3" key={user.id}>
              <div onClick={() => handleSelectUser(user)} style={{ cursor: "pointer" }}>
                <UserItem
                  id={user.id}
                  name={user.name}
                  profession={user.profession}
                  available={user.available}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-muted">No se encontraron resultados.</div>
        )}
      </div>

      {/* Detalles del Usuario */}
      {selectedUser && (
        <div ref={detailsRef}>
          <UserDetails
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        </div>
      )}

      {/* Botón de Cerrar Sesión */}
      <div className="text-center mt-4">
        <button className="logout-button" onClick={() => console.log("Cerrando sesión")}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserList;
