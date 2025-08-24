import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Navbar from './components/Navbar';


function App() {
return (
<BrowserRouter>
<Navbar/>
<Routes>
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/search" element={<Search />} />
</Routes>
</BrowserRouter>
);
}


export default App;