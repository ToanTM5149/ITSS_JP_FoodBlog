import React from "react";
import './css/MainContent.css';
import { fakePost } from "./fakedata/fakedata"; // Import the fakePost object


const MainContent = () => {
  return (
    <div className="article-content">
      <div className="header-info">
        <h2 className="title">{fakePost.title}</h2>
        <div className="tags">
          <span className="tag">タグ1</span>
          <span className="tag">タグ2</span>
        </div>
      </div>
      <div className="article-body">
        <div className="image-container">
          <img src={fakePost.imageUrl} alt="Placeholder" />
        </div>
        
        <div className="content-container">
        <span className="likes">
           <span className="like-count">10</span> 
            <span className="like-icon">💖</span> 
        </span>
            <div className="content" dangerouslySetInnerHTML={{ __html: fakePost.content }} > 
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default MainContent;
