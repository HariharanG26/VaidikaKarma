import React from 'react';
import '../styles/testimonialcard.css';

const TestimonialCard = ({ testimonial, detailed = false }) => {
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i - 0.5 <= rating) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  if (detailed) {
    return (
      <div className="testimonial-card detailed">
        <div className="testimonial-rating">
          {renderRatingStars(testimonial.rating)}
        </div>
        <p className="testimonial-text">"{testimonial.review}"</p>
        <div className="testimonial-author">
          <div className="author-info">
            <h4>{testimonial.name}</h4>
            <p className="author-meta">
              {testimonial.location && <span>{testimonial.location}</span>}
              {testimonial.date && <span>{testimonial.date}</span>}
              {testimonial.ceremony && <span>{testimonial.ceremony}</span>}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="testimonial-card">
      <div className="testimonial-rating">
        {renderRatingStars(testimonial.rating)}
      </div>
      <p className="testimonial-text">"{testimonial.review}"</p>
      <div className="testimonial-author">
        <h4>{testimonial.name}</h4>
      </div>
    </div>
  );
};

export default TestimonialCard;