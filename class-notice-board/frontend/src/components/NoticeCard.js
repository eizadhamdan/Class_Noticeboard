import React from "react";
import { motion } from "framer-motion";
import "../styles/NoticeCard.css";

const NoticeCard = ({ notice }) => {
  return (
    <motion.div
      className="notice-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3>{notice.title}</h3>
      <p>{notice.content}</p>
      <div className="footer">
        <small>{new Date(notice.createdAt).toLocaleDateString()}</small>
      </div>
    </motion.div>
  );
};

export default NoticeCard;
