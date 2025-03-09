import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Import your achievement images (keep the same imports)
import achievement1 from '../assets/achievements/achievement1.jpg';
import achievement2 from '../assets/achievements/achievement2.jpg';
import achievement3 from '../assets/achievements/achievement3.jpg';
import achievement4 from '../assets/achievements/achievement4.jpg';
import achievement5 from '../assets/achievements/achievement5.jpg';
import achievement6 from '../assets/achievements/achievement6.jpg';
import achievement7 from '../assets/achievements/achievement7.jpg';
import achievement8 from '../assets/achievements/achievement8.jpg';
import achievement9 from '../assets/achievements/achievement9.jpg';

const ModernResults = () => {
  const { language } = useLanguage();
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [filters, setFilters] = useState({
    strategy: {
      automated: false,
      manual: false,
      longTerm: false,
      dayTrading: false,
    },
    instrument: {
      es: false,
      nq: false,
      forex: false,
      crypto: false,
    },
    weeks: {
      week1: false,
      week2: false,
      week3: false,
      week4: false,
    }
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('strategy');

  // Achievement data with week property
  const achievements = [
    {
      id: 1,
      image: achievement1,
      title: language === 'ar' ? 'إنجاز التداول الأول' : 'Premier succès de trading',
      description: language === 'ar' 
        ? 'تفاصيل حول هذا الإنجاز المهم في مجال التداول. هنا يمكنك إضافة المزيد من المعلومات حول كيفية تحقيق هذا الإنجاز والنتائج التي تم تحقيقها.'
        : 'Détails sur cette réalisation importante dans le domaine du trading. Vous pouvez ajouter plus d\'informations sur la façon dont cette réussite a été obtenue et les résultats qui ont été atteints.',
      strategy: ['automated'],
      instrument: ['es'],
      week: 'week1',
      stats: {
        profit: '+18.5%',
        period: '30',
        trades: '156'
      }
    },
    {
      id: 2,
      image: achievement2,
      title: language === 'ar' ? 'نجاح استراتيجية ES' : 'Succès de la stratégie ES',
      description: language === 'ar'
        ? 'شرح مفصل لاستراتيجية ES الناجحة وكيف أدت إلى نتائج استثنائية. تضمين الأرقام والإحصائيات ذات الصلة لإظهار فعالية هذه الاستراتيجية.'
        : 'Explication détaillée de la stratégie ES réussie et comment elle a conduit à des résultats exceptionnels. Inclusion de chiffres et statistiques pertinents pour démontrer l\'efficacité de cette stratégie.',
      strategy: ['automated', 'longTerm'],
      instrument: ['es'],
      week: 'week1',
      stats: {
        profit: '+22.3%',
        period: '45',
        trades: '234'
      }
    },
    {
      id: 3,
      image: achievement3,
      title: language === 'ar' ? 'تحسين محفظة NQ' : 'Optimisation du portefeuille NQ',
      description: language === 'ar' 
        ? 'وصف تفصيلي للإنجاز وكيفية تحسين محفظة NQ للحصول على أفضل النتائج.'
        : 'Description détaillée de la réalisation et de l\'optimisation du portefeuille NQ pour obtenir les meilleurs résultats.',
      strategy: ['automated'],
      instrument: ['nq'],
      week: 'week2',
      stats: {
        profit: '+15.7%',
        period: '25',
        trades: '142'
      }
    },
    {
      id: 4,
      image: achievement4,
      title: language === 'ar' ? 'استراتيجية التداول المتقدمة' : 'Stratégie de trading avancée',
      description: language === 'ar' 
        ? 'تفاصيل حول استراتيجية التداول المتقدمة وكيفية تطبيقها بنجاح.'
        : 'Détails sur la stratégie de trading avancée et son application réussie.',
      strategy: ['manual', 'dayTrading'],
      instrument: ['es', 'nq'],
      week: 'week2',
      stats: {
        profit: '+25.1%',
        period: '20',
        trades: '312'
      }
    },
    {
      id: 5,
      image: achievement5,
      title: language === 'ar' ? 'نجاح اختبار المحفظة' : 'Réussite du test de portefeuille',
      description: language === 'ar' 
        ? 'نتائج اختبار المحفظة وتحليل الأداء التفصيلي.'
        : 'Résultats du test de portefeuille et analyse détaillée des performances.',
      strategy: ['longTerm'],
      instrument: ['forex'],
      week: 'week3',
      stats: {
        profit: '+19.8%',
        period: '60',
        trades: '89'
      }
    },
    {
      id: 6,
      image: achievement6,
      title: language === 'ar' ? 'تحليل السوق الدقيق' : 'Analyse précise du marché',
      description: language === 'ar' 
        ? 'تحليل متعمق لحركة السوق واتخاذ القرارات المناسبة.'
        : 'Analyse approfondie du mouvement du marché et prise de décisions appropriées.',
      strategy: ['manual'],
      instrument: ['crypto'],
      week: 'week3',
      stats: {
        profit: '+28.4%',
        period: '15',
        trades: '167'
      }
    },
    {
      id: 7,
      image: achievement7,
      title: language === 'ar' ? 'إدارة المخاطر المثالية' : 'Gestion optimale des risques',
      description: language === 'ar' 
        ? 'استراتيجية متكاملة لإدارة المخاطر وتحسين العوائد.'
        : 'Stratégie intégrée de gestion des risques et d\'optimisation des rendements.',
      strategy: ['automated', 'manual'],
      instrument: ['es', 'forex'],
      week: 'week3',
      stats: {
        profit: '+16.9%',
        period: '35',
        trades: '245'
      }
    },
    {
      id: 8,
      image: achievement8,
      title: language === 'ar' ? 'استراتيجية التداول اليومي' : 'Stratégie de day trading',
      description: language === 'ar' 
        ? 'نجاح في تطبيق استراتيجية التداول اليومي مع تحقيق أرباح مستقرة.'
        : 'Succès dans l\'application de la stratégie de day trading avec des profits stables.',
      strategy: ['dayTrading'],
      instrument: ['nq', 'crypto'],
      week: 'week4',
      stats: {
        profit: '+21.2%',
        period: '10',
        trades: '423'
      }
    },
    {
      id: 9,
      image: achievement9,
      title: language === 'ar' ? 'نجاح التداول على المدى الطويل' : 'Succès du trading à long terme',
      description: language === 'ar' 
        ? 'استراتيجية ناجحة للتداول على المدى الطويل مع تحقيق عوائد مستدامة.'
        : 'Stratégie réussie de trading à long terme avec des rendements durables.',
      strategy: ['longTerm'],
      instrument: ['es', 'nq', 'forex'],
      week: 'week4',
      stats: {
        profit: '+32.6%',
        period: '90',
        trades: '178'
      }
    }
  ];

  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [value]: !prevFilters[category][value]
      }
    }));
  };

  const filteredAchievements = achievements; // Temporarily allow all achievements to be displayed

  const openAchievement = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const closeAchievement = () => {
    setSelectedAchievement(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 transform rotate-12 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/20 via-purple-500/20 to-pink-500/20 transform -rotate-12 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            {language === 'ar' ? 'إنجازاتنا' : 'Nos Réalisations'}
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'استعرض أبرز إنجازاتنا في مجال التداول'
              : 'Découvrez nos principales réalisations dans le trading'}
          </p>
        </motion.div>

        {/* Desktop Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:block mb-12 bg-white/10 backdrop-blur-xl rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">
              {language === 'ar' ? 'تصفية النتائج' : 'Filtrer les résultats'}
            </h3>
            <button
              onClick={() => setFilters({
                strategy: {
                  automated: false,
                  manual: false,
                  longTerm: false,
                  dayTrading: false,
                },
                instrument: {
                  es: false,
                  nq: false,
                  forex: false,
                  crypto: false,
                },
                weeks: {
                  week1: false,
                  week2: false,
                  week3: false,
                  week4: false,
                }
              })}
              className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
            >
              {language === 'ar' ? 'إعادة تعيين' : 'Réinitialiser'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Strategy Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                {language === 'ar' ? 'الاستراتيجية' : 'Stratégie'}
              </h4>
              <div className="space-y-2">
                {Object.entries(filters.strategy).map(([key, value]) => (
                  <label 
                    key={key}
                    className="flex items-center space-x-3 cursor-pointer group"
                    dir="ltr"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.strategy[key]}
                        onChange={() => handleFilterChange('strategy', key)}
                        className="hidden"
                      />
                      <div className={`
                        w-5 h-5 border-2 rounded transition-all duration-200
                        ${filters.strategy[key] 
                          ? 'border-blue-400 bg-blue-400' 
                          : 'border-gray-400 group-hover:border-gray-300'
                        }
                      `}>
                        {filters.strategy[key] && (
                          <svg 
                            className="w-full h-full text-white p-0.5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={3} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={`
                      text-sm transition-colors duration-200
                      ${filters.strategy[key] 
                        ? 'text-white' 
                        : 'text-gray-300 group-hover:text-gray-200'
                      }
                    `}>
                      {language === 'ar' 
                        ? key === 'automated' ? 'تداول آلي' : key === 'manual' ? 'تداول يدوي' : key === 'longTerm' ? 'تداول طويل الأجل' : 'تداول يومي'
                        : key === 'automated' ? 'Trading automatisé' : key === 'manual' ? 'Trading manuel' : key === 'longTerm' ? 'Long terme' : 'Day trading'
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Instrument Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                {language === 'ar' ? 'الأدوات المالية' : 'Instruments'}
              </h4>
              <div className="space-y-2">
                {Object.entries(filters.instrument).map(([key, value]) => (
                  <label 
                    key={key}
                    className="flex items-center space-x-3 cursor-pointer group"
                    dir="ltr"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.instrument[key]}
                        onChange={() => handleFilterChange('instrument', key)}
                        className="hidden"
                      />
                      <div className={`
                        w-5 h-5 border-2 rounded transition-all duration-200
                        ${filters.instrument[key] 
                          ? 'border-purple-400 bg-purple-400' 
                          : 'border-gray-400 group-hover:border-gray-300'
                        }
                      `}>
                        {filters.instrument[key] && (
                          <svg 
                            className="w-full h-full text-white p-0.5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={3} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={`
                      text-sm transition-colors duration-200
                      ${filters.instrument[key] 
                        ? 'text-white' 
                        : 'text-gray-300 group-hover:text-gray-200'
                      }
                    `}>
                      {language === 'ar' 
                        ? key === 'es' ? 'ES' : key === 'nq' ? 'NQ' : key === 'forex' ? 'Forex' : 'العملات المشفرة'
                        : key === 'es' ? 'ES' : key === 'nq' ? 'NQ' : key === 'forex' ? 'Forex' : 'Crypto'
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Week Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">
                {language === 'ar' ? 'الأسابيع' : 'Semaines'}
              </h4>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((weekNum) => (
                  <label 
                    key={`week${weekNum}`}
                    className="flex items-center space-x-3 cursor-pointer group"
                    dir="ltr"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.weeks[`week${weekNum}`]}
                        onChange={() => handleFilterChange('weeks', `week${weekNum}`)}
                        className="hidden"
                      />
                      <div className={`
                        w-5 h-5 border-2 rounded transition-all duration-200
                        ${filters.weeks[`week${weekNum}`] 
                          ? 'border-blue-400 bg-blue-400' 
                          : 'border-gray-400 group-hover:border-gray-300'
                        }
                      `}>
                        {filters.weeks[`week${weekNum}`] && (
                          <svg 
                            className="w-full h-full text-white p-0.5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={3} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={`
                      text-sm transition-colors duration-200
                      ${filters.weeks[`week${weekNum}`] 
                        ? 'text-white' 
                        : 'text-gray-300 group-hover:text-gray-200'
                      }
                    `}>
                      {language === 'ar' 
                        ? `الأسبوع ${weekNum}` 
                        : `Semaine ${weekNum}`
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          <div className="mt-6 flex flex-wrap gap-2">
            {Object.entries(filters).flatMap(([category, values]) =>
              Object.entries(values)
                .filter(([_, isActive]) => isActive)
                .map(([key, _]) => (
                  <span
                    key={`${category}-${key}`}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-sm"
                  >
                    {category === 'strategy' && (language === 'ar' 
                      ? key === 'automated' ? 'تداول آلي' : key === 'manual' ? 'تداول يدوي' : key === 'longTerm' ? 'تداول طويل الأجل' : 'تداول يومي'
                      : key === 'automated' ? 'Trading automatisé' : key === 'manual' ? 'Trading manuel' : key === 'longTerm' ? 'Long terme' : 'Day trading'
                    )}
                    {category === 'instrument' && (language === 'ar' 
                      ? key === 'es' ? 'ES' : key === 'nq' ? 'NQ' : key === 'forex' ? 'Forex' : 'العملات المشفرة'
                      : key === 'es' ? 'ES' : key === 'nq' ? 'NQ' : key === 'forex' ? 'Forex' : 'Crypto'
                    )}
                    {category === 'weeks' && (language === 'ar' ? `الأسبوع ${key.replace('week', '')}` : `Semaine ${key.replace('week', '')}`)}
                    <button
                      onClick={() => handleFilterChange(category, key)}
                      className="ml-2 hover:text-red-400"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))
            )}
          </div>
        </motion.div>

        {/* Filter Button for Mobile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:hidden fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </svg>
          </button>
        </motion.div>

        {/* Mobile Filter Sidebar */}
        <AnimatePresence>
          {isFilterMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              />
              
              {/* Sidebar */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-md bg-gray-900/95 backdrop-blur-xl p-6 shadow-2xl z-50 overflow-y-auto md:hidden"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-semibold text-white">
                    {language === 'ar' ? 'الفلترة' : 'Filtres'}
                  </h3>
                  <button
                    onClick={() => setIsFilterMenuOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Reset Filters Button */}
                <button
                  onClick={() => {
                    setFilters({
                      strategy: {
                        automated: false,
                        manual: false,
                        longTerm: false,
                        dayTrading: false,
                      },
                      instrument: {
                        es: false,
                        nq: false,
                        forex: false,
                        crypto: false,
                      },
                      weeks: {
                        week1: false,
                        week2: false,
                        week3: false,
                        week4: false,
                      }
                    });
                    setIsFilterMenuOpen(false);
                  }}
                  className="w-full mb-6 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors text-white text-sm font-medium"
                >
                  {language === 'ar' ? 'إعادة تعيين' : 'Réinitialiser'}
                </button>

                {/* Filter Sections */}
                <div className="space-y-8">
                  {/* Strategy Filters */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-4">
                      {language === 'ar' ? 'الاستراتيجية' : 'Stratégie'}
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(filters.strategy).map(([key, value]) => (
                        <label 
                          key={key}
                          className="flex items-center space-x-3 cursor-pointer group"
                          dir="ltr"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={filters.strategy[key]}
                              onChange={() => handleFilterChange('strategy', key)}
                              className="hidden"
                            />
                            <div className={`
                              w-5 h-5 border-2 rounded transition-all duration-200
                              ${filters.strategy[key] 
                                ? 'border-indigo-400 bg-indigo-400' 
                                : 'border-gray-400 group-hover:border-gray-300'
                              }
                            `}>
                              {filters.strategy[key] && (
                                <svg 
                                  className="w-full h-full text-white p-0.5" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={3} 
                                    d="M5 13l4 4L19 7" 
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className={`
                            text-sm transition-colors duration-200
                            ${filters.strategy[key] 
                              ? 'text-white' 
                              : 'text-gray-300 group-hover:text-gray-200'
                            }
                          `}>
                            {language === 'ar' 
                              ? key === 'automated' ? 'تداول آلي' : key === 'manual' ? 'تداول يدوي' : key === 'longTerm' ? 'تداول طويل الأجل' : 'تداول يومي'
                              : key === 'automated' ? 'Trading automatisé' : key === 'manual' ? 'Trading manuel' : key === 'longTerm' ? 'Long terme' : 'Day trading'
                            }
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Instrument Filters */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-4">
                      {language === 'ar' ? 'الأدوات المالية' : 'Instruments'}
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(filters.instrument).map(([key, value]) => (
                        <label 
                          key={key}
                          className="flex items-center space-x-3 cursor-pointer group"
                          dir="ltr"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={filters.instrument[key]}
                              onChange={() => handleFilterChange('instrument', key)}
                              className="hidden"
                            />
                            <div className={`
                              w-5 h-5 border-2 rounded transition-all duration-200
                              ${filters.instrument[key] 
                                ? 'border-indigo-400 bg-indigo-400' 
                                : 'border-gray-400 group-hover:border-gray-300'
                              }
                            `}>
                              {filters.instrument[key] && (
                                <svg 
                                  className="w-full h-full text-white p-0.5" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={3} 
                                    d="M5 13l4 4L19 7" 
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className={`
                            text-sm transition-colors duration-200
                            ${filters.instrument[key] 
                              ? 'text-white' 
                              : 'text-gray-300 group-hover:text-gray-200'
                            }
                          `}>
                            {language === 'ar' 
                              ? key === 'es' ? 'ES' : key === 'nq' ? 'NQ' : key === 'forex' ? 'Forex' : 'العملات المشفرة'
                              : key === 'es' ? 'ES' : key === 'nq' ? 'NQ' : key === 'forex' ? 'Forex' : 'Crypto'
                            }
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Week Filters */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-4">
                      {language === 'ar' ? 'الأسابيع' : 'Semaines'}
                    </h4>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((weekNum) => (
                        <label 
                          key={`week${weekNum}`}
                          className="flex items-center space-x-3 cursor-pointer group"
                          dir="ltr"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={filters.weeks[`week${weekNum}`]}
                              onChange={() => handleFilterChange('weeks', `week${weekNum}`)}
                              className="hidden"
                            />
                            <div className={`
                              w-5 h-5 border-2 rounded transition-all duration-200
                              ${filters.weeks[`week${weekNum}`] 
                                ? 'border-indigo-400 bg-indigo-400' 
                                : 'border-gray-400 group-hover:border-gray-300'
                              }
                            `}>
                              {filters.weeks[`week${weekNum}`] && (
                                <svg 
                                  className="w-full h-full text-white p-0.5" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={3} 
                                    d="M5 13l4 4L19 7" 
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className={`
                            text-sm transition-colors duration-200
                            ${filters.weeks[`week${weekNum}`] 
                              ? 'text-white' 
                              : 'text-gray-300 group-hover:text-gray-200'
                            }
                          `}>
                            {language === 'ar' 
                              ? `الأسبوع ${weekNum}` 
                              : `Semaine ${weekNum}`
                            }
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative cursor-pointer"
              onClick={() => openAchievement(achievement)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <span className="block text-sm text-gray-400">Profit</span>
                      <span className="text-green-400 font-bold">{achievement.stats.profit}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-sm text-gray-400">Période</span>
                      <span className="font-bold">{achievement.stats.period}j</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-sm text-gray-400">Trades</span>
                      <span className="font-bold">{achievement.stats.trades}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {achievement.strategy.map(strat => (
                      <span key={strat} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                        {language === 'ar' 
                          ? strat === 'automated' ? 'تداول آلي' : strat === 'manual' ? 'تداول يدوي' : strat === 'longTerm' ? 'تداول طويل الأجل' : 'تداول يومي'
                          : strat === 'automated' ? 'Trading automatisé' : strat === 'manual' ? 'Trading manuel' : strat === 'longTerm' ? 'Long terme' : 'Day trading'
                        }
                      </span>
                    ))}
                    {achievement.instrument.map(inst => (
                      <span key={inst} className="px-2 py-1 bg-purple-500/20 rounded-full text-xs">
                        {language === 'ar' 
                          ? inst === 'es' ? 'ES' : inst === 'nq' ? 'NQ' : inst === 'forex' ? 'Forex' : 'العملات المشفرة'
                          : inst === 'es' ? 'ES' : inst === 'nq' ? 'NQ' : inst === 'forex' ? 'Forex' : 'Crypto'
                        }
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Detail Modal */}
        <AnimatePresence>
          {selectedAchievement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeAchievement}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-900/90 backdrop-blur-xl rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header with Image */}
                <div className="relative h-80">
                  <img 
                    src={selectedAchievement.image} 
                    alt={selectedAchievement.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <button 
                    onClick={closeAchievement}
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    {selectedAchievement.title}
                  </h2>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-lg">
                      <span className="block text-sm text-gray-400 mb-1">Profit</span>
                      <span className="text-2xl font-bold text-green-400">{selectedAchievement.stats.profit}</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-lg">
                      <span className="block text-sm text-gray-400 mb-1">Période</span>
                      <span className="text-2xl font-bold">{selectedAchievement.stats.period}j</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-lg">
                      <span className="block text-sm text-gray-400 mb-1">Trades</span>
                      <span className="text-2xl font-bold">{selectedAchievement.stats.trades}</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-lg">
                      <span className="block text-sm text-gray-400 mb-1">Semaine</span>
                      <span className="text-2xl font-bold">{selectedAchievement.week.replace('week', '')}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'ar' ? 'التفاصيل' : 'Détails'}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedAchievement.description}
                    </p>
                  </div>

                  {/* Tags Section */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        {language === 'ar' ? 'الاستراتيجيات' : 'Stratégies'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedAchievement.strategy.map(strat => (
                          <span key={strat} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                            {language === 'ar' 
                              ? strat === 'automated' ? 'تداول آلي' : strat === 'manual' ? 'تداول يدوي' : strat === 'longTerm' ? 'تداول طويل الأجل' : 'تداول يومي'
                              : strat === 'automated' ? 'Trading automatisé' : strat === 'manual' ? 'Trading manuel' : strat === 'longTerm' ? 'Long terme' : 'Day trading'
                            }
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        {language === 'ar' ? 'الأدوات المالية' : 'Instruments'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedAchievement.instrument.map(inst => (
                          <span key={inst} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                            {language === 'ar' 
                              ? inst === 'es' ? 'ES' : inst === 'nq' ? 'NQ' : inst === 'forex' ? 'Forex' : 'العملات المشفرة'
                              : inst === 'es' ? 'ES' : inst === 'nq' ? 'NQ' : inst === 'forex' ? 'Forex' : 'Crypto'
                            }
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results Message */}
        {filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto">
              <svg 
                className="mx-auto h-16 w-16 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium">
                {language === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
              </h3>
              <p className="mt-2 text-gray-400">
                {language === 'ar' 
                  ? 'لم يتم العثور على إنجازات تطابق معايير التصفية المحددة'
                  : 'Aucune réalisation ne correspond aux critères sélectionnés'}
              </p>
              <button 
                onClick={() => setFilters({
                  strategy: {
                    automated: false,
                    manual: false,
                    longTerm: false,
                    dayTrading: false,
                  },
                  instrument: {
                    es: false,
                    nq: false,
                    forex: false,
                    crypto: false,
                  },
                  weeks: {
                    week1: false,
                    week2: false,
                    week3: false,
                    week4: false,
                  }
                })}
                className="mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                {language === 'ar' ? 'إعادة تعيين' : 'Réinitialiser'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ModernResults;