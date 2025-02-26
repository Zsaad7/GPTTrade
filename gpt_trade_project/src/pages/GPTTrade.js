import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import tradingImage from '../assets/trading.jpg';
import successImage from '../assets/success.jpg';
import marketImage from '../assets/market.jpg';
import "../styles/global.css"; // Import global CSS
import { translations } from '../constants/translations';
import ContactForm from '../components/ContactForm';  // Note: Default import
import { useLanguage } from '../context/LanguageContext';

const GPTTrade = () => {
  const { language } = useLanguage();
  const [marketInfo, setMarketInfo] = useState({ nq: 17500.25, es: 4875.80 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Memoize market data updates
  const fetchData = useMemo(() => async () => {
    try {
      // In real implementation, replace with actual API call
      const response = await fetch('your-api-endpoint');
      const data = await response.json();
      setMarketInfo({
        nq: data.nq || (17500 + Math.random() * 50).toFixed(2),
        es: data.es || (4875 + Math.random() * 20).toFixed(2),
      });
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div 
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900"}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-900 opacity-80"></div>
          <img 
            src={marketImage} 
            alt="Trading Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              {translations[language].title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {translations[language].introduction}
            </p>
            
            <div className="mt-10">
              <a 
                href="#contact" 
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                {language === 'ar' ? 'ابدأ الآن' : 'Commencer maintenant'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Market Data */}
      <section className="py-12 relative z-10 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                {translations[language].liveMarketTrends}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {translations[language].nqFutures}
                      </h3>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                        ${marketInfo.nq}
                      </p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {translations[language].esFutures}
                      </h3>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                        ${marketInfo.es}
                      </p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose GPTTrade */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 ">
              {translations[language].whyChooseGPTTrade}
            </h2>
            <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src={successImage} 
                alt="Success" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {translations[language].whyChooseGPTTradeDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg text-black dark:text-gray-900 leading-relaxed font-medium">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              {translations[language].testimonialsTitle}
            </h2>
            <div className="mt-4 h-1 w-24 bg-white mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
          >
            <svg className="h-12 w-12 text-blue-300 mb-6" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            
            <p className="text-xl md:text-2xl italic text-white leading-relaxed">
              {translations[language].testimonials}
            </p>
            
            <div className="mt-8 flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold text-xl">
                M
              </div>
              <div className="ml-4">
                <p className="font-medium text-white">Abdeltif ZRIDI</p>
                <p className="text-blue-200">Trader Professionnel</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {translations[language].contactUsTitle}
            </h2>
            <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <h3 className="text-2xl font-bold mb-6">
                  {language === 'ar' ? 'تواصل معنا' : 'Contactez-nous'}
                </h3>
                <p className="text-blue-100 mb-8">
                  {language === 'ar' 
                    ? 'نحن هنا للإجابة على جميع استفساراتك ومساعدتك في تحقيق أهدافك المالية.'
                    : 'Nous sommes là pour répondre à toutes vos questions et vous aider à atteindre vos objectifs financiers.'}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-blue-100">
                      <p className="text-lg">contact@gpttrade.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-blue-100">
                      <p className="text-lg">+212 6 20 31 98 11</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(GPTTrade);
