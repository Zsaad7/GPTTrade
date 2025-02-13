import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">GPTTrade</div>
        <ul className="nav-links">
          <li><a href="#hero">Accueil</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#cta">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;