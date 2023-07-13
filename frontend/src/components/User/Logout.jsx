import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

 const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  useEffect(() => {
    handleLogout();
    navigate('/login'); 
  }, [navigate]);

  return null;
};

export default LogoutPage;