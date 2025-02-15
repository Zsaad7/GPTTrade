import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import tradingImage from '../assets/trading.jpg';
import successImage from '../assets/success.jpg';
import marketImage from '../assets/market.jpg';
import "../styles/global.css"; // Import global CSS


const GPTTrade = () => {
  // Simulated market data (replace with real API call)
  const [marketInfo, setMarketInfo] = useState({ nq: 17500.25, es: 4875.80 });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch market data (replace with actual API)
      setMarketInfo({
        nq: (17500 + Math.random() * 50).toFixed(2),
        es: (4875 + Math.random() * 20).toFixed(2),
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section class="grading" >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Title Section */}
        <motion.h1 
          className="text-5xl font-extrabold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🚀 Entreprise GPTTrade : Votre succès est notre priorité !
        </motion.h1>

        {/* Live Market Data */}
        <section className="py-12 bg-gray-900 text-white text-center rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-6">📈 Live Market Trends</h2>
          <div className="flex justify-center gap-6">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-semibold">NQ Futures</h3>
              <p className="text-xl text-green-400">${marketInfo.nq}</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-semibold">ES Futures</h3>
              <p className="text-xl text-green-400">${marketInfo.es}</p>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <article className="prose prose-lg max-w-5xl mx-auto space-y-12 text-gray-700 mt-12">
          
          {/* Introduction */}
          <motion.div className="bg-white shadow-xl rounded-lg p-8 hover:shadow-2xl transition duration-300" whileHover={{ scale: 1.03 }}>
            <img src={tradingImage} alt="Trading" className="rounded-lg mb-4 w-full object-cover h-64" />
            <p className="text-lg leading-relaxed">
              GPTTrade vous accompagne dans la réussite de votre test de portefeuille financier, sans commissions avant d’atteindre vos résultats escomptés !
            </p>
          </motion.div>

          {/* Why Choose GPTTrade */}
          <motion.div className="bg-white shadow-xl rounded-lg p-8 hover:shadow-2xl transition duration-300" whileHover={{ scale: 1.03 }}>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">💡 Pourquoi choisir GPTTrade ?</h2>
            <img src={successImage} alt="Success" className="rounded-lg mb-4 w-full object-cover h-64" />
            <p className="text-lg leading-relaxed">
              Nous croyons en votre réussite avant tout. Pas de frais cachés, pas de commission avant succès.
            </p>
          </motion.div>

          {/* Testimonials */}
          <motion.div className="bg-blue-50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 text-center">
            <h2 className="text-3xl font-bold mb-6">⭐ Ce que disent nos clients</h2>
            <p className="text-lg italic">"Grâce à GPTTrade, j'ai passé mon test sans stress. Une équipe de pro !" - <strong>Alice M.</strong></p>
          </motion.div>

          {/* Profit Calculator */}
          <motion.div className="bg-white shadow-xl rounded-lg p-8 hover:shadow-2xl transition duration-300" whileHover={{ scale: 1.03 }}>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">📊 Calculez vos profits</h2>
            <ProfitCalculator />
          </motion.div>

          {/* Comparison Table */}
          <motion.div className="bg-gray-900 text-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 text-center">
            <h2 className="text-3xl font-bold mb-6">⚖ Comparez GPTTrade</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full max-w-4xl mx-auto border-collapse border border-gray-700">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-4 border border-gray-700">Feature</th>
                    <th className="p-4 border border-gray-700">GPTTrade</th>
                    <th className="p-4 border border-gray-700">Others</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-gray-700">Pas de frais cachés</td>
                    <td className="p-4 text-green-400 font-bold">✔ Oui</td>
                    <td className="p-4 text-red-400 font-bold">✘ Non</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-700">Trading expert NQ & ES</td>
                    <td className="p-4 text-green-400 font-bold">✔ Oui</td>
                    <td className="p-4 text-red-400 font-bold">✘ Non</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 rounded-lg shadow-xl hover:shadow-2xl transition duration-300" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold mb-4">🚀 Prêt à réussir ?</h2>
            <p className="text-lg leading-relaxed mb-6">
              Contactez-nous dès aujourd'hui et laissez-nous vous guider vers la réussite financière !
            </p>
            <a href="/cta" className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-full transition duration-300 hover:bg-gray-100 shadow-lg hover:shadow-xl">
              📞 Contactez-nous maintenant
            </a>
          </motion.div>

        </article>
      </div>
    </section>
  );
};

const ProfitCalculator = () => {
  const [investment, setInvestment] = useState(1000);
  const estimatedReturn = investment * 1.25;

  return (
    <div className="text-center">
      <input type="number" className="border p-2 rounded w-48" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
      <p className="mt-4 text-lg font-semibold">Retour estimé: <span className="text-green-600">${estimatedReturn.toFixed(2)}</span></p>
    </div>
  );
};

export default GPTTrade;
