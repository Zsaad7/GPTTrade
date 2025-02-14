import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
  <Header />
  <main className="flex-grow">
    <Hero />
    <Features />
    <Testimonials />
    <CTA />
  </main>
  <Footer className="bg-gray-800 text-white p-4" />
</div>
  );
}

export default App;