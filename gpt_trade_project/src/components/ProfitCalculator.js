import React, { useState } from 'react';
import { translations } from '../constants/translations';

export const ProfitCalculator = ({ language = 'fr' }) => {
  const [investment, setInvestment] = useState('');
  const [duration, setDuration] = useState('');
  const [results, setResults] = useState(null);

  const getTranslation = (key) => {
    try {
      return translations[language].profitCalculator[key];
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
  };

  const calculateProfit = (e) => {
    e.preventDefault();
    
    const investmentAmount = parseFloat(investment);
    const months = parseInt(duration);
    
    // Example calculation (replace with your actual calculation logic)
    const monthlyRate = 0.05; // 5% monthly return
    const totalProfit = investmentAmount * monthlyRate * months;
    const totalReturn = investmentAmount + totalProfit;
    const monthlyReturn = totalProfit / months;

    setResults({
      totalProfit,
      totalReturn,
      monthlyReturn
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={calculateProfit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {getTranslation('investment')}
          </label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            placeholder={getTranslation('enterAmount')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {getTranslation('duration')}
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder={getTranslation('enterDuration')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {getTranslation('calculate')}
        </button>
      </form>

      {results && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold mb-2">
            {getTranslation('estimatedProfit')}
          </h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">{getTranslation('totalReturn')}: </span>
              ${results.totalReturn.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">{getTranslation('monthlyReturn')}: </span>
              ${results.monthlyReturn.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProfitCalculator); 