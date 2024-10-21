import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
  const [taskData, setTaskData] = useState({ titulo: '', descripcion: '', fechaVencimiento: '' });
  const { id } = useParams(); // Obtener el id de la tarea desde los parámetros de la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos de la tarea actual
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/Tarea/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTaskData(response.data); // Llenar el formulario con los datos de la tarea
      } catch (error) {
        console.log('Error al obtener la tarea', error);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/Tarea/${id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Tarea actualizada');
      navigate('/tasks'); // Redirigir de vuelta a la página de tareas
    } catch (error) {
      console.log('Error al actualizar la tarea', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Tarea</h1>
      <input 
        type="text" 
        name="titulo" 
        placeholder="Título" 
        value={taskData.titulo} 
        onChange={handleChange} 
      />
      <textarea 
        name="descripcion" 
        placeholder="Descripción" 
        value={taskData.descripcion} 
        onChange={handleChange}
      ></textarea>
      <input 
        type="date" 
        name="fechaVencimiento" 
        value={taskData.fechaVencimiento.split('T')[0]} // Para mostrar solo la fecha sin la hora
        onChange={handleChange} 
      />
      <button type="submit">Actualizar Tarea</button>
    </form>
  );
};

export default EditTask;
