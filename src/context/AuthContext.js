// ───────────────────────────────────────────────────────────────
// AuthContext – centralised authentication & role utilities
// Handles login / register / logout and admin detection
// Exposes { user, isAdmin, login, loginWithGoogle, register, logout }
// ───────────────────────────────────────────────────────────────
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase/config';

// ─── Context scaffold ──────────────────────────────────────────
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ─── Provider Component ───────────────────────────────────────
const AuthProvider = ({ children }) => {
  /* ─────── Global State ─────── */
  const [user, setUser] = useState(null);            // Firebase user
  const [isAdmin, setIsAdmin] = useState(false);     // Admin role flag
  const [initialising, setInitialising] = useState(true); // Splash loader

  /* ─────── Helper: Refresh Admin Role from Firestore ─────── */
  const refreshAdminStatus = useCallback(
    async (uid) => {
      try {
        // 1️⃣ Check Firestore flag
        const userRef = doc(db, 'users', uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          setIsAdmin(snap.data()?.isAdmin === true);
        } else {
          setIsAdmin(false);
        }

        // 2️⃣ Optional: fallback to custom claim (future‑proof)
        //    Comment out if not using custom claims.
        const currentUser = auth.currentUser;
        if (currentUser) {
          const tokenResult = await currentUser.getIdTokenResult();
          if (typeof tokenResult.claims.isAdmin === 'boolean') {
            setIsAdmin(tokenResult.claims.isAdmin);
          }
        }
      } catch (err) {
        console.error('⚠️  Failed to fetch admin flag:', err);
        setIsAdmin(false);
      }
    },
    []
  );

  /* ─────── Auth State Listener ─────── */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setInitialising(false);

      if (firebaseUser) {
        await refreshAdminStatus(firebaseUser.uid);
      } else {
        setIsAdmin(false);
      }
    });

    return unsubscribe; // Cleanup on unmount
  }, [refreshAdminStatus]);

  /* ─────── Email / Password Login ─────── */
  const login = useCallback(
    async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('✅ Logged in successfully');
      if (auth.currentUser) {
        await refreshAdminStatus(auth.currentUser.uid);
      }
    },
    [refreshAdminStatus]
  );

  /* ─────── Google OAuth Login / Register ─────── */
  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    const { user: gUser, _tokenResponse } = await signInWithPopup(
      auth,
      provider
    );

    // If first‑time Google user, create Firestore record
    if (_tokenResponse?.isNewUser) {
      await setDoc(doc(db, 'users', gUser.uid), {
        uid: gUser.uid,
        name: gUser.displayName,
        email: gUser.email,
        photoURL: gUser.photoURL,
        phoneNumber: gUser.phoneNumber || '',
        provider: 'google',
        isAdmin: false, // default role
        createdAt: serverTimestamp(),
      });
      toast.success('🎉 Account created via Google');
    } else {
      toast.success('✅ Logged in with Google');
    }

    await refreshAdminStatus(gUser.uid);
  }, [refreshAdminStatus]);

  /* ─────── Register (Email / Password) ─────── */
  const register = useCallback(
    async ({ name, email, phone, password }) => {
      const { user: newUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(newUser, { displayName: name });

      await setDoc(doc(db, 'users', newUser.uid), {
        uid: newUser.uid,
        name,
        phone,
        email,
        provider: 'email',
        isAdmin: false, // default role
        createdAt: serverTimestamp(),
      });

      toast.success('🎉 Registered successfully');
      await refreshAdminStatus(newUser.uid);
    },
    [refreshAdminStatus]
  );

  /* ─────── Logout ─────── */
  const logout = useCallback(async () => {
    await signOut(auth);
    setIsAdmin(false);
    toast.success('👋 Logged out');
  }, []);

  /* ─────── Context Value ─────── */
  const value = {
    user,          // Firebase user object
    isAdmin,       // Boolean admin flag
    login,
    loginWithGoogle,
    register,
    logout,
  };

  /* ─────── Render ─────── */
  return (
    <AuthContext.Provider value={value}>
      {initialising ? (
        <div className="auth-loading">Loading...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
  