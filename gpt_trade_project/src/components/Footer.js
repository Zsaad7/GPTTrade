import React from "react";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../constants/translations';

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">GPTTrade</h3>
            <p className="text-gray-400">
              {translations[language].footerDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{translations[language].quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition duration-300">
                  {translations[language].home}
                </a>
              </li>
              <li>
                <a href="/cta" className="text-gray-400 hover:text-white transition duration-300">
                  {translations[language].contactUs}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{translations[language].contact}</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Email: contact@gpttrade.com</li>
              <li>{translations[language].phone}: +212 6 20 31 98 11</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} GPTTrade. {translations[language].allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
