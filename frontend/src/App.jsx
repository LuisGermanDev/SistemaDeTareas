import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Tasks from './Tasks';
import CreateTask from './CreateTask';
import EditTask from './EditTask'; // Importa el componente de edición de tareas

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} /> {/* Ruta para editar tarea */}
      </Routes>
    </Router>
  );
}

export default App;
