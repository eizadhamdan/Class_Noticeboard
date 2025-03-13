import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PostNotice from "./pages/PostNotice";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      {/* <h1>Notice Board App</h1> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/post-notice" element={<PostNotice />} />
      </Routes>
    </div>
  );
}

export default App;
