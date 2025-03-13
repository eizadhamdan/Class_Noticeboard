import React, { useEffect, useState } from "react";
import axios from "axios";
import NoticeCard from "../components/NoticeCard";

const Home = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notices")
      .then((response) => setNotices(response.data))
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  return (
    <div className="home">
      <h2>Class Notices</h2>
      <div className="notice-list">
        {notices.map((notice) => (
          <NoticeCard key={notice._id} notice={notice} />
        ))}
      </div>
    </div>
  );
};

export default Home;
