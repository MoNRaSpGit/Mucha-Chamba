import React, { useState } from "react";
import "../Css/tarjetas.css";
import CardPaymentForm from "./CardPaymentForm"; // Componente para el formulario de tarjeta

const UserDetails = ({ user, onClose, recommendations, onSelectRecommended }) => {
  const [serviceRequested, setServiceRequested] = useState(false);
  const [requestSuccessful, setRequestSuccessful] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // Método de pago seleccionado
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // Mostrar botones de pago

  const professionIcons = {
    Plomero: "🔧",
    Albañil: "🏗️",
    Peluquera: "✂️",
    Electricista: "💡",
    Pintora: "🎨",
    Jardinero: "🌳",
    Cocinera: "🍳",
    Carpintero: "🔨",
    Costurera: "🧵",
    Mecánico: "🔧",
    Masajista: "💆‍♂️",
  };

  const professionIcon = Object.keys(professionIcons).find((key) =>
    user.profession.includes(key)
  )
    ? professionIcons[user.profession.split(" ")[0]]
    : "👷";

  const estimatedTime = 25; // Tiempo ficticio en minutos
  const address = "Calle Falsa 123"; // Dirección ficticia

  const handleRequestService = () => {
    if (!user.available) {
      setServiceRequested(true); // Si no está disponible, activar sugerencias
    } else {
      setShowPaymentOptions(true); // Mostrar opciones de pago si está disponible
    }
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);

    if (method === "efectivo") {
      setRequestSuccessful(true); // Mostrar el mensaje de éxito

      // Cerrar el mensaje automáticamente después de 3 segundos
      setTimeout(() => {
        setRequestSuccessful(false);
        onClose(); // Cerrar el componente
      }, 3000);
    }
  };

  const handlePaymentSuccess = () => {
    setRequestSuccessful(true); // Mostrar el mensaje de éxito

    // Cerrar el mensaje automáticamente después de 3 segundos
    setTimeout(() => {
      setRequestSuccessful(false);
      onClose(); // Cerrar el componente
    }, 3000);
  };

  return (
    <div className="user-details-card card mt-3 p-4 shadow">
      {requestSuccessful ? (
        <div className="text-center">
          <h4 className="text-success">¡Solicitud exitosa! 🎉</h4>
          <p>
            Su <strong>{user.profession}</strong> {user.name} llegará a{" "}
            <strong>{address}</strong> en aproximadamente{" "}
            <strong>{estimatedTime} minutos</strong>. ¡Gracias por confiar en
            nosotros!
          </p>
        </div>
      ) : serviceRequested && !user.available ? (
        <div>
          <h4 className="text-danger">
            El {user.profession} {user.name} no está disponible
          </h4>
          <p>Le recomendamos considerar estas otras opciones:</p>
          <div className="row">
            {recommendations.map((rec) => (
              <div className="col-12 col-md-6 mb-3" key={rec.id}>
                <div className="card p-3 shadow-sm">
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        marginRight: "15px",
                      }}
                    >
                      {rec.name[0]}
                    </div>
                    <div>
                      <h6 className="mb-0">{rec.name}</h6>
                      <p className="text-muted mb-0">{rec.profession}</p>
                      <span
                        className={`badge ${
                          rec.available ? "bg-success" : "bg-danger"
                        } mt-1`}
                      >
                        {rec.available ? "Disponible" : "No disponible"}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary mt-2 w-100"
                    onClick={() => {
                      onSelectRecommended(rec); // Actualizar selección
                      setShowPaymentOptions(false); // Restablecer estado
                      setPaymentMethod(null); // Limpiar método de pago
                      setServiceRequested(false); // Reiniciar sugerencias
                    }}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary mt-3" onClick={onClose}>
            Volver a la lista
          </button>
        </div>
      ) : (
        <>
          <button className="btn-close align-self-end" onClick={onClose}></button>

          <div className="d-flex align-items-center mb-3">
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#e0e0e0",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                marginRight: "15px",
              }}
            >
              {user.name[0]}
            </div>
            <div>
              <h4 className="card-title mb-0">{user.name}</h4>
              <p className="text-muted mb-0">
                {professionIcon} {user.profession}
              </p>
              {/* Mostrar disponibilidad */}
              <span
                className={`badge ${
                  user.available ? "bg-success" : "bg-danger"
                } mt-2`}
              >
                {user.available ? "Disponible" : "No disponible"}
              </span>
            </div>
          </div>

          <p>
            <strong>Edad:</strong> {user.age} años
          </p>
          <p>
            <strong>Experiencia:</strong> {user.experience}
          </p>
          <p>
            <strong>Tiempo estimado de llegada:</strong> {estimatedTime} minutos
          </p>
          <p>
            <strong>Dirección:</strong> {address}
          </p>

          {!showPaymentOptions && !serviceRequested && (
            <div className="mt-4">
              <button
                className="btn btn-primary w-100"
                onClick={handleRequestService}
              >
                Solicitar servicio
              </button>
            </div>
          )}

          {showPaymentOptions && (
            <div className="mt-4">
              <h5 className="text-center">Selecciona el método de pago:</h5>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handlePaymentMethod("tarjeta")}
                >
                  Tarjeta
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handlePaymentMethod("efectivo")}
                >
                  Efectivo
                </button>
              </div>
            </div>
          )}

          {paymentMethod === "tarjeta" && (
            <CardPaymentForm onSuccess={handlePaymentSuccess} />
          )}

          <div className="mt-4">
            <button className="btn btn-secondary w-100" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
