import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/authmodal.css';

const Register = () => {
  const [form, setForm] = useState({
    email: '', password: '', confirm: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();       // 🆕 google

  /* ---- Email Register ---- */
  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords don't match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  /* ---- Google Flow ---- */
  const handleGoogle = async () => {
    setError('');
    try {
      await googleSignIn();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleRegister}>
      <h2 className="auth-title">Register</h2>

      <label>Email</label>
      <input
        type="email"
        required
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <label>Password</label>
      <input
        type="password"
        required
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <label>Confirm Password</label>
      <input
        type="password"
        required
        placeholder="Confirm Password"
        value={form.confirm}
        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
      />

      <button type="submit" className="auth-btn primary-block">Register</button>

      <button type="button" className="google-btn" onClick={handleGoogle}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" />
        Continue with Google
      </button>

      {error && <p className="auth-error">{error}</p>}
    </form>
  );
};

export default Register;
