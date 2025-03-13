import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Class Notice Board</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin Dashboard</Link>
        <Link to="/post-notice">Post Notice</Link>
      </div>
    </nav>
  );
};

export default Navbar;
