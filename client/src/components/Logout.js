// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token'); // Remove the token cookie
    navigate('/login'); // Redirect to login
  };

  return (
    <button className='text-white outline outline-1 p-1 rounded-sm' onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
