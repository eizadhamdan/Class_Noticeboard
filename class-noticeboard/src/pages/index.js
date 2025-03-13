import React, { useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    // Mock login validation
    const user = await mockLogin(username, password);

    if (user) {
      // Redirect based on user role
      if (user.role === "student") {
        router.push("/student");
      } else if (user.role === "teacher") {
        router.push("/teacher");
      } else if (user.role === "admin") {
        router.push("/admin");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  // Mock login function (replace with actual authentication later)
  const mockLogin = (username, password) => {
    // Replace with real authentication logic using your MongoDB users collection
    const users = [
      { username: "student1", password: "password123", role: "student" },
      { username: "teacher1", password: "password123", role: "teacher" },
      { username: "admin1", password: "password123", role: "admin" },
    ];

    return users.find(
      (user) => user.username === username && user.password === password
    );
  };

  return (
    <div className="container">
      <h1>Class Notice Board</h1>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Home;
