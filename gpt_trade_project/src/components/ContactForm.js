import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { addTestimonial } from '../services/testimonialService';
import { translations } from '../constants/translations';

const ContactForm = () => {
  const { language } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    setError('');
    setSuccess(false);

    try {
      const response = await addTestimonial({ fullName, email, phone });
      if (response.success) {
        setSuccess(true);
        setFullName('');
        setEmail('');
        setPhone('');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while submitting the testimonial.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        {getTranslation('contactUsTitle')}
      </h2>

      {error && (
        <div className="mb-4 p-4 rounded bg-red-100 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 rounded bg-green-100 text-green-700">
          {language === 'ar' ? 'تم إرسال الشهادة بنجاح' : 'Testimonial submitted successfully!'}
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
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
        >
          {getTranslation('submitButton')}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;