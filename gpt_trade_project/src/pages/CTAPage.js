import React from "react";
import ContactForm from "../components/ContactForm";

const CTAPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <ContactForm />
      </div>
    </div>
  );
};

export default CTAPage;
