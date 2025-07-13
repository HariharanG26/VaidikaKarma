import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Here you would typically send the data to your backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <HeroSection 
          title="Contact Us"
          subtitle="Get in touch with our team"
          image="hero-bg.jpg"
        />
        <div className="thank-you-message">
          <h3>Thank you for contacting us!</h3>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <p>For urgent inquiries, please call our support number: +91 9876543210</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <HeroSection 
        title="Contact Us"
        subtitle="Get in touch with our team"
        image="hero-bg.jpg"
      />
      
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form">
              <h3>Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows="5"
                  />
                </div>
                
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
            
            <div className="contact-info">
              <h3>Contact Information</h3>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="info-content">
                  <h4>Address</h4>
                  <p>Kovilambakkam , Chennai , 600129</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="info-content">
                  <h4>Phone</h4>
                  <p>+91 0123456789</p>
                  <p>+91 0123456789 (Support)</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="info-content">
                  <h4>Email</h4>
                  <p>vaidhegavenkatesan@gmail.com</p>
                  {/* <p>support@vedicpurohit.com</p> */}
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="info-content">
                  <h4>Working Hours</h4>
                  <p>Monday - Saturday: 7:00 AM - 8:00 PM</p>
                  <p>Sunday: 8:00 AM - 2:00 PM</p>
                </div>
              </div>
              
              <div className="social-links">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-youtube"></i></a>
                  <a href="#"><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="map-section">
        <div className="container">
          <h3>Our Location</h3>
          <div className="map-container">
            <iframe 
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.005168557708!2d77.59451431482189!3d12.97196299085677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf5df5c5a7a10f1e!2sBangalore%20Fort!5e0!3m2!1sen!2sin!4v1624960383997!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;