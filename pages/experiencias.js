import { useEffect, useState } from 'react';
import ExperienciaList from '../components/ExperienciaList';
import ExperienciaForm from '../components/ExperienciaForm';

export default function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const URL = "http://localhost:3000/api/experiencias";

  useEffect(() => {
    setLoading(true);
    const fetchExperiencias = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setExperiencias(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExperiencias();
  }, []);

  const handleExperienciaSubmit = async (newExperiencia) => {
    try {
      const response = await fetch(URL, {
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

  const handleDeleteExperience = async (expId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/experiencias/${expId}`, {
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

  const handleUpdateExperience = async (updatedExperience) => {
    try {
      const response = await fetch(`${URL}/${updatedExperience._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExperience),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la experiencia');
      }

      const data = await response.json();
      setExperiencias(experiencias.map(exp => (exp._id === data._id ? data : exp))); // Actualiza la lista
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2-form>Gestión de Experiencias</h2-form>
      {loading && <p>Cargando experiencias...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <ExperienciaList 
            experiencias={experiencias} 
            onDeleteExperience={handleDeleteExperience} 
            onUpdateExperience={handleUpdateExperience} // Pasa la función de actualización
          />
          <ExperienciaForm onSubmit={handleExperienciaSubmit} />
        </>
      )}
    </div>
  );
}

