import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">GPTTrade</h1>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cta" className="hover:text-gray-300 transition duration-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
