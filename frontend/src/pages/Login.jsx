import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';


export default function Login() {
const [form, setForm] = useState({ email: '', password: '' });
const navigate = useNavigate();


const handleSubmit = async (e) => {
e.preventDefault();
const { data } = await login(form);
localStorage.setItem('profile', JSON.stringify(data));
navigate('/dashboard');
};


return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input 
            placeholder="Email" 
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="auth-input"
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="auth-input"
            required
          />
        </div>
        <button type="submit" className="auth-button">Log In</button>
      </form>
    </div>
  </div>
);
}