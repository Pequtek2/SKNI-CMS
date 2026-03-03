import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Zaraz stworzymy style

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        CodeHoryzont
      </div>
      <ul className="nav-links">
        <li><Link to="/">Start</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/gallery">Galeria</Link></li>
        
        {/* Te linki w przyszłości ukryjemy dla niezalogowanych */}
        <li className="admin-link"><Link to="/editor">Panel Redaktora</Link></li>
        <li className="admin-link"><Link to="/admin">Status Serwera</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;