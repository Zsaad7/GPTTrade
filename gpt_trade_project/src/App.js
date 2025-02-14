import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
// import FeaturesPage from './pages/FeaturesPage';
// import TestimonialsPage from './pages/TestimonialsPage';
import CTAPage from './pages/CTAPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Shared Header */}
        <Header />

        {/* Main Content with Routing */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/features" element={<FeaturesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} /> */}
            <Route path="/cta" element={<CTAPage />} />
          </Routes>
        </main>

        {/* Shared Footer */}
        <Footer className="bg-gray-800 text-white p-4" />
      </div>
    </Router>
  );
}

export default App;