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
  };

  // Seleccionar ícono según la profesión
  const professionIcon = professionIcons[profession.split(' ')[0]] || '👷';

  // Texto del estado
  const statusText = available ? 'Disponible' : 'No Disponible';

  return (
    <div className="card mb-3 shadow-sm">
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
            {professionIcon} {profession}
          </p>
          <span className={`badge ${available ? 'bg-success' : 'bg-danger'}`}>
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
