import React from 'react';
import ContactForm from '../pages/ContactForm'; // Ensure this path is correct

const CTAPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-600 text-white"> {/* Set background to blue */}
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Prêt à commencer ?</h1>
        <p className="text-center mb-8">Remplissez le formulaire ci-dessous pour nous contacter.</p>
        <div> {/* White background for form */}
          <ContactForm />
        </div>
      </main>
    </div>
  );
};

export default CTAPage;