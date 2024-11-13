import { useState } from 'react';
import ExperienciaForm from './ExperienciaForm';

export default function ExperienciaList({ experiencias = [], onDeleteExperience, onUpdateExperience }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  if (loading) return <p>Cargando experiencias...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = (id) => {
    if (onDeleteExperience) {
      onDeleteExperience(id);
    }
  };

  const handleUpdate = (experiencia) => {
    setSelectedExperience(experiencia);
  };

  const handleFormSubmit = (updatedExperience) => {
    if (onUpdateExperience) {
      onUpdateExperience(updatedExperience);
    }
    setSelectedExperience(null); // Reset after updating
  };

  return (
    <div>
      <h2>Lista de Experiencias</h2>
      <ul>
        {experiencias.map((exp) => (
          <li key={exp._id}>
            <p><strong>Descripción:</strong> {exp.description}</p>
            <p><strong>Dueño:</strong> {exp.owner}</p>
            <p><strong>Participantes:</strong> {exp.participants.join(', ')}</p>
            <button onClick={() => handleDelete(exp._id)}>Eliminar</button>
            <button onClick={() => handleUpdate(exp)}>Modificar</button> {/*Boto per poder modificar experiencia*/}
          </li>
        ))}
      </ul>
      {selectedExperience && (
        <ExperienciaForm onSubmit={handleFormSubmit} experiencia={selectedExperience} />
      )}
    </div>
  );
}
