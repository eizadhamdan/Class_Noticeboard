import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch notices from the backend API
    axios
      .get("http://localhost:5000/api/notices") // Backend URL
      .then((response) => {
        setNotices(response.data); // Update the state with fetched notices
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
      <h1>Class Notice Board</h1>
      {notices.length > 0 ? (
        notices.map((notice) => (
          <div key={notice._id}>
            <h2>{notice.title}</h2>
            <p>{notice.content}</p>
            <p>
              <small>{new Date(notice.createdAt).toLocaleDateString()}</small>
            </p>
          </div>
        ))
      ) : (
        <p>No notices available at the moment.</p>
      )}
    </div>
  );
};

export default Home;
