import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateTask = () => {
  const [taskData, setTaskData] = useState({ titulo: '', descripcion: '', fechaVencimiento: '' });
  const navigate =useNavigate();
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/Tarea', taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Tarea creada');
      navigate('/tasks')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Tarea</h1>
      <input type="text" name="titulo" placeholder="Título" onChange={handleChange} />
      <textarea name="descripcion" placeholder="Descripción" onChange={handleChange}></textarea>
      <input type="date" name="fechaVencimiento" onChange={handleChange} />
      <button type="submit">Crear Tarea</button>
    </form>
  );
};

export default CreateTask;
