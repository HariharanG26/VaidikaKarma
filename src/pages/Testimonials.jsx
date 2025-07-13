import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import TestimonialCard from '../components/TestimonialCard';
import ReviewForm from '../components/ReviewForm';
import '../styles/testimonials.css';

const Testimonials = () => {
  /* ----- initial testimonials ----- */
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      location: 'Bangalore',
      review:
        'The Ganapathi Homam performed by Shri Venkatesh Shastri was truly divine …',
      rating: 5,
      date: '15 Jan 2023',
      ceremony: 'Ganapathi Homam',
    },
    {
      id: 2,
      name: 'Priya Menon',
      location: 'Chennai',
      review:
        'Our wedding ceremony was conducted with such authenticity and grace …',
      rating: 5,
      date: '22 Nov 2022',
      ceremony: 'Wedding Ceremony',
    },
  ]);

  /* ----- show / hide form ----- */
  const [showForm, setShowForm] = useState(false);

  /* ----- callback to add new review ----- */
  const addReview = (data) => {
    const newItem = {
      ...data,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };
    setTestimonials((prev) => [newItem, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="testimonials-page">
      <HeroSection
        title="Client Testimonials"
        subtitle="Hear from those who have experienced our services"
        image="hero-bg.jpg"
      />

      {/* testimonials list */}
      <section className="all-testimonials">
        <div className="container">
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">
            Read genuine feedback from our clients about their experiences
          </p>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} detailed />
            ))}
          </div>
        </div>
      </section>

      {/* ratings summary ... (unchanged) */}

      {/* share‑experience section */}
      <section className="add-testimonial">
        <div className="container">
          <h3>Share Your Experience</h3>
          <p>
            Have you used our services? We&apos;d love to hear about your
            experience!
          </p>

          {!showForm && (
            <button className="btn" onClick={() => setShowForm(true)}>
              Submit Your Review
            </button>
          )}

          {showForm && (
            <ReviewForm onSave={addReview} onCancel={() => setShowForm(false)} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
