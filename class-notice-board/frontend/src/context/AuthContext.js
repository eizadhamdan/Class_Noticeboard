import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // If the user is already stored in localStorage, load them
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      // Store user and token in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      // Navigate based on user role
      if (res.data.role === "student") {
        navigate("/"); // Route to home page for students
      } else if (res.data.role === "teacher") {
        navigate("/post-notice"); // Route to post notice page for teachers
      } else if (res.data.role === "admin") {
        navigate("/admin"); // Route to admin dashboard for admins
      }

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
