import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate =useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      localStorage.setItem('token', response.data.token); // Guardar JWT en localStorage
      alert('Inicio de sesión exitoso');
      navigate('/tasks');
    } catch (error) {
      alert('Error en el inicio de sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Iniciar Sesión</button>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </form>
  );
};

export default Login;
