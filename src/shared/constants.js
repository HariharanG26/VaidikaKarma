// src/shared/constants.js

/** ─────────────────────────────────────────────────────
 * Booking status constants used across UI and Firestore
 * ───────────────────────────────────────────────────── */
export const BOOKING_STATUSES = Object.freeze({
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',     // ✅ Recommended for post-event tracking
  EXPIRED: 'expired',         // ✅ Optional: if time passes with no action
});

/** ───────────── Status Labels and Icons ───────────── */
export const BOOKING_STATUS_META = Object.freeze({
  pending: {
    label: 'Pending Confirmation',
    icon: '⏳',
    className: 'pending',
    color: '#facc15', // yellow-400
  },
  confirmed: {
    label: 'Confirmed',
    icon: '✅',
    className: 'confirmed',
    color: '#10b981', // green-500
  },
  cancelled: {
    label: 'Cancelled',
    icon: '❌',
    className: 'cancelled',
    color: '#ef4444', // red-500
  },
  completed: {
    label: 'Completed',
    icon: '🎉',
    className: 'completed',
    color: '#3b82f6', // blue-500
  },
  expired: {
    label: 'Expired',
    icon: '⌛',
    className: 'expired',
    color: '#9ca3af', // gray-400
  },
});

/** ─────────────────────────────────────────────────────
 * Booking reference prefix (used in Firestore + UI)
 * ───────────────────────────────────────────────────── */
export const BOOKING_PREFIX = 'BK';

/** ─────────────────────────────────────────────────────
 * Pooja Types (for dropdowns, filters, etc.)
 * ───────────────────────────────────────────────────── */
export const POOJA_TYPES = Object.freeze([
  'Griha Pravesh',
  'Satyanarayan Puja',
  'Lakshmi Puja',
  'Durga Puja',
  'Navagraha Shanti',
  'Mundan Sanskar',
  'Marriage Rituals',
  'Vastu Shanti',
]);

/** ─────────────────────────────────────────────────────
 * Default Firestore pagination size
 * ───────────────────────────────────────────────────── */
export const BOOKINGS_PER_PAGE = 10;

/** ─────────────────────────────────────────────────────
 * Default Time Format / Locale Helpers (optional)
 * ───────────────────────────────────────────────────── */
export const TIME_FORMAT_OPTIONS = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

export const DATE_FORMAT_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const APP_LOCALE = 'en-IN';
