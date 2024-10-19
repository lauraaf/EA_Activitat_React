import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState(''); 
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  // Llamada para obtener todos los usuarios
  useEffect(() => {
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
  }, []);

  // Manejo del formulario de creación de usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newUser = { name, mail, comment, password };

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
      setMessage('Usuario creado con éxito');
      setUsers([...users, data]); // Actualizar la lista de usuarios
      setName('');  // Limpiar formulario
      setMail('');
      setPassword(''); 
      setComment('');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="password" 
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Crear Usuario</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
