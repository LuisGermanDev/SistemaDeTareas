import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/Tarea', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/Tarea/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    navigate('/'); // Redirigir al login
  };
  const handleCreateTask = () => {
    navigate('/create-task'); // Redirigir a la ruta de creación de tareas
  };
  const handleEditTask = (id) => {
    navigate(`/edit-task/${id}`); // Redirigir a la ruta de edición con el id de la tarea
  };
  const toggleTaskStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = !currentStatus; // Cambiar de true a false o de false a true
      await axios.put(
        `http://localhost:3000/Tarea/${id}`, 
        { estado: newStatus }, // Enviar solo la actualización del estado
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Actualizar la lista de tareas localmente
      setTasks(tasks.map((task) =>
        task._id === id ? { ...task, estado: newStatus } : task
      ));
    } catch (error) {
      console.log("Error al actualizar el estado de la tarea", error);
    }
  };
  return (
    <div>
      <h1>Mis Tareas</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <button onClick={handleCreateTask}>Crear una nueva tarea</button>
      
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.titulo}</h3>
            <p>{task.descripcion}</p>
            <p>{task.fechaVencimiento}</p>
            <p>Estado: {task.estado ? 'Hecho' : 'Pendiente'}</p>
            <button onClick={() => handleEditTask(task._id)}>Editar</button>
            <button onClick={() => handleDelete(task._id)}>Eliminar</button>
            <button onClick={() => toggleTaskStatus(task._id, task.estado)}>
              {task.estado ? 'Marcar como Pendiente' : 'Marcar como Hecho'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
