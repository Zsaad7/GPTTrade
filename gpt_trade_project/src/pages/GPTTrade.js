import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import tradingImage from '../assets/trading.jpg';
import successImage from '../assets/success.jpg';
import marketImage from '../assets/market.jpg';
import "../styles/global.css"; // Import global CSS
import { translations } from '../constants/translations';
import ContactForm from '../components/ContactForm';  // Note: Default import
import { useLanguage } from '../context/LanguageContext';
import { getTestimonials } from '../services/testimonialService';

const GPTTrade = () => {
  const { language } = useLanguage();
  const [marketInfo, setMarketInfo] = useState({ nq: 17500.25, es: 4875.80 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from Firebase
  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const result = await getTestimonials();
        if (result.success) {
          setTestimonials(result.testimonials);
        } else {
          setError(result.message);
          // Fallback to default testimonials if there's an error
          setTestimonials([
            {
              id: 1,
              name: 'Sophie Martin',
              profession: language === 'ar' ? 'مستثمرة مبتدئة' : 'Investisseuse débutante',
              photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
              quote: language === 'ar' 
                ? 'لقد ساعدني GPTTrade على فهم أساسيات التداول وبناء محفظة استثمارية متوازنة. النتائج تتحدث عن نفسها!'
                : 'GPTTrade m\'a aidé à comprendre les bases du trading et à construire un portefeuille équilibré. Les résultats parlent d\'eux-mêmes !'
            },
            {
              id: 2,
              name: 'Thomas Dubois',
              profession: language === 'ar' ? 'متداول محترف' : 'Trader professionnel',
              photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
              quote: language === 'ar'
                ? 'بعد سنوات من التداول، وجدت أن استراتيجيات GPTTrade هي الأكثر فعالية وربحية. أنصح بها بشدة لجميع المتداولين.'
                : 'Après des années de trading, j\'ai trouvé que les stratégies de GPTTrade sont les plus efficaces et rentables. Je les recommande vivement à tous les traders.'
            },
            {
              id: 3,
              name: 'Amina Benali',
              profession: language === 'ar' ? 'مستثمرة متوسطة' : 'Investisseuse intermédiaire',
              photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
              quote: language === 'ar'
                ? 'كنت متخوفة من الاستثمار في الأسواق المالية، لكن مع GPTTrade، أصبح لدي الثقة والمعرفة اللازمة للنجاح.'
                : 'J\'étais hésitante à investir dans les marchés financiers, mais avec GPTTrade, j\'ai maintenant la confiance et les connaissances nécessaires pour réussir.'
            }
          ]);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [language]);

  // Memoize market data updates
  const fetchData = useMemo(() => async () => {
    try {
      // Use mock data instead of making an API call
      setMarketInfo({
        nq: (17500 + Math.random() * 50).toFixed(2),
        es: (4875 + Math.random() * 20).toFixed(2),
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

  // Helper function to get the appropriate testimonial text based on language
  const getLocalizedTestimonialContent = (testimonial) => {
    // For quote
    let quote = testimonial.quote || '';
    if (language === 'ar' && testimonial.quoteAr) {
      quote = testimonial.quoteAr;
    } else if (language === 'fr' && testimonial.quoteFr) {
      quote = testimonial.quoteFr;
    }

    // For name
    let name = testimonial.name || '';
    if (language === 'ar' && testimonial.nameAr) {
      name = testimonial.nameAr;
    } else if (language === 'fr' && testimonial.nameFr) {
      name = testimonial.nameFr;
    }

    // For profession
    let profession = testimonial.profession || '';
    if (language === 'ar' && testimonial.professionAr) {
      profession = testimonial.professionAr;
    } else if (language === 'fr' && testimonial.professionFr) {
      profession = testimonial.professionFr;
    }

    return { quote, name, profession };
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 transform rotate-12 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/20 via-purple-500/20 to-pink-500/20 transform -rotate-12 blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-blue-900/80 backdrop-blur-sm"></div>
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
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  {translations[language].liveMarketTrends}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-300">
                          {translations[language].nqFutures}
                        </h3>
                        <p className="text-3xl font-bold text-blue-400 mt-2">
                          ${marketInfo.nq}
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-300">
                          {language === 'ar' ? 'انضم إلى قناة التلغرام' : 'Rejoignez notre canal Telegram'}
                        </h3>
                        <a 
                          href="https://t.me/gpttrade" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xl font-bold text-blue-400 mt-2 hover:text-blue-300 transition-colors duration-300"
                        >
                          {language === 'ar' ? 'اضغط هنا للانضمام' : 'Cliquez ici pour rejoindre'}
                        </a>
                      </div>
                      <div className="bg-blue-500/20 p-3 rounded-full">
                        <svg className="h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
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
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                {translations[language].whyChooseGPTTrade}
              </h2>
              <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                <img 
                  src={successImage} 
                  alt="Success" 
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover relative z-10"
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
                  <p key={index} className="text-lg text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                {translations[language].testimonialsTitle}
              </h2>
              <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => {
                const { quote, name, profession } = getLocalizedTestimonialContent(testimonial);
                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500">
                          <img 
                            src={testimonial.photoUrl} 
                            alt={name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=8B5CF6&color=fff`;
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-indigo-500 rounded-full p-1">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.02A4.96 4.96 0 0012 11z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      
                      <svg className="h-8 w-8 text-indigo-400 mb-4" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      
                      <p className="text-gray-300 italic text-center mb-4">
                        {quote}
                      </p>
                      
                      <div className="mt-auto">
                        <h4 className="font-semibold text-white text-lg">{name}</h4>
                        <p className="text-indigo-300">{profession}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                {translations[language].contactUsTitle}
              </h2>
              <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
            </motion.div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12 bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-xl">
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
                        <p className="text-lg">+212 7 81 37 20 18</p>
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
    </div>
  );
};

export default React.memo(GPTTrade);
