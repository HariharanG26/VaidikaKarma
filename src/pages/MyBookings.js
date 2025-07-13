import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../firebase/config';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/mybookings.css';

/* ───────────── Constants ───────────── */
const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

const BOOKING_PREFIX = 'VP-';
const BOOKINGS_PER_PAGE = 10;
/* ───────────────────────────────────── */

/* ───────────── Utility Functions ───────────── */
const safeObjectValues = (obj) => {
  if (!obj || typeof obj !== 'object') return [];
  return Object.values(obj);
};

const formatBookingDate = (dateString) => {
  if (!dateString) return 'Not specified';
  try {
    const dateObj = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return dateObj.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return 'Invalid date';
  }
};

const formatBookingTime = (timeString) => {
  if (!timeString) return 'Not specified';
  try {
    const timePart = timeString.includes('T') ? timeString.split('T')[1].substring(0, 5) : timeString;
    return new Date(`2000-01-01T${timePart}`).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return 'Invalid time';
  }
};

const validateBookingData = (data) => {
  return {
    poojaType: data?.poojaType || 'General Pooja',
    location: data?.location || 'Not specified',
    specialRequests: data?.specialRequests || '',
    status: data?.status || BOOKING_STATUSES.PENDING,
    bookingReference: data?.bookingReference || `${BOOKING_PREFIX}UNKNOWN`,
    date: data?.date || '',
    time: data?.time || '',
    createdAt: data?.createdAt?.toDate?.() || new Date(),
  };
};
/* ───────────────────────────────────────────── */

/* ───────────── Status Badge ───────────── */
const StatusBadge = ({ status }) => {
  const config = {
    [BOOKING_STATUSES.PENDING]: { text: 'Pending', icon: '⏳', class: 'pending' },
    [BOOKING_STATUSES.CONFIRMED]: { text: 'Confirmed', icon: '✅', class: 'confirmed' },
    [BOOKING_STATUSES.CANCELLED]: { text: 'Cancelled', icon: '❌', class: 'cancelled' },
    [BOOKING_STATUSES.COMPLETED]: { text: 'Completed', icon: '🎉', class: 'completed' },
  };

  const current = config[status] || { text: 'Unknown', icon: '❓', class: 'unknown' };

  return (
    <span className={`status-badge ${current.class}`}>
      {current.icon} {current.text}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.oneOf(safeObjectValues(BOOKING_STATUSES)).isRequired,
};
/* ───────────────────────────────────── */

const MyBookings = () => {
  const { user } = useAuth();
  const userId = user?.uid;

  const [bookings, setBookings] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  /* ───────────── Real-time Listener ───────────── */
  useEffect(() => {
    if (!userId) return;

    const bookingsCollection = collection(db, 'bookings');

    const q = query(
      bookingsCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(BOOKINGS_PER_PAGE)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...validateBookingData(doc.data()),
        }));
        setBookings(results);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
        setLoading(false);
        setHasMore(snapshot.docs.length === BOOKINGS_PER_PAGE);
      },
      (err) => {
        console.error('Real-time error:', err);
        setError('Failed to load bookings.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  /* ───────────── Pagination Load More ───────────── */
  const loadMoreBookings = async () => {
    if (!userId || !lastVisible || !hasMore) return;

    const bookingsCollection = collection(db, 'bookings');

    const nextQuery = query(
      bookingsCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      startAfter(lastVisible),
      limit(BOOKINGS_PER_PAGE)
    );

    try {
      const snapshot = await getDocs(nextQuery);
      const moreBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...validateBookingData(doc.data()),
      }));

      setBookings((prev) => [...prev, ...moreBookings]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === BOOKINGS_PER_PAGE);
    } catch (err) {
      console.error('Load more failed:', err);
      setError('Failed to load more bookings.');
    }
  };

  /* ───────────── Handle Status Update ───────────── */
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, {
        status: newStatus,
        updatedAt: new Date(),
      });
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error('Status update failed:', err);
      toast.error('Failed to update status');
    }
  };

  /* ───────────── Render UI ───────────── */
  if (loading) {
    return <div className="loader">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!bookings.length) {
    return <div className="no-bookings">You have no bookings yet.</div>;
  }

  return (
    <div className="my-bookings">
      <h2 className="page-title">My Bookings</h2>

      <div className="booking-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <h3>{booking.poojaType}</h3>
              <StatusBadge status={booking.status} />
            </div>
            <p><strong>Reference:</strong> {booking.bookingReference}</p>
            <p><strong>Date:</strong> {formatBookingDate(booking.date)}</p>
            <p><strong>Time:</strong> {formatBookingTime(booking.time)}</p>
            <p><strong>Location:</strong> {booking.location}</p>
            {booking.specialRequests && (
              <p><strong>Requests:</strong> {booking.specialRequests}</p>
            )}

            {/* Status Update Dropdown */}
            {booking.status !== BOOKING_STATUSES.COMPLETED && booking.status !== BOOKING_STATUSES.CANCELLED && (
              <div className="status-update">
                <label htmlFor={`status-${booking.id}`}>Update Status:</label>
                <select
                  id={`status-${booking.id}`}
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                >
                  {Object.values(BOOKING_STATUSES).map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMoreBookings}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
