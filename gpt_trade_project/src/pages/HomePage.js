import React from "react";
import Header from "../components/Header"; // Import header
import Footer from "../components/Footer"; // Import footer
import GPTTrade from "../pages/GPTTrade"; // Main content

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <GPTTrade />
      <Footer />
    </div>
  );
};

export default HomePage;
