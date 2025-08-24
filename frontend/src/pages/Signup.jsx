import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/api';


export default function Signup() {
const [form, setForm] = useState({ username: '', email: '', password: '' });
const navigate = useNavigate();


const handleSubmit = async (e) => {
e.preventDefault();
const { data } = await signup(form);
localStorage.setItem('profile', JSON.stringify(data));
navigate('/dashboard');
};


return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input 
            placeholder="Username" 
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="auth-input"
            required
          />
        </div>
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
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
    </div>
  </div>
);
}