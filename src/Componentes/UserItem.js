import React from 'react';
import "../Css/tarjetas.css";

const UserItem = ({ id, name, profession, available }) => {
  // Mapear profesiones a íconos/emojis
  const professionIcons = {
    Plomero: '🔧',
    Albañil: '🏗️',
    Peluquera: '✂️',
    Electricista: '💡',
    Pintora: '🎨',
    Bufanda: '🧣', // Nuevo ícono para bufanda
    Zanahoria: '🥕', // Nuevo ícono para zanahoria
    Hoja: '🍀', // Nuevo ícono para hoja verde (trébol)
    Manito: '👋', // Nuevo ícono para manitos
    Lentes: '😎' // Nuevo ícono para lentes de sol
  };

  // Condicional para cambiar el ícono de los usuarios con ids específicos
  const professionIcon = (id) => {
    switch (id) {
      case 1:
        return '🧣'; // Bufanda para el usuario con id 1
      case 2:
        return '🍀'; // Hoja verde (trébol) para el usuario con id 2
      case 3:
        return '👋'; // Manitos para el usuario con id 3
      case 4:
        return '😎'; // Lentes de sol para el usuario con id 4
      default:
        return Object.keys(professionIcons).find(key => profession.includes(key))
          ? professionIcons[profession.split(' ')[0]]
          : '👷';
    }
  };

  // Condicional para cambiar el texto del estado
  const statusText = (id, available) => {
    if (id === 4) {
      return available ? 'Disponible' : 'Imparable';
    } else {
      return available ? 'Disponible' : 'No Disponible';
    }
  };

  return (
    <div className={`card mb-3 shadow-sm ${id === 4 ? 'premium-card' : ''}`}>
      {id === 4 && (
        <>
          <div className="medals">
            🥇 🥈 🥉 {/* Medallas en la parte superior izquierda */}
          </div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </>
      )}
      <div className="card-body d-flex align-items-center">
        {/* Avatar genérico */}
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            marginRight: '15px',
          }}
        >
          {name[0]} {/* Mostrar la inicial del nombre */}
        </div>

        {/* Información del trabajador */}
        <div>
          <h5 className="card-title mb-1">{name}</h5>
          <p className="card-text mb-0">
            {professionIcon(id)} {profession}
          </p>
          <span className={`badge ${available ? 'bg-success' : 'bg-danger'}`}>
            {statusText(id, available)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserItem;