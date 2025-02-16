import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold absolute" style={{ left: '50px' }}>GPTTrade</h1>

        {/* Navigation Links */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300 transition duration-300">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/cta" className="hover:text-gray-300 transition duration-300">
                Contactez-Nous
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
