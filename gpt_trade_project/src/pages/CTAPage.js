import React from 'react';
import ContactForm from '../pages/ContactForm';

const CTAPage = () => {
  return (
    <div className="py-16 bg-blue-600 text-white text-center">
      <h1 className="text-3xl font-bold mb-4">Prêt à commencer ?</h1>
      <p className="mb-6">Remplissez le formulaire ci-dessous pour nous contacter.</p>
      <div className="max-w-lg mx-auto">
        <ContactForm />
      </div>
    </div>
  );
};

export default CTAPage;