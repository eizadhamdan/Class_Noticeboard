import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/App.css"; // Global CSS file
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProvider>
      {" "}
      {/* Wrap the App component with AuthProvider */}
      <App />
    </AuthProvider>
  </Router>
);
