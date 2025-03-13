import React, { useState, useEffect } from "react";

const Teacher = () => {
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });
  const [notices, setNotices] = useState([]);
  const teacherId = 1; // Replace with logged-in teacher ID

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data));
  }, []);

  const postNotice = () => {
    // Add notice to the API
    fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNotice),
    })
      .then((res) => res.json())
      .then((data) => setNotices([...notices, data]));
  };

  const deleteNotice = (id) => {
    fetch(`/api/notices/${id}`, { method: "DELETE" }).then(() =>
      setNotices(notices.filter((notice) => notice.id !== id))
    );
  };

  return (
    <div>
      <h2>Teacher Panel</h2>
      <input
        type="text"
        placeholder="Title"
        value={newNotice.title}
        onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newNotice.content}
        onChange={(e) =>
          setNewNotice({ ...newNotice, content: e.target.value })
        }
      />
      <button onClick={postNotice}>Post Notice</button>
      <h3>Your Notices</h3>
      {notices
        .filter((notice) => notice.teacherId === teacherId)
        .map((notice) => (
          <div key={notice.id}>
            <h4>{notice.title}</h4>
            <button onClick={() => deleteNotice(notice.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default Teacher;
