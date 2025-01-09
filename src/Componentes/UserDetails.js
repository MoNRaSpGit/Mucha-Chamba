import React, { useState, useRef, useEffect } from "react";
import "../Css/tarjetas.css";
import CardPaymentForm from "./CardPaymentForm";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../Slice/notificationSlice";

const UserDetails = ({ user, onClose, recommendations, onSelectRecommended }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [serviceRequested, setServiceRequested] = useState(false);
  const [requestSuccessful, setRequestSuccessful] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // Método de pago seleccionado
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // Mostrar botones de pago
  const [estimatedTime, setEstimatedTime] = useState(null); // Tiempo estimado de llegada
  const [isCalculatingTime, setIsCalculatingTime] = useState(false); // Indicador de cálculo de tiempo

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

  const userAddress = loggedUser.address || "Sin dirección especificada"; // Dirección del usuario logueado

  const paymentRef = useRef(null); // Ref para desplazar el scroll al formulario de tarjeta

  useEffect(() => {
    // Simular cálculo del tiempo estimado de llegada
    setIsCalculatingTime(true);
    const timer = setTimeout(() => {
      const randomTime = Math.floor(Math.random() * (35 - 10 + 1)) + 10; // Generar número aleatorio entre 10 y 35
      setEstimatedTime(randomTime);
      setIsCalculatingTime(false);
    }, 3000); // Simular cálculo durante 3 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, []);

  const handleRequestService = () => {
    if (!user.available) {
      // Mostrar el mensaje cuando el trabajador no está disponible
      alert(`El ${user.profession} ${user.name} no está disponible. Disculpe las molestias.`);
    } else {
      setShowPaymentOptions(true); // Mostrar opciones de pago si está disponible
    }
  };
  

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);

    if (method === "tarjeta") {
      setTimeout(() => {
        paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200); // Pequeño retraso para asegurar que el formulario se renderiza antes de desplazar
    } else if (method === "efectivo") {
      handlePaymentSuccess();
    }
  };

  const handlePaymentSuccess = () => {
    setRequestSuccessful(true); // Mostrar el mensaje de éxito
    dispatch(addNotification(`¡Servicio confirmado con ${user.name}!`)); // Añade la notificación
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
            <strong>{userAddress}</strong> en aproximadamente{" "}
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
            <strong>Tiempo estimado de llegada:</strong>{" "}
            {isCalculatingTime ? (
              <span className="text-muted">Calculando...</span>
            ) : (
              `${estimatedTime} minutos`
            )}
          </p>
          <p>
            <strong>Dirección:</strong> {userAddress}
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
            <div ref={paymentRef}>
              <CardPaymentForm onSuccess={handlePaymentSuccess} />
            </div>
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
