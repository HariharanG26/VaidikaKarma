import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; // ✅ Changed from BrowserRouter to HashRouter
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoutesConfig from './routes';
import AuthProvider from './context/AuthContext'; // ✅ Correct import

import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <RoutesConfig />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
