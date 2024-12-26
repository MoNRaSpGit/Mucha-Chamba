import React, { useState } from "react";

const CardPaymentForm = ({ onSuccess }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías validar los datos de la tarjeta si fuera necesario.
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <h5 style={{ textAlign: "center", marginBottom: "20px" }}>
        Ingrese los detalles de su tarjeta
      </h5>
      <div className="mb-3">
        <label className="form-label">Número de tarjeta</label>
        <input
          type="text"
          className="form-control"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength={16}
          required
        />
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label className="form-label">Fecha de vencimiento</label>
          <input
            type="text"
            className="form-control"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/AA"
            required
          />
        </div>
        <div className="col-6 mb-3">
          <label className="form-label">CVV</label>
          <input
            type="text"
            className="form-control"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxLength={3}
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Nombre del titular</label>
        <input
          type="text"
          className="form-control"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          placeholder="Nombre Completo"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-success w-100"
        style={{ fontSize: "16px", padding: "10px" }}
      >
        Confirmar Pago
      </button>
    </form>
  );
};

export default CardPaymentForm;
