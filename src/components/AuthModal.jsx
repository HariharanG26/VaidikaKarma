import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/authmodal.css';
import { auth, db } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

const AuthModal = ({ show, handleClose, authType, setAuthType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (authType === 'register') {
      if (!formData.name.trim()) {
        toast.error('Please enter your full name');
        return false;
      }
      if (!formData.phone.trim()) {
        toast.error('Please enter your phone number');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match!");
        return false;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (authType === 'register') {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;

        await updateProfile(user, { displayName: formData.name });

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          createdAt: new Date(),
          provider: 'email',
        });

        toast.success('🎉 Registered successfully!');
        setTimeout(() => {
          handleClose();
          navigate('/');
        }, 1500);
      } else if (authType === 'login') {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success('✅ Logged in successfully!');
        setTimeout(() => {
          handleClose();
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      console.error('Auth Error:', err);
      let errorMessage = 'Authentication failed';

      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Weak password';
          break;
        case 'auth/user-not-found':
          errorMessage = 'User not found';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        default:
          errorMessage = err.message;
      }

      toast.error(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isNewUser = result._tokenResponse?.isNewUser;

      if (isNewUser) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber || '',
          createdAt: new Date(),
          provider: 'google',
        });
        toast.success('🎉 Registered with Google successfully!');
      } else {
        toast.success('✅ Logged in with Google successfully!');
      }

      setTimeout(() => {
        handleClose();
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error('Google Auth Error:', err);
      let errorMessage = 'Google authentication failed';

      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Google sign‑in was canceled';
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'Account exists with different credential';
      }

      toast.error(`❌ ${errorMessage}`);
    } finally {
      setGoogleLoading(false);
    }
  };

  if (!show) return null;

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="auth-modal">
        <div className="auth-modal-content">
          <div className="auth-modal-header">
            <h2>{authType === 'login' ? 'Login' : 'Register'}</h2>
            <button
              className="close-btn"
              onClick={handleClose}
              disabled={loading || googleLoading}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {authType === 'register' && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1234567890"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@domain.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="At least 6 characters"
              />
            </div>

            {authType === 'register' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Confirm your password"
                />
              </div>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading || googleLoading}
            >
              {loading ? (
                <span className="loading-spinner" />
              ) : authType === 'login' ? (
                'Login'
              ) : (
                'Register'
              )}
            </button>
          </form>

          <div className="divider"><span>or</span></div>

          <div className="google-auth-container">
            <button
              className="google-auth-btn"
              onClick={handleGoogleAuth}
              disabled={loading || googleLoading}
            >
              {googleLoading ? (
                <span className="loading-spinner" />
              ) : (
                <>
                  <svg className="google-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </div>

          <div className="auth-switch">
            {authType === 'login' ? (
              <p>
                Don’t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthType('register')}
                  disabled={loading || googleLoading}
                >
                  Register
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthType('login')}
                  disabled={loading || googleLoading}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthModal;
