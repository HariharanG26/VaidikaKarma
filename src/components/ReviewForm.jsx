import React, { useState } from 'react';

const ReviewForm = ({ onSave, onCancel }) => {
  const [values, setValues] = useState({
    name: '',
    location: '',
    ceremony: '',
    rating: 5,
    review: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(values);
    // form resets handled by parent
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          name="name"
          placeholder="Your Name"
          value={values.name}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={values.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <input
          name="ceremony"
          placeholder="Ceremony / Service"
          value={values.ceremony}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          placeholder="Rating"
          value={values.rating}
          onChange={handleChange}
          required
        />
      </div>

      <textarea
        name="review"
        placeholder="Write your review…"
        rows="4"
        value={values.review}
        onChange={handleChange}
        required
      />

      <div className="form-actions">
        <button type="submit" className="btn primary">
          Submit Review
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
