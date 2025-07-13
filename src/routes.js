import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from './context/AuthContext';
import { db } from './firebase/config';
import { toast } from 'react-toastify';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Purohits from './pages/Purohits';
import BookPooja from './pages/BookPooja';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import AdminBookings from './pages/AdminBookings';

import PrivateRoute from './components/PrivateRoute';

// 🔐 Inline AdminGuard
const AdminGuard = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData?.isAdmin === true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Admin check failed:', err);
        toast.error('⚠️ Could not verify admin access');
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [user]);

  if (loading) {
    return (
      <div className="admin-loader-screen">
        <p className="loader-text">🔐 Checking admin access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    toast.error('⛔ Unauthorized: Admins only');
    return <Navigate to="/" replace />;
  }

  return children;
};

const RoutesConfig = () => {
  return (
    <Routes>
      {/* ───── Public Routes ───── */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/purohits" element={<Purohits />} />
      <Route path="/book-pooja" element={<BookPooja />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact" element={<Contact />} />

      {/* ───── Protected Routes ───── */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* ───── Admin-Only Route ───── */}
      <Route
        path="/admin-bookings"
        element={
          <AdminGuard>
            <AdminBookings />
          </AdminGuard>
        }
      />

      {/* ───── Fallback ───── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoutesConfig;
