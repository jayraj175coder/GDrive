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
<form onSubmit={handleSubmit}>
<h2>Login</h2>
<input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
<input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
<button type="submit">Login</button>
</form>
);
}