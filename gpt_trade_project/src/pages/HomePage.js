import React from 'react';
import Hero from '../components/Hero';
import GPTTrade from '../pages/GPTTrade'; // Importez le composant GPTTrade

const HomePage = () => {
  return (
    <div>
      {/* <Hero /> */}
      <GPTTrade /> {/* Ajoutez le composant GPTTrade ici */}
    </div>
  );
};

export default HomePage;