import React, { useState } from "react";
import { Button, Tag, Avatar, List, Divider, Card } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/header.jsx";

import "./WatchBlog.css";
import { Pagination } from "antd";
function WatchBlog() {
  const location = useLocation();
  const { blog } = location.state || {};
  // Trạng thái để lưu thông báo cuộn
  const [scrollMessage, setScrollMessage] = useState("");
  // Kiểm tra nếu có dữ liệu blog
  if (!blog) {
    return <div>Không có bài viết nào để hiển thị.</div>;
  }
  // Tìm các thẻ h1 và h2 trong nội dung blog để tạo danh sách sidebar
  const getHeadersFromContent = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Lấy cả h1 và h2 từ nội dung bài viết
    const headers = Array.from(tempDiv.querySelectorAll("h1"));

    // Trả về một danh sách các header
    return headers.map((header) => ({
      text: header.innerText,
      element: header
    }));
  };

  const headers = getHeadersFromContent(blog.content);

  // Function to handle scroll to the header
  const scrollToHeader = (headerText) => {
    // Tìm tất cả các phần tử h1 và h2
    const headerElements = document.querySelectorAll("h1");
  
    // Lọc ra phần tử có nội dung trùng khớp
    const headerElement = Array.from(headerElements).find(
      (header) => header.innerText === headerText
    );
  
    if (headerElement) {
      // Cuộn đến phần tử tìm thấy
      headerElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      
    }
  };
  //add

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const suggestions = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `おすすめの記事 ${i + 1}`,
    content: `これは ${i + 1} の内容です。`,
  }));

  const currentSuggestions = suggestions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
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
              <h2 
                className="title" 
                style={{
                  fontSize: '36px',  // Kích thước chữ lớn hơn
                  marginTop: '10px', // Căn lề trên 10px
                  fontWeight: 'bold', // Đặt chữ đậm (nếu cần)
                }}
              >
                {blog.title}
              </h2>
              <div className="tags">
                {blog.tags.map((tag) => (
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
              <img src={blog.image} alt="Blog" />
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
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></div>
          </div>
        </Card>

        <div class="sidebar">
          <h3 class="sidebar-title">記事の目次</h3>
          <ul class="sidebar-list">
            {headers.map((header) => (
                <li
                  key={header.text}
                  className="sidebar-item"
                  onClick={() => scrollToHeader(header.text)}
                >
                  {header.text}
                </li>
              ))}
          </ul>
        </div>

      </div>

      <div className="additional-section">
        <div className="additional-tags">
            <div className="additional-dishes">
                  <h3 className="dishes-title">関連する料理のコメント:</h3>
                  <ul className="additional-list">
                  {Array.isArray(blog.dishes) && blog.dishes.length > 0 ? (
                      blog.dishes.map((dish, index) => (
                        <li key={index} className="additional-item">
                          {dish}
                        </li>
                      ))
                    ) : (
                      <li className="additional-item">コメントはありません。</li>
                    )}
                  </ul>
            </div>
        </div>
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

export default WatchBlog;