import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../constants/translations';
import gptTradeLogo from '../assets/gpttrade logo.png';
import { motion } from 'framer-motion';
import { FaGlobe, FaUserPlus, FaSignInAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { supabase } from '../supabase/config';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    profilePicture: ''
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Auth error:', error);
          setUser(null);
        } else {
          setUser(user);
          // Get profile data from user metadata
          if (user) {
            setProfileData({
              name: user.user_metadata?.name || '',
              profilePicture: user.user_metadata?.profile_picture || ''
            });
          }
        }
      } catch (error) {
        console.error('Header auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Initial check
    checkUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        
        // Update profile data when auth state changes
        if (currentUser) {
          setProfileData({
            name: currentUser.user_metadata?.name || '',
            profilePicture: currentUser.user_metadata?.profile_picture || ''
          });
        } else {
          setProfileData({
            name: '',
            profilePicture: ''
          });
        }
      }
    );

    return () => {
      // Clean up subscription
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLanguageToggle = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  const selectLanguage = (newLanguage) => {
    if (language !== newLanguage) {
      toggleLanguage();
    }
    setShowLanguageOptions(false);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-lg shadow-lg"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center" onClick={handleLinkClick}>
            <img 
              src={gptTradeLogo} 
              alt="GPTTrade Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center space-x-6"
        >
          <Link 
            to="/" 
            className="text-white hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
          >
            {translations[language].home}
          </Link>
          <Link 
            to="/modernresults" 
            className="text-white hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
          >
            {language === 'ar' ? 'إنجازاتنا' : 'Nos Réalisations'}
          </Link>
          <Link 
            to="/admin/testimonials" 
            className="text-white hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
          >
            {language === 'ar' ? 'إدارة الشهادات' : 'Gestion des Témoignages'}
          </Link>
        </motion.nav>

        {/* Right side items: Language + Auth - Only visible on desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <button
              onClick={handleLanguageToggle}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full transition-all duration-300 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium shadow-lg hover:shadow-xl"
            >
              <FaGlobe className="text-sm" />
              <span className="hidden sm:inline">{language === 'fr' ? 'FR' : 'AR'}</span>
            </button>

            {showLanguageOptions && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    onClick={() => selectLanguage('fr')}
                    className={`w-full text-left px-4 py-2 text-sm ${language === 'fr' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'} hover:bg-blue-50 transition-colors duration-150`}
                    role="menuitem"
                  >
                    🇫🇷 Français
                  </button>
                  <button
                    onClick={() => selectLanguage('ar')}
                    className={`w-full text-left px-4 py-2 text-sm ${language === 'ar' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'} hover:bg-blue-50 transition-colors duration-150`}
                    role="menuitem"
                  >
                    🇩🇿 العربية
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Auth Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            {!loading && (
              user ? (
                <div className="flex items-center">
                  {/* Profile Link */}
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 group"
                  >
                    <div className="relative">
                      {profileData.profilePicture ? (
                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-400 group-hover:border-purple-400 transition-all duration-300 shadow-md">
                        <img 
                          src={profileData.profilePicture} 
                          alt={profileData.name || 'Profile'} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150';
                          }}
                        />
                      </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white border-2 border-blue-400 group-hover:border-purple-400 transition-all duration-300 shadow-md">
                          <FaUserCircle className="text-lg" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <span className="text-white group-hover:text-blue-400 transition-colors duration-300 hidden sm:inline text-sm">
                      {profileData.name || (language === 'ar' ? 'الملف الشخصي' : 'Profile')}
                    </span>
                  </Link>
                  
                  {/* Sign Out Button - Icon Only */}
                  <div className="relative group ml-3">
                    <button 
                      onClick={handleSignOut}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-red-500 transition-all duration-300 text-white"
                      title={language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                    >
                      <FaSignOutAlt className="text-sm" />
                    </button>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                      {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link 
                    to="/signup" 
                    className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full transition-all duration-300 hover:from-green-600 hover:to-blue-600 text-xs"
                  >
                    <FaUserPlus className="inline mr-1" />
                    <span className="hidden sm:inline">{language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}</span>
                  </Link>
                  <Link 
                    to="/signin" 
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full transition-all duration-300 hover:from-blue-600 hover:to-purple-600 text-xs"
                  >
                    <FaSignInAlt className="inline mr-1" />
                    <span className="hidden sm:inline">{language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
                  </Link>
                </div>
              )
            )}
          </motion.div>
        </div>

        {/* Mobile menu button - Only visible on mobile */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            aria-label="Toggle mobile menu"
          >
            <svg 
              className="h-6 w-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 md:hidden bg-gray-900/95 backdrop-blur-lg shadow-lg border-t border-gray-800"
        >
          {/* User profile section in mobile menu */}
          {user && (
            <div className="px-4 pt-4 pb-2 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                {profileData.profilePicture ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400 shadow-md">
                    <img 
                      src={profileData.profilePicture} 
                      alt={profileData.name || 'Profile'} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white border-2 border-blue-400 shadow-md">
                    <FaUserCircle className="text-2xl" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-white font-medium text-lg">
                    {profileData.name || (language === 'ar' ? 'المستخدم' : 'User')}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="px-4 py-4 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-3 rounded-lg text-white hover:bg-gray-800/70 transition-all duration-300 font-medium"
              onClick={handleLinkClick}
            >
              {translations[language].home}
            </Link>
            <Link 
              to="/modernresults" 
              className="block px-4 py-3 rounded-lg text-white hover:bg-gray-800/70 transition-all duration-300 font-medium"
              onClick={handleLinkClick}
            >
              {language === 'ar' ? 'إنجازاتنا' : 'Nos Réalisations'}
            </Link>
            <Link 
              to="/admin/testimonials" 
              className="block px-4 py-3 rounded-lg text-white hover:bg-gray-800/70 transition-all duration-300 font-medium"
              onClick={handleLinkClick}
            >
              {language === 'ar' ? 'إدارة الشهادات' : 'Gestion des Témoignages'}
            </Link>
            <Link 
              to="/#contact" 
              className="block px-4 py-3 rounded-lg text-white hover:bg-gray-800/70 transition-all duration-300 font-medium"
              onClick={handleLinkClick}
            >
              {translations[language].contactUs}
            </Link>
            
            {/* Language toggle in mobile menu */}
            <div className="block px-4 py-3 rounded-lg text-white hover:bg-gray-800/70 transition-all duration-300 font-medium">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaGlobe className="mr-2 text-blue-400" />
                  {language === 'fr' ? 'Langue' : 'اللغة'}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => selectLanguage('fr')}
                    className={`px-2 py-1 rounded ${language === 'fr' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    FR
                  </button>
                  <button 
                    onClick={() => selectLanguage('ar')}
                    className={`px-2 py-1 rounded ${language === 'ar' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  >
                    AR
                  </button>
                </div>
              </div>
            </div>
            
            {/* User-specific links in mobile menu */}
            {user && (
              <>
                <Link 
                  to="/profile" 
                  className="block px-4 py-3 rounded-lg text-white hover:bg-gray-800/70 transition-all duration-300 font-medium"
                  onClick={handleLinkClick}
                >
                  <FaUserCircle className="inline-block mr-2 text-blue-400" />
                  {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                </Link>
                <button 
                  onClick={() => {
                    handleSignOut();
                    handleLinkClick();
                  }}
                  className="w-full text-left block px-4 py-3 rounded-lg text-white hover:bg-red-900/50 transition-all duration-300 font-medium"
                >
                  <FaSignOutAlt className="inline-block mr-2 text-red-400" />
                  {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                </button>
              </>
            )}
            
            {/* Auth links for non-logged in users */}
            {!user && !loading && (
              <>
                <Link 
                  to="/signup" 
                  className="block px-4 py-3 rounded-lg text-white hover:bg-green-800/50 transition-all duration-300 font-medium"
                  onClick={handleLinkClick}
                >
                  <FaUserPlus className="inline-block mr-2 text-green-400" />
                  {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                </Link>
                <Link 
                  to="/signin" 
                  className="block px-4 py-3 rounded-lg text-white hover:bg-blue-800/50 transition-all duration-300 font-medium"
                  onClick={handleLinkClick}
                >
                  <FaSignInAlt className="inline-block mr-2 text-blue-400" />
                  {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
