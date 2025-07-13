import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import "./styles/layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Vedic Purohits. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
