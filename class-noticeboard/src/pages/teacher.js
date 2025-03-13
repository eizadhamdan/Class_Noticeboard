import React, { useState, useEffect } from "react";

const Teacher = () => {
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });
  const [notices, setNotices] = useState([]);
  const teacherId = 1; // Replace with logged-in teacher ID

  useEffect(() => {
    // Fetch notices from the API
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch((error) => console.log("Error fetching notices:", error));
  }, []);

  const postNotice = () => {
    if (!newNotice.title || !newNotice.content) {
      alert("Please fill out both title and content.");
      return;
    }

    // Send the POST request to add a new notice
    fetch("/api/addNotice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newNotice.title,
        content: newNotice.content,
        date: new Date().toISOString(), // Date can be the current date or a specific one
        teacherId: 1, // Make sure you send the logged-in teacher ID
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Notice added successfully:", data);
        setNotices((prevNotices) => [...prevNotices, data]);
        setNewNotice({ title: "", content: "" }); // Reset form fields
      })
      .catch((error) => {
        console.error("Error posting notice:", error);
      });
  };

  const deleteNotice = (id) => {
    // Delete notice from the API
    fetch(`/api/notices/${id}`, { method: "DELETE" })
      .then(() => {
        setNotices((prevNotices) =>
          prevNotices.filter((notice) => notice.id !== id)
        );
      })
      .catch((error) => console.log("Error deleting notice:", error));
  };

  return (
    <div>
      <h2>Teacher Panel</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newNotice.title}
          onChange={(e) =>
            setNewNotice({ ...newNotice, title: e.target.value })
          }
        />
      </div>
      <div>
        <textarea
          placeholder="Content"
          value={newNotice.content}
          onChange={(e) =>
            setNewNotice({ ...newNotice, content: e.target.value })
          }
        />
      </div>
      <button onClick={postNotice}>Post Notice</button>

      <h3>Your Notices</h3>
      <div>
        {notices
          .filter((notice) => notice.teacherId === teacherId)
          .map((notice) => (
            <div
              key={notice.id}
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
              <button onClick={() => deleteNotice(notice.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Teacher;
