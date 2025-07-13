import React, { useState } from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  
  const upcomingBookings = [
    {
      id: 'VP-2023-056',
      pooja: 'Ganapathi Homam',
      date: '15 Aug 2023',
      time: '9:00 AM',
      purohit: 'Shri Venkatesh Shastri',
      status: 'Confirmed'
    },
    {
      id: 'VP-2023-057',
      pooja: 'Satyanarayana Pooja',
      date: '20 Aug 2023',
      time: '10:30 AM',
      purohit: 'Shri Gopalakrishna Sarma',
      status: 'Confirmed'
    }
  ];
  
  const pastBookings = [
    {
      id: 'VP-2023-042',
      pooja: 'House Warming',
      date: '12 Jun 2023',
      purohit: 'Shri Narayana Bhatt',
      rating: 5,
      review: 'Excellent service. The purohit was very knowledgeable and guided us through every step.'
    },
    {
      id: 'VP-2023-035',
      pooja: 'Navagraha Homam',
      date: '5 May 2023',
      purohit: 'Shri Venkatesh Shastri',
      rating: 4,
      review: 'Well organized ceremony. Felt very positive energy throughout.'
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>My Dashboard</h2>
        <p>Welcome back! Here's your activity overview</p>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          My Bookings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>
      
      {activeTab === 'bookings' && (
        <div className="dashboard-content">
          <div className="bookings-section">
            <h3>Upcoming Ceremonies</h3>
            {upcomingBookings.length > 0 ? (
              <div className="bookings-grid">
                {upcomingBookings.map(booking => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-id">{booking.id}</div>
                    <div className="booking-details">
                      <h4>{booking.pooja}</h4>
                      <p><i className="fas fa-calendar-alt"></i> {booking.date} at {booking.time}</p>
                      <p><i className="fas fa-user-tie"></i> {booking.purohit}</p>
                    </div>
                    <div className={`booking-status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </div>
                    <div className="booking-actions">
                      <button className="action-btn view">View Details</button>
                      <button className="action-btn cancel">Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-bookings">
                <p>You don't have any upcoming ceremonies booked.</p>
                <a href="/book-pooja" className="book-now-link">Book a Pooja Now</a>
              </div>
            )}
          </div>
          
          <div className="bookings-section">
            <h3>Past Ceremonies</h3>
            {pastBookings.length > 0 ? (
              <div className="bookings-grid">
                {pastBookings.map(booking => (
                  <div key={booking.id} className="booking-card past">
                    <div className="booking-id">{booking.id}</div>
                    <div className="booking-details">
                      <h4>{booking.pooja}</h4>
                      <p><i className="fas fa-calendar-alt"></i> {booking.date}</p>
                      <p><i className="fas fa-user-tie"></i> {booking.purohit}</p>
                      <div className="booking-rating">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas fa-star ${i < booking.rating ? 'filled' : ''}`}
                          ></i>
                        ))}
                      </div>
                      {booking.review && (
                        <div className="booking-review">
                          <p>"{booking.review}"</p>
                        </div>
                      )}
                    </div>
                    <div className="booking-actions">
                      <button className="action-btn view">View Details</button>
                      <button className="action-btn review">Edit Review</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-bookings">
                <p>You haven't completed any ceremonies with us yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'profile' && (
        <div className="dashboard-content">
          <div className="profile-section">
            <h3>My Profile</h3>
            <form className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" defaultValue="Rajesh" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" defaultValue="Kumar" />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" defaultValue="rajesh.kumar@example.com" />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" defaultValue="+91 9876543210" />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea id="address" rows="3" defaultValue="No. 12, Temple Street, Bangalore - 560001"></textarea>
              </div>
              
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div className="dashboard-content">
          <div className="settings-section">
            <h3>Account Settings</h3>
            
            <div className="settings-card">
              <h4>Change Password</h4>
              <form className="password-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input type="password" id="currentPassword" />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input type="password" id="newPassword" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input type="password" id="confirmPassword" />
                </div>
                <button type="submit" className="change-password-btn">Change Password</button>
              </form>
            </div>
            
            <div className="settings-card">
              <h4>Notification Preferences</h4>
              <div className="notification-options">
                <label className="checkbox-container">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  Email Notifications
                </label>
                <label className="checkbox-container">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  SMS Notifications
                </label>
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  WhatsApp Notifications
                </label>
              </div>
              <button className="save-preferences-btn">Save Preferences</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;