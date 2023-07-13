import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/usuarios/logout', {}, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      });
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  useEffect(() => {
    handleLogout();
  }, [navigate]);

  return null;
};

export default LogoutPage;