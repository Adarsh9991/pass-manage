// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { apiCall } from '../apiCallAction/ApicallAction';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const payload = formData;
    try {
      const data = await apiCall("/api/auth/login", "POST", payload);
      console.log("data :", data);
      Cookies.set('token', data.token, { expires: 7 }); // Set token in cookie for 7 days
      navigate("/");
    } catch (error) {
      console.log("error :", error);
    }
  };



  return (
    <div className="login">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
