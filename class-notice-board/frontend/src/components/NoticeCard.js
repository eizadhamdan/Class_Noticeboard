import React from "react";
import "../styles/NoticeCard.css";

const NoticeCard = ({ notice }) => {
  return (
    <div className="notice-card">
      <h3>{notice.title}</h3>
      <p>{notice.content}</p>
      <small>{new Date(notice.createdAt).toLocaleDateString()}</small>
    </div>
  );
};

export default NoticeCard;
