import React from "react";
import Header from "../components/Header";
import { fakePost } from "../components/watchblog/fakedata/fakedata";
import "./WatchBlog.css";
import { useState } from "react";
/*Update cho icon react: npm install react-icons */
function App() {
  const [isFollowed, setIsFollowed] = useState(false); 

  const handleFollowClick = () => {
    setIsFollowed((prev) => !prev); 
  };
  return (
    <div className="container">
      <Header />
      <div className="user-info-btn-container">
      <span className="back">戻る</span>
      <div className="user-info">
        <span className="user-avatar"></span>
        <span className="username">ユーザーネーム</span>
        <button
            className={`follow-btn ${isFollowed ? "followed" : ""}`}
            onClick={handleFollowClick}>
            {isFollowed ? "フォロー中" : "フォロー"}
          </button>
      </div>
    
      <span className="create-date">作成日: 2023年11月22日</span>
      
    </div>
      {/* Flex container for MainContent and Sidebar */}
      <div className="main-wrapper">
            <div>
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
        </div>
        <div className="sidebar">
      <h3 className="sidebar-title">記事の目次</h3>
      <ul className="sidebar-list">
        <li className="sidebar-item">第1部: 紹介</li>
        <li className="sidebar-item">第2部: 主な内容</li>
        <li className="sidebar-item">第3部: 結論</li>
      </ul>
    </div>
      </div>
      <div className="suggestions">
      <h3>こちらもおすすめ</h3>
      <div className = "suggestion-wrapper">
        <div className="suggestion-list">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div className="suggestion-item" key={index}>
              <div className="image-placeholder"></div>
              <p id="title-text">おすすめの記事 {item}</p>
              <p>これは{item}の内容です。</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
