import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      const { access_token, user_type, tutor_id, student_id } = response.data;
      setMessage('Login successful!');

      localStorage.setItem("access_token", access_token);

      if (tutor_id) {
        localStorage.setItem("tutor_id", tutor_id);
      }

      if (student_id) {
        localStorage.setItem("student_id", student_id);
      }

      localStorage.setItem("current_user", JSON.stringify({ username, user_type }));

      if (user_type === "student") {
        navigate("/home");
      } else if (user_type === "tutor") {
        navigate("/tutorhome");
      } else if (user_type === "admin") {
        navigate("/adminhome");
      }
    } catch (error) {
      setMessage("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btnContinue">Login</button>
        <button type="button" className="btnRegister" onClick={() => navigate('/register')}>Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
