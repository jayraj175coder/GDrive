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
    <div className="nav-brand">
      <h2>📁 Drive Clone</h2>
    </div>
    <div className="nav-links">
      {user ? (
        <>
          <button onClick={() => navigate('/dashboard')} className="nav-button">
            🏠 Dashboard
          </button>
          <button onClick={() => navigate('/search')} className="nav-button">
            🔍 Search
          </button>
          <button onClick={handleLogout} className="nav-button logout">
            🚪 Logout
          </button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/login')} className="nav-button">
            🔑 Login
          </button>
          <button onClick={() => navigate('/signup')} className="nav-button">
            ✍️ Signup
          </button>
        </>
      )}
    </div>
  </nav>
);
}