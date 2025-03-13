import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    // Send POST request to the backend login API
    axios
      .post("http://localhost:5000/api/auth/login", userCredentials)
      .then((response) => {
        // Save the token in local storage
        localStorage.setItem("token", response.data.token);

        // Redirect the user to the Home page (using navigate instead of history.push)
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage("Invalid credentials, please try again");
        console.error("Login error:", error);
      });
  };

  return (
    <div>
      <h1>Login to Class Notice Board</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
