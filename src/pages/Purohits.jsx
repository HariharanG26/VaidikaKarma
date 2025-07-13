import React from 'react';
import HeroSection from '../components/HeroSection';
import PurohitCard from '../components/PurohitCard';
import '../styles/purohits.css';

const Purohits = () => {
  // Single‑purohit array
  const allPurohits = [
    {
      id: 1,
      name: 'Shri Venkatesh Shastri',
      expertise: 'Vedic Rituals, Homams',
      experience: '25 years',
      location: 'Bangalore',
      languages: ['Sanskrit', 'Kannada', 'Telugu', 'Hindi'],
      image: 'purohit1.jpg',          // ⬅️ make sure this file is in /public or /src/assets
      rating: 4.8,
      about:
        'A highly respected Vedic scholar with expertise in all major homams and rituals. Trained in the traditional gurukula system.',
      ceremonies: [
        'Ganapathi Homam',
        'Navagraha Homam',
        'Satyanarayana Pooja',
        'Weddings',
      ],
    },
  ];

  return (
    <div className="purohits-page">
      <HeroSection
        title="Our Purohit"
        subtitle="Connect with authentic Vedic scholars for your spiritual needs"
        image="hero-bg.jpg"
      />

      <section className="all-purohits">
        <div className="container">
          <h2 className="section-title">Meet Our Purohit</h2>
          <p className="section-subtitle">
            Qualified Vedic scholar with years of experience in performing
            authentic rituals
          </p>

          <div className="purohits-grid">
            {/* Render the single card */}
            <PurohitCard purohit={allPurohits[0]} detailed />
          </div>
        </div>
      </section>

      <section className="purohit-selection">
        <div className="container">
          <h3>How to Choose the Right Purohit?</h3>
          <div className="selection-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Identify Your Needs</h4>
              <p>Determine the type of ceremony or ritual you need performed.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Check Expertise</h4>
              <p>Look for purohits specialized in that particular ceremony.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Consider Language</h4>
              <p>Ensure the purohit can explain rituals in a language you understand.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h4>Review Ratings</h4>
              <p>Check feedback from previous clients about their experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Purohits;
