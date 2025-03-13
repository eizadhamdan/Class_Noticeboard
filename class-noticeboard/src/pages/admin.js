import React, { useEffect, useState } from "react";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch users and notices from API
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data));
  }, []);

  const deleteNotice = (id) => {
    // API call to delete a notice
    fetch(`/api/notices/${id}`, { method: "DELETE" }).then(() =>
      setNotices(notices.filter((notice) => notice.id !== id))
    );
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <div>
        <h3>Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.role}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Notices</h3>
        {notices.map((notice) => (
          <div key={notice.id}>
            <h4>{notice.title}</h4>
            <button onClick={() => deleteNotice(notice.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
