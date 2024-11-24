import React from "react";
import "./css/SuggestedPosts.css";

const SuggestedPosts = () => {
  return (
    <div className="suggestions">
      <h3>Gợi ý cho bạn</h3>
      <div className="suggestion-list">
        <div className="suggestion-item">
          <img src="https://via.placeholder.com/100" alt="Post 1" />
          <p>Bài viết liên quan 1</p>
        </div>
        <div className="suggestion-item">
          <img src="https://via.placeholder.com/100" alt="Post 2" />
          <p>Bài viết liên quan 2</p>
        </div>
        <div className="suggestion-item">
          <img src="https://via.placeholder.com/100" alt="Post 3" />
          <p>Bài viết liên quan 3</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestedPosts;
