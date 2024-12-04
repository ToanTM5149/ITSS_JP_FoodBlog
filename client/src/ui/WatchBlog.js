import React, { useState } from "react";
import { Button, Tag, Avatar, List, Divider, Card } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import { fakePost } from "../components/watchblog/fakedata/fakedata";
import "./WatchBlog.css";

function WatchBlog() {
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
          <Avatar size={40} style={{ backgroundColor: "#ddd" }} />
          <span className="username">ユーザーネーム</span>
          <Button
            type={isFollowed ? "primary" : "default"}
            onClick={handleFollowClick}
            className="follow-button"
          >
            {isFollowed ? "フォロー中" : "フォロー"}
          </Button>
          <span className="create-date">作成日: 2023年11月22日</span>
        </div>
      </div>


      <div className="main-wrapper">
        <Card
          title={
            <>
              <h2 className="title">{fakePost.title}</h2>
              <div className="tags">
                {["タグ1", "タグ2"].map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </>
          }
          bordered={false}
          className="article-card"
        >
          <div className="article-body">
            <div className="image-container">
              <img src={fakePost.imageUrl} alt="Placeholder" />
              <div className="likes">
                <span className="like-count">10</span>
                <span className="like-icon">
                  <HeartOutlined />
                </span>
              </div>
            </div>
            <Divider />
            <div
              className="content-container"
              dangerouslySetInnerHTML={{ __html: fakePost.content }}
            ></div>
          </div>
        </Card>

        <div class="sidebar">
          <h3 class="sidebar-title">記事の目次</h3>
          <ul class="sidebar-list">
            <li class="sidebar-item">第1部: 紹介</li>
            <li class="sidebar-item">第2部: 主な内容</li>
            <li class="sidebar-item">第3部: 結論</li>
          </ul>
        </div>

      </div>

      <div className="additional-section">
        <h3 className="additional-title">和食みたい</h3>
        <div className="tags-container">
          {["寿司", "ラーメン", "天ぷら", "うどん"].map((tag) => (
            <Tag color="green" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      
      <div className="suggestions">
        <h3>こちらもおすすめ</h3>
        <div className="suggestion-wrapper">
          {Array.from({ length: 6 }, (_, i) => (
            <Card
              className="suggestion-item"
              key={i}
              hoverable
            >
              <div className="suggestion-image" />
              <p className="title-text">おすすめの記事 {i + 1}</p>
              <p>これは {i + 1} の内容です。</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchBlog;
