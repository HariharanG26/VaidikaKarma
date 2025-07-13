import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/hero.css';

const HeroSection = ({ title, subtitle, image, ctaText, ctaLink }) => {
  return (
    <div 
      className="hero-container" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/${image})` }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {ctaText && ctaLink && (
          <Link to={ctaLink} className="hero-cta">
            {ctaText}
          </Link>
        )}
      </div>
      
      <div className="hero-overlay"></div>
    </div>
  );
};

export default HeroSection;