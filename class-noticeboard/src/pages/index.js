import React, { useEffect, useState } from "react";

const Home = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch notices from the API
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <h1>Class Notice Board</h1>
      <div className="notice-list">
        {notices.length === 0 ? (
          <p>No notices available.</p>
        ) : (
          notices.map((notice) => (
            <div key={notice.id} className="notice">
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              <p>
                <small>{new Date(notice.date).toLocaleDateString()}</small>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
