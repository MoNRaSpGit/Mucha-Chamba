import React, { useEffect, useState } from "react";

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Obtener la fecha actual
    const today = new Date().toLocaleDateString();

    // Revisar si ya existe un contador para hoy
    const storedData = JSON.parse(localStorage.getItem("visitData")) || {};

    if (storedData.date === today) {
      // Si la fecha coincide, usa el contador existente
      setVisitCount(storedData.count);
    } else {
      // Si es un nuevo día, resetea el contador
      const newVisitData = { date: today, count: 1 };
      localStorage.setItem("visitData", JSON.stringify(newVisitData));
      setVisitCount(1);
    }
  }, []);

  useEffect(() => {
    // Incrementar el contador cada vez que la página es visitada
    const today = new Date().toLocaleDateString();
    const storedData = JSON.parse(localStorage.getItem("visitData")) || {};

    if (storedData.date === today) {
      storedData.count += 1;
      localStorage.setItem("visitData", JSON.stringify(storedData));
      setVisitCount(storedData.count);
    }
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Visitas del día: {visitCount}</h2>
    </div>
  );
};

export default VisitCounter;
