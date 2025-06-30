import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo-group">
        <img src="https://via.placeholder.com/36x36/0070d2/ffffff?text=V" alt="Ventures logo" className="main-logo" />
        <span className="navbar-logo">Ventures</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/startups">Startups</Link></li>
        <li><Link to="/investor">Investor</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li>
          <Link to="/login" style={{background: '#fff', color: '#1a237e', borderRadius: 20, padding: '6px 18px', marginLeft: 12, fontWeight: 600, border: '2px solid #1a237e'}}>Login</Link>
        </li>
        <li>
          <Link to="/register" style={{background: '#1a237e', color: '#fff', borderRadius: 20, padding: '6px 18px', marginLeft: 8, fontWeight: 600, border: '2px solid #1a237e'}}>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
