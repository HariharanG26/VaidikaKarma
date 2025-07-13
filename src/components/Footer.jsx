import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Purohits', path: '/purohits' },
    { name: 'Book Pooja', path: '/book-pooja' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    { name: 'Ganapathi Homam', path: '/services#ganapathi' },
    { name: 'Satyanarayana Pooja', path: '/services#satyanarayana' },
    { name: 'Navagraha Homam', path: '/services#navagraha' },
    { name: 'Wedding Ceremonies', path: '/services#wedding' },
    { name: 'Upanayanam', path: '/services#upanayanam' },
    { name: 'Griha Pravesh', path: '/services#griha' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4>VaidikaKarma</h4>
            <p>
              Connecting you with authentic Vedic purohits for all your spiritual needs. 
              Preserving ancient traditions in the modern world.
            </p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              {services.map((service, index) => (
                <li key={index}>
                  <Link to={service.path}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Kovilambakkam, Chennai - 600129</span>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <span>+91 0123456789</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>Vaidhigavenkatesan@gmail.com</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Mon-Sat: 7:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="copyright">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} VaidikaKarma. All Rights Reserved.</p>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms & Conditions</Link>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;