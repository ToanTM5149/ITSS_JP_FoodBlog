import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Tag, Avatar, Divider, Card, message } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import moment from "moment";
import "./blog.css";
import { Pagination } from "antd";

function BlogDetail() {
  const { id } = useParams(); // Lấy ID blog từ URL
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFollowed, setIsFollowed] = useState(false);

  const pageSize = 6;
  const suggestions = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `おすすめの記事 ${i + 1}`,
    content: `これは ${i + 1} の内容です。`,
  }));

  // Lấy dữ liệu blog và user từ localStorage
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const foundBlog = storedBlogs.find((b) => b.id === parseInt(id, 10));
    if (!foundBlog) {
      message.error("Blog not found!");
      return;
    }

    const foundUser = storedUsers.find((u) => u.id === foundBlog.author_id);
    setBlog(foundBlog);
    setUser(foundUser);
  }, [id]);

  const currentSuggestions = suggestions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFollowClick = () => {
    setIsFollowed((prev) => !prev);
  };

  if (!blog || !user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Blog not found.</p>
        <a href="/all-blogs">Return to All Blogs</a>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="user-info-btn-container">
        <span className="back" onClick={() => window.history.back()}>戻る</span>
        <div className="user-info">
          <Avatar size={40} style={{ backgroundColor: "#ddd" }}>{user?.username[0]}</Avatar>
          <span className="username">{user?.username || "Unknown User"}</span>
          <Button
            type={isFollowed ? "primary" : "default"}
            onClick={handleFollowClick}
            className="follow-button"
          >
            {isFollowed ? "フォロー中" : "フォロー"}
          </Button>
          <span className="create-date">作成日: {moment(blog?.created_at).format('YYYY年M月D日')}</span>
        </div>
      </div>

      <div className="main-wrapper">
        <Card
          title={
            <>
              <h2 className="title">{blog?.title || "No Title"}</h2>
              <div className="tags">
                {(blog?.tags || ["タグ1", "タグ2"]).map((tag) => (
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
            <div className="media-container">
              {blog.video_url ? (
                <video
                  src={blog.video_url}
                  controls
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <img
                  src={blog?.image_url || "https://via.placeholder.com/400"}
                  alt="Blog Media"
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
              <div className="likes">
                <span className="like-count">10</span>
                <span className="like-icon">
                  <HeartOutlined />
                </span>
              </div>
            </div>
            <Divider />
            <div className="content-container">{blog?.content}</div>
          </div>
        </Card>

        <div className="sidebar">
          <h3 className="sidebar-title">記事の目次</h3>
          <ul className="sidebar-list">
            <li className="sidebar-item">第1部: 紹介</li>
            <li className="sidebar-item">第2部: 主な内容</li>
            <li className="sidebar-item">第3部: 結論</li>
          </ul>
        </div>
      </div>

      <div className="additional-section">
        <h3 className="additional-title">和食みたい</h3>
        <ul className="additional-list">
          {["寿司", "ラーメン", "天ぷら", "うどん"].map((item) => (
            <li key={item} className="additional-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="suggestions">
        <h3>こちらもおすすめ</h3>
        <div className="suggestion-wrapper">
          {currentSuggestions.map((item) => (
            <Card className="suggestion-item" key={item.id} hoverable>
              <div className="suggestion-image" />
              <p className="title-text">{item.title}</p>
              <p>{item.content}</p>
            </Card>
          ))}
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={suggestions.length}
          onChange={handlePageChange}
          className="pagination"
        />
      </div>
    </div>
  );
}

export default BlogDetail;
