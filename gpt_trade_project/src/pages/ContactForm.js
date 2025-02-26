import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { translations } from '../constants/translations';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactForm = ({ language = 'fr' }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Create a helper function to safely get translations
  const getTranslation = (key) => {
    try {
      return translations[language][key] || translations['fr'][key];
    } catch (error) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Add document to Firestore
      await addDoc(collection(db, 'contacts'), {
        fullName,
        email,
        phone,
        createdAt: serverTimestamp(),
        language
      });

      // Clear form
      setFullName('');
      setEmail('');
      setPhone('');
      
      setSubmitStatus({
        type: 'success',
        message: language === 'ar' ? 'تم إرسال النموذج بنجاح' : 
                language === 'fr' ? 'Formulaire envoyé avec succès' : 
                'Form submitted successfully'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: language === 'ar' ? 'حدث خطأ أثناء الإرسال' : 
                language === 'fr' ? 'Erreur lors de l\'envoi' : 
                'Error submitting form'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-5xl font-extrabold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {getTranslation('contactUsTitle')}
        </motion.h1>

        <motion.div 
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 hover:shadow-2xl transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {submitStatus.message && (
            <div className={`mb-4 p-4 rounded ${
              submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{getTranslation('fullNameLabel')}</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{getTranslation('emailLabel')}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{getTranslation('phoneLabel')}</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                placeholder="0123456789"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {getTranslation('submitButton')}
                </span>
              ) : (
                getTranslation('submitButton')
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;