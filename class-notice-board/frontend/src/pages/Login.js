import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { username, password }; // Ensure correct credentials format

    axios
      .post("http://localhost:5000/api/users/login", credentials)
      .then((response) => {
        localStorage.setItem("token", response.data.token); // Store JWT token
        navigate("/"); // Redirect after successful login
      })
      .catch(() => {
        setErrorMessage("Invalid credentials");
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
