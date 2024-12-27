import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications } from "../Slice/notificationSlice";
import notiSound from "../Son/notiNueva.mp3"; // Importa el archivo de sonido
import "../Css/tarjetas.css"; // Estilos actualizados

const NotificationBell = () => {
  const notifications = useSelector((state) => state.notifications.list);
  const dispatch = useDispatch();

  // Reproducir sonido al recibir una nueva notificación
  useEffect(() => {
    if (notifications.length > 0) {
      const audio = new Audio(notiSound); // Usa la variable importada
      audio.play().catch((err) => console.error("Error al reproducir sonido:", err));
    }
  }, [notifications]); // Se ejecuta cada vez que cambian las notificaciones

  const handleClear = () => {
    dispatch(clearNotifications());
  };    

  return (
    <div
      className="notification-bell"
      onClick={handleClear}
      style={{ border: "2px solid red" }} // Borde rojo temporal para depuración
    >
      <span className="bell-icon">🔔</span>
      {notifications.length > 0 && (
        <span className="notification-count">{notifications.length}</span>
      )}
    </div>
  );
};

export default NotificationBell;
