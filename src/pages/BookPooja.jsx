import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import BookingForm from '../components/BookingForm';
import '../styles/bookpooja.css';

const BookPooja = () => {
  const [activeTab, setActiveTab] = useState('book');
  
  const popularPoojas = [
    {
      id: 1,
      name: 'Ganapathi Homam',
      description: 'Remove obstacles and ensure success in new ventures',
      duration: '2-3 hours',
      bestFor: ['New business', 'House warming', 'Exam success'],
      image: 'ganapathi.jpg'
    },
    {
      id: 2,
      name: 'Satyanarayana Pooja',
      description: 'For prosperity, peace and fulfillment of wishes',
      duration: '3-4 hours',
      bestFor: ['Family welfare', 'Financial stability', 'Marital harmony'],
      image: 'homa.jpg'
    },
    {
      id: 3,
      name: 'Navagraha Homam',
      description: 'Mitigate malefic planetary influences in your horoscope',
      duration: '4-5 hours',
      bestFor: ['Planetary remedies', 'Career obstacles', 'Health issues'],
      image: 'homa.jpg'
    }
  ];

  return (
    <div className="book-pooja-page">
      <HeroSection 
        title="Book a Pooja/Homa"
        subtitle="Schedule your spiritual ceremony with our experienced purohits"
        image="hero-bg.jpg"
      />
      
      <div className="booking-container">
        <div className="booking-tabs">
          <button 
            className={`tab-btn ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => setActiveTab('book')}
          >
            Book a Pooja
          </button>
          <button 
            className={`tab-btn ${activeTab === 'popular' ? 'active' : ''}`}
            onClick={() => setActiveTab('popular')}
          >
            Popular Poojas
          </button>
        </div>
        
        {activeTab === 'book' ? (
          <div className="booking-form-section">
            <BookingForm />
          </div>
        ) : (
          <div className="popular-poojas-section">
            <h3>Most Requested Ceremonies</h3>
            <p className="subtitle">These are some of our most frequently booked rituals</p>
            
            <div className="poojas-grid">
              {popularPoojas.map(pooja => (
                <div key={pooja.id} className="pooja-card">
                  <div className="pooja-image">
                    <img src={`/assets/${pooja.image}`} alt={pooja.name} />
                  </div>
                  <div className="pooja-details">
                    <h4>{pooja.name}</h4>
                    <p className="description">{pooja.description}</p>
                    <div className="pooja-meta">
                      <span><i className="fas fa-clock"></i> {pooja.duration}</span>
                    </div>
                    <div className="best-for">
                      <h5>Best For:</h5>
                      <ul>
                        {pooja.bestFor.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <button 
                      className="book-now-btn"
                      onClick={() => setActiveTab('book')}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <section className="booking-process">
        <div className="container">
          <h3>Our Booking Process</h3>
          <div className="process-steps">
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h4>1. Select Date & Time</h4>
              <p>Choose your preferred date and time for the ceremony</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-pooja-bell"></i>
              </div>
              <h4>2. Choose Pooja</h4>
              <p>Select from our list of authentic Vedic rituals</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <h4>3. Select Purohit</h4>
              <p>Pick from our qualified purohits based on availability</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h4>4. Confirm Booking</h4>
              <p>Receive confirmation and preparation guidelines</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPooja;