import React, { useState } from "react";
import axios from "axios";

const PostNotice = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePostNotice = (e) => {
    e.preventDefault();
    const newNotice = { title, content };

    axios
      .post("http://localhost:5000/api/notices", newNotice)
      .then((response) => {
        console.log("Notice posted successfully");
      })
      .catch((error) => {
        console.error("Error posting notice:", error);
      });
  };

  return (
    <div className="post-notice-container">
      <h2>Post a New Notice</h2>
      <form onSubmit={handlePostNotice}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Post Notice</button>
      </form>
    </div>
  );
};

export default PostNotice;
