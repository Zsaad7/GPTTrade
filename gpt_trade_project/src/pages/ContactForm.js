import React, { useState } from 'react';
import { sendMessage } from '../config/firebase';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    numberphone: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Veuillez entrer une adresse e-mail valide.';
    if (!formData.numberphone.trim() || !/^\d{10}$/.test(formData.numberphone))
      newErrors.numberphone = 'Veuillez entrer un numéro de téléphone valide (10 chiffres).';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulate form submission
    const response = await sendMessage(formData);
    if (response.success) {
      setSuccessMessage('Votre message a été envoyé avec succès.');
      setFormData({ name: '', email: '', numberphone: '' });
      setErrors({});
    } else {
      setErrors({ general: "Une erreur s'est produite. Veuillez réessayer." });
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Contactez-nous</h2>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="flex flex-col items-center">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-center">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full sm:w-96 px-4 py-2 border rounded focus:ring focus:ring-blue-300 text-black ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Votre nom"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1 text-center w-full sm:w-96">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className="flex flex-col items-center">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-center">
            Adresse e-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full sm:w-96 px-4 py-2 border rounded focus:ring focus:ring-blue-300 text-black ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Votre adresse e-mail"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1 text-center w-full sm:w-96">{errors.email}</p>}
        </div>

        {/* Numberphone Field */}
        <div className="flex flex-col items-center">
          <label htmlFor="numberphone" className="block text-gray-700 font-medium mb-2 text-center">
            Numéro Téléphone
          </label>
          <input
            type="text"
            id="numberphone"
            name="numberphone"
            value={formData.numberphone}
            onChange={handleChange}
            className={`w-full sm:w-96 px-4 py-2 border rounded focus:ring focus:ring-blue-300 text-black ${
              errors.numberphone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Votre numéro de téléphone (10 chiffres)"
          />
          {errors.numberphone && <p className="text-red-500 text-sm mt-1 text-center w-full sm:w-96">{errors.numberphone}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="w-full sm:w-96 bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;