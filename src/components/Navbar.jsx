// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

import logo from '../assets/logo.png';
import '../styles/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [showLogo, setShowLogo] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleAuthClick = (type) => {
    setAuthType(type);
    setShowAuthModal(true);
    closeMenu();
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Logout failed: ' + err.message);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Brand logo and text */}
          <Link
            to="#"
            className="navbar-logo"
            onClick={(e) => {
              e.preventDefault();
              setShowLogo(true);
            }}
          >
            <img src={logo} alt="VaidikaKarma logo" className="navbar-logo-img" />
            <span className="navbar-logo-text">Vaidika_Karma</span>
          </Link>

          {/* Mobile menu button */}
          <button className="mobile-menu-button" onClick={toggleMenu}>
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>

          {/* Navigation links */}
          <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item"><Link to="/" className="nav-links" onClick={closeMenu}>Home</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-links" onClick={closeMenu}>About</Link></li>
            <li className="nav-item"><Link to="/services" className="nav-links" onClick={closeMenu}>Services</Link></li>
            <li className="nav-item"><Link to="/purohits" className="nav-links" onClick={closeMenu}>Purohits</Link></li>
            <li className="nav-item"><Link to="/book-pooja" className="nav-links" onClick={closeMenu}>Bookings</Link></li>
            <li className="nav-item"><Link to="/testimonials" className="nav-links" onClick={closeMenu}>Testimonials</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-links" onClick={closeMenu}>Contact</Link></li>

            {/* Conditionally render auth links */}
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-links" onClick={closeMenu}>Profile</Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-bookings" className="nav-links" onClick={closeMenu}>My Bookings</Link>
                </li>

                {/* Admin-only link */}
                {user?.isAdmin && (
                  <li className="nav-item">
                    <Link to="/admin-bookings" className="nav-links" onClick={closeMenu}>Admin Dashboard</Link>
                  </li>
                )}

                <li className="nav-item">
                  <button className="nav-btn" onClick={() => { handleLogout(); closeMenu(); }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="nav-btn" onClick={() => handleAuthClick('login')}>
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-btn primary" onClick={() => handleAuthClick('register')}>
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Auth Modal */}
        <AuthModal
          show={showAuthModal}
          handleClose={() => setShowAuthModal(false)}
          authType={authType}
          setAuthType={setAuthType}
        />
      </nav>

      {/* Logo viewer */}
      {showLogo && (
        <div className="logo-backdrop" onClick={() => setShowLogo(false)}>
          <div className="logo-box" onClick={(e) => e.stopPropagation()}>
            <button className="logo-close" onClick={() => setShowLogo(false)}>&times;</button>
            <img src={logo} alt="Full‑size logo" className="logo-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
