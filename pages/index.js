import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Gestión de Usuarios y Experiencias</h1>
      <div className="button-container">
        <Link href="/usuarios">
          <button className="formdiv">Gestionar Usuarios</button>
        </Link>
        <Link href="/experiencias">
          <button className="formdiv">Gestionar Experiencias</button>
        </Link>
      </div>
    </div>
  );
}



/*// pages/index.js

import { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import ExperienciaList from '../components/ExperienciaList';
import ExperienciaForm from '../components/ExperienciaForm';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [experiencias, setExperiencias] = useState([]); // Añadir estado para experiencias
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUsers, setShowUsers] = useState(false);
  const [showExperiencias, setShowExperiencias] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado

  // Llamada para obtener todos los usuarios
  useEffect(() => {
    if (showUsers) {
      setLoading(true);
      const fetchUsers = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`);
          if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
          }
          const data = await response.json();
          setUsers(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [showUsers]);

  // Llamada para obtener todas las experiencias
  useEffect(() => {
    if (showExperiencias) {
      setLoading(true);
      const fetchExperiencias = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiencias`);
          if (!response.ok) {
            throw new Error('Error al obtener las experiencias');
          }
          const data = await response.json();
          setExperiencias(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchExperiencias();
    }
  }, [showExperiencias]);

  // Manejo de creación de usuario
  const handleUserSubmit = async (newUser) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }

      const data = await response.json();
      setUsers([...users, data]); // Actualiza la lista de usuarios
    } catch (err) {
      console.error(err.message);
    }
  };

  // Manejo de eliminación de usuario
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      setUsers(users.filter(user => user._id !== userId)); // Actualiza la lista
    } catch (err) {
      console.error(err);
    }
  };

  // Manejo de creación de experiencia
  const handleExperienciaSubmit = async (newExperiencia) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiencias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExperiencia),
      });

      if (!response.ok) {
        throw new Error('Error al crear la experiencia');
      }

      const data = await response.json();
      setExperiencias([...experiencias, data]); // Actualiza la lista de experiencias
    } catch (err) {
      console.error(err.message);
    }
  };

  // Manejo de eliminación de experiencia
  const handleDeleteExperience = async (expId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiencias/${expId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la experiencia');
      }

      setExperiencias(experiencias.filter(exp => exp._id !== expId)); // Actualiza la lista
    } catch (err) {
      console.error(err);
    }
  };

  // Manejo de visualización de detalles de usuario
  const handleViewDetails = (user) => {
    // Si el usuario ya está seleccionado, se deselecciona
    if (selectedUser && selectedUser._id === user._id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user); // Si no, se selecciona el nuevo usuario
    }
  };

  const toggleUsers = () => {
    setShowUsers(!showUsers);
    setShowExperiencias(false);
  };

  const toggleExperiencias = () => {
    setShowExperiencias(!showExperiencias);
    setShowUsers(false);
  };

  return (
    <div>
      <h1>Gestión de Usuarios y Experiencias</h1>
      <div  className="button-container">
        
        <button onClick={toggleUsers}>
          {showUsers ? 'Ocultar Usuarios' : 'Gestionar Usuarios'}
        </button>
        
        <button onClick={toggleExperiencias}>
          {showExperiencias ? 'Ocultar Experiencias' : 'Gestionar Experiencias'}
        </button>
      </div>

      {showUsers && (
        <div className="form-container">
          <h2>Usuarios</h2>
          {loading && <p>Cargando usuarios...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
            <>
              <UserList users={users} onDelete={handleDelete} onViewDetails={handleViewDetails} />
              <UserForm onSubmit={handleUserSubmit} />
            </>
          )}
        </div>
      )}

      {selectedUser && (
        <div>
          <h2>Detalles del Usuario</h2>
          <p>Nombre: {selectedUser.name}</p>
          <p>Email: {selectedUser.mail}</p>
          <p>Comentario: {selectedUser.comment}</p>
        </div>
      )}

      {showExperiencias && (
        <div className="form-container">
          <h2>Experiencias</h2>
          {loading && <p className="loading">Cargando experiencias...</p>}
          {error && <p className="error">Error: {error}</p>}
          {!loading && !error && (
            <>
              <ExperienciaList experiencias={experiencias} onDeleteExperience={handleDeleteExperience} />
              <ExperienciaForm onSubmit={handleExperienciaSubmit}/>
            </>
          )}
        </div>
      )}
    </div>
  );
}

*/
