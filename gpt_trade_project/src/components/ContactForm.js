import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { translations } from '../constants/translations';
import { useLanguage } from '../context/LanguageContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const ContactForm = () => {
  const { language } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

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
                'Formulaire envoyé avec succès'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: language === 'ar' ? 'حدث خطأ أثناء الإرسال' : 
                'Erreur lors de l\'envoi'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        {getTranslation('contactUsTitle')}
      </h2>

      {submitStatus.message && (
        <div className={`mb-4 p-4 rounded ${
          submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-white">
            {getTranslation('fullNameLabel')}
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
            {getTranslation('emailLabel')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2 text-white">
            {getTranslation('phoneLabel')}
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="[0-9]{10}"
            placeholder="0123456789"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ${
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
    </div>
  );
};

export default ContactForm; 