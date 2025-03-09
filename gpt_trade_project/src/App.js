import React from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ModernResults from "./pages/ModernResults";
import TestimonialAdmin from "./pages/TestimonialAdmin";
import Signup from './pages/Signup';
import SignIn from './pages/SignIn'; // Correct - default import
import Profile from './pages/Profile'; // Import the new Profile component
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import { LanguageProvider } from './context/LanguageContext';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modernresults" element={<ModernResults />} />
          <Route path="/admin/testimonials" element={<TestimonialAdmin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
  );
};

export default App;