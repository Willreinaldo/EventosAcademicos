import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Eventos from './components/Eventos';
import AllEventos from './components/AllEventos'
import Cadastro from './components/User/Cadastro';
import Login from './components/User/Login';
import LogoutPage from './components/User/Logout';

import EditarEvento from './components/EditarEvento';
import Mapa from './components/Mapa';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const AppRoutes = () => {
  const [usuarioId, setUsuarioId] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const response = await axios.get("http://localhost:4000/usuarios/usuario", {
          headers: {
            Authorization: `Bearer${token}`
          }
        });
        const usuarioId = response.data._id;
        console.log(response.data);
        setNomeUsuario(response.data.nome);
        setUsuarioId(usuarioId);
      } catch (error) {
        console.log("Erro ao verificar login:", error);
      }
    };

    if (!token) {
      return;
    }

    verificarLogin();
  }, [token, setUsuarioId, setNomeUsuario]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUsuarioId={setUsuarioId} />} />
        <Route path="/cadastro" element={<Cadastro setUsuarioId={setUsuarioId} />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Mapa usuarioId={usuarioId} nomeUsuario={nomeUsuario} />
            </PrivateRoute>
          }
        />
        <Route
          path="/eventos"
          element={
            <PrivateRoute>
              <Eventos usuarioId={usuarioId} nomeUsuario={nomeUsuario} />
            </PrivateRoute>
          }
        />
        <Route
          path="/AllEventos"
          element={
            <PrivateRoute>
              <AllEventos usuarioId={usuarioId} nomeUsuario={nomeUsuario} />
            </PrivateRoute>
          }
        />
        <Route
          path="/eventos/:id"
          element={
            <PrivateRoute>
              <EditarEvento usuarioId={usuarioId} nomeUsuario={nomeUsuario} />
            </PrivateRoute>
          }
        />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return children;
};

export default AppRoutes;