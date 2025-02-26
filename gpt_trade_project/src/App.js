import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CTAPage from "./pages/CTAPage";
import Results from "./pages/Results";
import Header from './components/Header';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="app min-h-screen flex flex-col">
          <Header />
          <main className="pt-16 flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/cta" element={<CTAPage />} /> */}
              <Route path="/results" element={<Results />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
