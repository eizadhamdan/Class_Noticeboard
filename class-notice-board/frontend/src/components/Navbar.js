import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Correct import for useAuth

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user from the AuthContext

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Class Notice Board</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>

        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
            {user.role === "teacher" && (
              <Link to="/post-notice">Post Notice</Link>
            )}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
