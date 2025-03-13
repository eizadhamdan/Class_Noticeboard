import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import "./styles/App.css"; // Global CSS file
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// Create the root and render the App component inside the Router
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
