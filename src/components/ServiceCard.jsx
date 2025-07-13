import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/servicecard.css';

const ServiceCard = ({ service, detailed = false }) => {
  if (detailed) {
    return (
      <div className="service-card detailed">
        <div className="service-image">
          <img src={`/assets/${service.image}`} alt={service.title} />
        </div>
        <div className="service-details">
          <h3>{service.title}</h3>
          <p className="description">{service.description}</p>
          
          <div className="service-meta">
            <span><i className="fas fa-clock"></i> {service.duration}</span>
            <span><i className="fas fa-rupee-sign"></i> {service.price}</span>
          </div>
          
          {service.benefits && (
            <div className="service-benefits">
              <h4>Benefits:</h4>
              <ul>
                {service.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="service-actions">
            <Link to="/book-pooja" className="book-btn">Book Now</Link>
            <Link to={`/services#${service.id}`} className="learn-more">Learn More</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-card">
      <div className="service-image">
        <img src={`/assets/${service.image}`} alt={service.title} />
      </div>
      <div className="service-content">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        
        <div className="service-meta">
          <span><i className="fas fa-clock"></i> {service.duration}</span>
          <span><i className="fas fa-rupee-sign"></i> {service.price}</span>
        </div>
        
        <Link to={`/services#${service.id}`} className="learn-more">Learn More</Link>
      </div>
    </div>
  );
};

export default ServiceCard;