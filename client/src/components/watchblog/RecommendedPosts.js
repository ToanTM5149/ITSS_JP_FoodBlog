import React from "react";
import './css/RecommendedPosts.css';
const RecommendedPosts = () => {
  return (
    <div className="suggestions">
      <h3>こちらもおすすめ</h3>
      <div className="suggestion-list">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div className="suggestion-item" key={index}>
            <div className="image-placeholder"></div>
            <p>おすすめの記事 {item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPosts;
