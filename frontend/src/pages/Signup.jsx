import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/api';


export default function Signup() {
const [form, setForm] = useState({ name: '', email: '', password: '' });
const navigate = useNavigate();


const handleSubmit = async (e) => {
e.preventDefault();
const { data } = await signup(form);
localStorage.setItem('profile', JSON.stringify(data));
navigate('/dashboard');
};


return (
<form onSubmit={handleSubmit}>
<h2>Signup</h2>
<input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
<input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
<input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
<button type="submit">Signup</button>
</form>
);
}