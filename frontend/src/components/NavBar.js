import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem('profile'));


const handleLogout = () => {
localStorage.removeItem('profile');
navigate('/login');
};


return (
<nav className="navbar">
<h2>Drive Clone</h2>
{user ? (
<>
<button onClick={() => navigate('/dashboard')}>Dashboard</button>
<button onClick={() => navigate('/search')}>Search</button>
<button onClick={handleLogout}>Logout</button>
</>
) : (
<>
<button onClick={() => navigate('/login')}>Login</button>
<button onClick={() => navigate('/signup')}>Signup</button>
</>
)}
</nav>
);
}