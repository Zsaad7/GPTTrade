import React from 'react';
import '../styles/testimonials.css';

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-list">
        <div className="testimonial-item">
          <p>"Great service and support!"</p>
          <cite>- John Doe</cite>
        </div>
        <div className="testimonial-item">
          <p>"Highly recommended!"</p>
          <cite>- Jane Smith</cite>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;