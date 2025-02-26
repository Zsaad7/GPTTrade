import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../constants/translations';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white py-4 z-50 shadow-lg">
      <div className="max-w-full w-full px-4 sm:px-6 lg:px-8 flex items-center">
        {/* Logo or Title - absolute left positioning */}
        <div className="mr-auto">
          <h1 className="text-2xl font-bold">GPTTrade</h1>
        </div>

        {/* Navigation Links - centered with absolute positioning */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="hover:text-gray-300 transition duration-300">
                {translations[language].home}
              </Link>
            </li>
            <li>
              <Link to="/results" className="hover:text-gray-300 transition duration-300">
                {language === 'ar' ? 'إنجازاتنا' : 'Nos Réalisations'}
              </Link>
            </li>
            {/* <li>
              <Link to="/cta" className="hover:text-gray-300 transition duration-300">
                {translations[language].contactUs}
              </Link>
            </li> */}
          </ul>
        </nav>

        {/* Language Toggle - absolute right positioning */}
        <div className="ml-auto">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-blue-600 text-white rounded-full transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="Change Language"
          >
            {translations[language].languageToggle}
          </button>
        </div>
        
        {/* Mobile menu button - only visible on small screens */}
        <div className="md:hidden ml-4">
          <button className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu - hidden by default */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            {translations[language].home}
          </Link>
          <Link to="/results" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            {language === 'ar' ? 'إنجازاتنا' : 'Nos Réalisations'}
          </Link>
          <Link to="/cta" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            {translations[language].contactUs}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
