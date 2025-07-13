import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/purohitcard.css';

const PurohitCard = ({ purohit, detailed = false }) => {
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  if (detailed) {
    return (
      <div className="purohit-card detailed">
        <div className="purohit-image">
          <img src={`/assets/${purohit.image}`} alt={purohit.name} />
        </div>
        <div className="purohit-details">
          <h3>{purohit.name}</h3>
          <p className="expertise">{purohit.expertise}</p>
          
          <div className="purohit-meta">
            <span><i className="fas fa-briefcase"></i> {purohit.experience} experience</span>
            <span><i className="fas fa-map-marker-alt"></i> {purohit.location}</span>
          </div>
          
          <div className="purohit-rating">
            {renderRatingStars(purohit.rating)}
            <span>{purohit.rating}/5</span>
          </div>
          
          <div className="purohit-languages">
            <h4>Languages:</h4>
            <div className="language-tags">
              {purohit.languages.map((lang, index) => (
                <span key={index} className="language-tag">{lang}</span>
              ))}
            </div>
          </div>
          
          <div className="purohit-about">
            <h4>About</h4>
            <p>{purohit.about}</p>
          </div>
          
          {purohit.ceremonies && (
            <div className="purohit-ceremonies">
              <h4>Specializes In:</h4>
              <ul>
                {purohit.ceremonies.map((ceremony, index) => (
                  <li key={index}>{ceremony}</li>
                ))}
              </ul>
            </div>
          )}
          
          <Link to="/book-pooja" className="book-btn">Book Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="purohit-card">
      <div className="purohit-image">
        <img src={`/assets/${purohit.image}`} alt={purohit.name} />
      </div>
      <div className="purohit-content">
        <h3>{purohit.name}</h3>
        <p className="expertise">{purohit.expertise}</p>
        
        <div className="purohit-meta">
          <span><i className="fas fa-briefcase"></i> {purohit.experience}</span>
          <span><i className="fas fa-map-marker-alt"></i> {purohit.location}</span>
        </div>
        
        <div className="purohit-rating">
          {renderRatingStars(purohit.rating)}
          <span>{purohit.rating}/5</span>
        </div>
        
        <Link to={`/purohits#${purohit.id}`} className="view-profile">View Profile</Link>
      </div>
    </div>
  );
};

export default PurohitCard;