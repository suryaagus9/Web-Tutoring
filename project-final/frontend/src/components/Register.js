// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/Register.css'; // Import CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState('student');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        username,
        password,
        email,
        full_name: fullName,
        user_type: userType
      });
      setMessage('User created successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('Failed to create user');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="userType">User Type:</label>
          <select id="userType" name="userType" value={userType} onChange={(e) => setUserType(e.target.value)} required>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            {/* <option value="admin">Admin</option> */}
          </select>
        </div>
        <button type="submit" className="btnContinue">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
