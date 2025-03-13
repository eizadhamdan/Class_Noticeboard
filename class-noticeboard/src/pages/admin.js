import React, { useEffect, useState } from "react";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch users and notices from API
    Promise.all([
      fetch("/api/users").then((res) => res.json()),
      fetch("/api/notices").then((res) => res.json()),
    ])
      .then(([userData, noticeData]) => {
        setUsers(userData);
        setNotices(noticeData);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const deleteNotice = (id) => {
    // Confirmation before deleting the notice
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );
    if (confirmDelete) {
      // API call to delete a notice
      fetch(`/api/notices/${id}`, { method: "DELETE" })
        .then(() => {
          setNotices((prevNotices) =>
            prevNotices.filter((notice) => notice.id !== id)
          );
        })
        .catch((error) => console.error("Error deleting notice:", error));
    }
  };

  const deleteUser = (id) => {
    // Confirmation before deleting the user
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      // API call to delete a user (this functionality needs to be implemented on the backend)
      fetch(`/api/users/${id}`, { method: "DELETE" })
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        })
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <div>
        <h3>Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.role}
              <button
                onClick={() => deleteUser(user.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete User
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Notices</h3>
        {notices.map((notice) => (
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
            <button onClick={() => deleteNotice(notice.id)}>
              Delete Notice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
