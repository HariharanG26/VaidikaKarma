import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  updateDoc,
  doc,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/adminbookings.css';
import { toast } from 'react-toastify';

const STATUS_OPTIONS = ['pending', 'confirmed', 'cancelled', 'completed'];
const BOOKINGS_PER_PAGE = 10;

const formatDate = (date) => {
  try {
    const d = typeof date === 'string' ? new Date(date) : date?.toDate?.() || date;
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Invalid';
  }
};

const formatTime = (time) => {
  try {
    const t = time?.includes('T') ? time.split('T')[1].slice(0, 5) : time;
    return new Date(`2000-01-01T${t}`).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return 'Invalid';
  }
};

const StatusBadge = ({ status }) => {
  const config = {
    pending: { text: 'Pending', class: 'pending', icon: '⏳' },
    confirmed: { text: 'Confirmed', class: 'confirmed', icon: '✅' },
    cancelled: { text: 'Cancelled', class: 'cancelled', icon: '❌' },
    completed: { text: 'Completed', class: 'completed', icon: '🎉' },
  };

  const data = config[status] || { text: 'Unknown', class: 'unknown', icon: '❓' };

  return <span className={`status-badge ${data.class}`}>{data.icon} {data.text}</span>;
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Real-time listener
  useEffect(() => {
    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc'),
      limit(BOOKINGS_PER_PAGE)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        }));

        setBookings(data);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
        setHasMore(snapshot.docs.length === BOOKINGS_PER_PAGE);
        setLoading(false);
      },
      (err) => {
        console.error('Admin snapshot error:', err);
        setError('Failed to fetch bookings.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const loadMore = async () => {
    if (!lastVisible || !hasMore) return;

    try {
      const nextQuery = query(
        collection(db, 'bookings'),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(BOOKINGS_PER_PAGE)
      );

      const snapshot = await getDocs(nextQuery);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));

      setBookings(prev => [...prev, ...data]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === BOOKINGS_PER_PAGE);
    } catch (err) {
      console.error('Pagination failed:', err);
      toast.error('Failed to load more bookings.');
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      const ref = doc(db, 'bookings', bookingId);
      await updateDoc(ref, { status: newStatus });
      toast.success('✅ Status updated!');
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update status.');
    }
  };

  if (loading) return <div className="loader">Loading bookings...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-bookings">
      <h2 className="page-title">📋 Admin: All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div className="booking-card" key={b.id}>
              <div className="booking-header">
                <h3>{b.poojaType}</h3>
                <StatusBadge status={b.status} />
              </div>
              <p><strong>Reference:</strong> {b.bookingReference}</p>
              <p><strong>Date:</strong> {formatDate(b.date)}</p>
              <p><strong>Time:</strong> {formatTime(b.time)}</p>
              <p><strong>Location:</strong> {b.location}</p>
              <p><strong>Requests:</strong> {b.specialRequests || 'None'}</p>
              <p><strong>User ID:</strong> {b.userId}</p>
              <p><strong>Created:</strong> {formatDate(b.createdAt)}</p>

              <label className="status-dropdown-label">
                Update Status:
                <select
                  className="status-dropdown"
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
