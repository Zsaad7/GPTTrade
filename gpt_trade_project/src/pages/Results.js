import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../constants/translations';

// Import your achievement images
// Replace these with your actual image imports
import achievement1 from '../assets/achievements/achievement1.jpg';
import achievement2 from '../assets/achievements/achievement2.jpg';
import achievement3 from '../assets/achievements/achievement3.jpg';
import achievement4 from '../assets/achievements/achievement4.jpg';
import achievement5 from '../assets/achievements/achievement5.jpg';
import achievement6 from '../assets/achievements/achievement6.jpg';
import achievement7 from '../assets/achievements/achievement7.jpg';
import achievement8 from '../assets/achievements/achievement8.jpg';
import achievement9 from '../assets/achievements/achievement9.jpg';

const Results = () => {
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
    }
  });
  const [activeFilterTab, setActiveFilterTab] = useState('strategy');

  // Achievement data with additional filter properties
  const achievements = [
    {
      id: 1,
      image: achievement1,
      title: language === 'ar' ? 'إنجاز التداول الأول' : 'Premier succès de trading',
      description: language === 'ar' 
        ? 'تفاصيل حول هذا الإنجاز المهم في مجال التداول. هنا يمكنك إضافة المزيد من المعلومات حول كيفية تحقيق هذا الإنجاز والنتائج التي تم تحقيقها.'
        : 'Détails sur cette réalisation importante dans le domaine du trading. Vous pouvez ajouter plus d\'informations sur la façon dont cette réussite a été obtenue et les résultats qui ont été atteints.',
      strategy: ['automated'],
      instrument: ['es']
    },
    {
      id: 2,
      image: achievement2,
      title: language === 'ar' ? 'نجاح استراتيجية ES' : 'Succès de la stratégie ES',
      description: language === 'ar'
        ? 'شرح مفصل لاستراتيجية ES الناجحة وكيف أدت إلى نتائج استثنائية. تضمين الأرقام والإحصائيات ذات الصلة لإظهار فعالية هذه الاستراتيجية.'
        : 'Explication détaillée de la stratégie ES réussie et comment elle a conduit à des résultats exceptionnels. Inclusion de chiffres et statistiques pertinents pour démontrer l\'efficacité de cette stratégie.',
      strategy: ['automated', 'longTerm'],
      instrument: ['es']
    },
    // Add details for all 9 achievements
    {
      id: 3,
      image: achievement3,
      title: language === 'ar' ? 'تحسين محفظة NQ' : 'Optimisation du portefeuille NQ',
      description: language === 'ar' ? 'وصف تفصيلي للإنجاز...' : 'Description détaillée de la réalisation...',
      strategy: ['automated'],
      instrument: ['nq']
    },
    {
      id: 4,
      image: achievement4,
      title: language === 'ar' ? 'استراتيجية التداول المتقدمة' : 'Stratégie de trading avancée',
      description: language === 'ar' ? 'وصف تفصيلي للإنجاز...' : 'Description détaillée de la réalisation...',
      strategy: ['manual', 'dayTrading'],
      instrument: ['es', 'nq']
    },
    {
      id: 5,
      image: achievement5,
      title: language === 'ar' ? 'نجاح اختبار المحفظة' : 'Réussite du test de portefeuille',
      description: language === 'ar' ? 'وصف تفصيلي للإنجاز...' : 'Description détaillée de la réalisation...',
      strategy: ['longTerm'],
      instrument: ['forex']
    },
    {
      id: 6,
      image: achievement6,
      title: language === 'ar' ? 'تحليل السوق الدقيق' : 'Analyse précise du marché',
      description: language === 'ar' ? 'وصف تفصيلي للإنجاز...' : 'Description détaillée de la réalisation...',
      strategy: ['manual'],
      instrument: ['crypto']
    },
    {
      id: 7,
      image: achievement7,
      title: language === 'ar' ? 'إدارة المخاطر المثالية' : 'Gestion optimale des risques',
      description: language === 'ar' ? 'وصف تفصيلي للإنجاز...' : 'Description détaillée de la réalisation...',
      strategy: ['automated', 'manual'],
      instrument: ['es', 'forex']
    },
    {
      id: 8,
      image: achievement8,
      title: language === 'ar' ? 'استراتيجية التداول اليومي' : 'Stratégie de day trading',
      description: language === 'ar' ? 'وصف تفصيلي للإنجاز...' : 'Description détaillée de la réalisation...',
      strategy: ['dayTrading'],
      instrument: ['nq', 'crypto']
    },
    {
      id: 9,
      image: achievement9,
      title: language === 'ar' ? 'نجاح التداول على المدى الطويل' : 'Succès du trading à long terme',
      description: language === 'ar' ? 'وصف تفصيلي للإنجاز...' : 'Description détaillée de la réalisation...',
      strategy: ['longTerm'],
      instrument: ['es', 'nq', 'forex']
    },
  ];

  // Handle filter changes
  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [value]: !prevFilters[category][value]
      }
    }));
  };

  // Filter achievements based on selected filters
  const filteredAchievements = achievements.filter(achievement => {
    // If no filters are selected, show all achievements
    const anyStrategyFilterActive = Object.values(filters.strategy).some(value => value);
    const anyInstrumentFilterActive = Object.values(filters.instrument).some(value => value);
    
    if (!anyStrategyFilterActive && !anyInstrumentFilterActive) {
      return true;
    }

    // Check if achievement matches strategy filters
    const matchesStrategy = !anyStrategyFilterActive || 
      achievement.strategy.some(strat => filters.strategy[strat]);
    
    // Check if achievement matches instrument filters
    const matchesInstrument = !anyInstrumentFilterActive || 
      achievement.instrument.some(inst => filters.instrument[inst]);
    
    return matchesStrategy && matchesInstrument;
  });

  // Open achievement detail modal
  const openAchievement = (achievement) => {
    setSelectedAchievement(achievement);
  };

  // Close achievement detail modal
  const closeAchievement = () => {
    setSelectedAchievement(null);
  };

  // Reset all filters
  const resetFilters = () => {
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
      }
    });
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    return Object.values(filters.strategy).filter(Boolean).length + 
           Object.values(filters.instrument).filter(Boolean).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-24 px-4 sm:px-6 lg:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {language === 'ar' ? 'إنجازاتنا' : 'Nos Réalisations'}
          </h1>
          <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'استعرض أبرز إنجازاتنا في مجال التداول واختبارات المحافظ المالية'
              : 'Découvrez nos principales réalisations dans le domaine du trading et des tests de portefeuille'}
          </p>
        </motion.div>

        {/* New Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-10"
        >
          {/* Filter Header */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h2 className="text-lg font-medium text-gray-900">
                {language === 'ar' ? 'تصفية النتائج' : 'Filtrer les résultats'}
              </h2>
              {getActiveFilterCount() > 0 && (
                <span className="ml-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-1">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            
            <div className="mt-2 sm:mt-0 flex items-center">
              {getActiveFilterCount() > 0 && (
                <button 
                  onClick={resetFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {language === 'ar' ? 'مسح الفلاتر' : 'Effacer les filtres'}
                </button>
              )}
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveFilterTab('strategy')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeFilterTab === 'strategy' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {language === 'ar' ? 'الاستراتيجية' : 'Stratégie'}
                {Object.values(filters.strategy).some(Boolean) && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full px-2 py-0.5">
                    {Object.values(filters.strategy).filter(Boolean).length}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setActiveFilterTab('instrument')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeFilterTab === 'instrument' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {language === 'ar' ? 'الأدوات المالية' : 'Instruments'}
                {Object.values(filters.instrument).some(Boolean) && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full px-2 py-0.5">
                    {Object.values(filters.instrument).filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Filter Content */}
          <div className="p-6">
            {activeFilterTab === 'strategy' && (
              <div className="flex flex-wrap gap-3">
                <FilterToggle 
                  label={language === 'ar' ? 'تداول آلي' : 'Trading automatisé'} 
                  active={filters.strategy.automated}
                  onClick={() => handleFilterChange('strategy', 'automated')}
                />
                <FilterToggle 
                  label={language === 'ar' ? 'تداول يدوي' : 'Trading manuel'} 
                  active={filters.strategy.manual}
                  onClick={() => handleFilterChange('strategy', 'manual')}
                />
                <FilterToggle 
                  label={language === 'ar' ? 'تداول طويل الأجل' : 'Long terme'} 
                  active={filters.strategy.longTerm}
                  onClick={() => handleFilterChange('strategy', 'longTerm')}
                />
                <FilterToggle 
                  label={language === 'ar' ? 'تداول يومي' : 'Day trading'} 
                  active={filters.strategy.dayTrading}
                  onClick={() => handleFilterChange('strategy', 'dayTrading')}
                />
              </div>
            )}
            
            {activeFilterTab === 'instrument' && (
              <div className="flex flex-wrap gap-3">
                <FilterToggle 
                  label="ES Futures" 
                  active={filters.instrument.es}
                  onClick={() => handleFilterChange('instrument', 'es')}
                />
                <FilterToggle 
                  label="NQ Futures" 
                  active={filters.instrument.nq}
                  onClick={() => handleFilterChange('instrument', 'nq')}
                />
                <FilterToggle 
                  label="Forex" 
                  active={filters.instrument.forex}
                  onClick={() => handleFilterChange('instrument', 'forex')}
                />
                <FilterToggle 
                  label={language === 'ar' ? 'العملات المشفرة' : 'Crypto'} 
                  active={filters.instrument.crypto}
                  onClick={() => handleFilterChange('instrument', 'crypto')}
                />
              </div>
            )}
          </div>
          
          {/* Results Summary */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {language === 'ar' 
                ? `عرض ${filteredAchievements.length} من ${achievements.length} إنجازات`
                : `Affichage de ${filteredAchievements.length} sur ${achievements.length} réalisations`}
            </p>
          </div>
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              onClick={() => openAchievement(achievement)}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={achievement.image} 
                  alt={achievement.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-blue-600 font-medium">
                  {language === 'ar' ? 'انقر للتفاصيل' : 'Cliquez pour plus de détails'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* No Results Message */}
        {filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
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
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {language === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
            </h3>
            <p className="mt-2 text-gray-500">
              {language === 'ar' 
                ? 'لم يتم العثور على إنجازات تطابق معايير التصفية المحددة. يرجى تجربة معايير مختلفة.'
                : 'Aucune réalisation ne correspond aux critères de filtre sélectionnés. Veuillez essayer des critères différents.'}
            </p>
            <button 
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'ar' ? 'إعادة تعيين الفلاتر' : 'Réinitialiser les filtres'}
            </button>
          </motion.div>
        )}
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <img 
                src={selectedAchievement.image} 
                alt={selectedAchievement.title} 
                className="w-full h-80 object-cover"
              />
              <button 
                onClick={closeAchievement}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedAchievement.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{selectedAchievement.description}</p>
              
              {/* Additional details can be added here */}
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <span className="font-bold block mb-1">{language === 'ar' ? 'نوع الاستراتيجية' : 'Type de stratégie'}</span>
                  <span>{language === 'ar' ? 'تداول آلي' : 'Trading automatisé'}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <span className="font-bold block mb-1">{language === 'ar' ? 'الأدوات المالية' : 'Instruments financiers'}</span>
                  <span>ES, NQ Futures</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <span className="font-bold block mb-1">{language === 'ar' ? 'فترة الاختبار' : 'Période de test'}</span>
                  <span>{language === 'ar' ? '30 يوم' : '30 jours'}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <span className="font-bold block mb-1">{language === 'ar' ? 'النتيجة' : 'Résultat'}</span>
                  <span className="text-green-600 font-bold">+18.5%</span>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeAchievement}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {language === 'ar' ? 'إغلاق' : 'Fermer'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Filter Toggle Button Component
const FilterToggle = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <div className="flex items-center">
        {active && (
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        <span>{label}</span>
      </div>
    </button>
  );
};

export default Results; 