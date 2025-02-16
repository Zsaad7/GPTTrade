import React from "react";
import ContactForm from "../pages/ContactForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CTAPage = () => {
  return (
    <><><Header /><div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white">
      <h1 className="text-3xl font-bold mb-4">Ready to Get Started?</h1>
      <p className="mb-8">Fill out the form below to contact us.</p>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <ContactForm />
      </div>
    </div></>
    <Footer /></>
  );
};

export default CTAPage;
