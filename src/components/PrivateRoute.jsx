import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    toast.warn('⚠️  Please log in to continue', { autoClose: 2500 });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
