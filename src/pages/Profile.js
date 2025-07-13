import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {user?.displayName || 'Not provided'}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      {/* <p><strong>UID:</strong> {user?.uid}</p> */}
    </div>
  );
};

export default Profile;
