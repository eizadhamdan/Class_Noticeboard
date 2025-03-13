import React, { useEffect, useState } from "react";

const Student = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch notices from the API
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => {
        setNotices(data); // Store the notices in state
        setLoading(false); // Set loading to false after the data is fetched
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading notices...</p>;
  }

  return (
    <div>
      <h2>Student Notice Board</h2>
      {notices.length === 0 ? (
        <p>No notices available.</p>
      ) : (
        notices.map((notice) => (
          <div
            key={notice._id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            <h4>{notice.title}</h4>
            <p>{notice.content}</p>
            <p>
              <small>{new Date(notice.date).toLocaleDateString()}</small>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Student;
