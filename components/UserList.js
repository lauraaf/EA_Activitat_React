// components/UserList.js

import React from 'react';

const UserList = ({ users, onDelete, onViewDetails }) => {
  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name}
            <button onClick={() => onViewDetails(user)}>Ver Detalles</button>
            <button onClick={() => onDelete(user._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;





