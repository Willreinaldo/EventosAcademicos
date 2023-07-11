import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Eventos from './components/Eventos';
import Cadastro from './components/User/Cadastro';
import Login from './components/User/Login';
import EditarEvento from './components/EditarEvento';
import Mapa from './components/Mapa';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const AppRoutes = () => {
  const [usuarioId, setUsuarioId] = useState("");

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute setUsuarioId={setUsuarioId} />}>
          <Route path="/" element={<Mapa usuarioId={usuarioId} />} />
          <Route path="/eventos" element={<Eventos usuarioId={usuarioId} />} />
          <Route path="/eventos/:id" element={<EditarEvento usuarioId={usuarioId} />} />
        </Route>
        <Route path="/cadastro" element={<Cadastro setUsuarioId={setUsuarioId} />} />
        <Route path="/login" element={<Login setUsuarioId={setUsuarioId} />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ setUsuarioId }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const response = await axios.get("http://localhost:4000/usuarios/usuario", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        const usuarioId = response.data.usuario._id;
        setUsuarioId(usuarioId);
      } catch (error) {
        navigate('/login');
      }
    };

    if (!token) {
      navigate('/login');
    } else {
      verificarLogin();
    }
  }, [token, navigate]);

  return null;
};

export default AppRoutes;