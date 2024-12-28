import React, { useState } from "react";
import { useParams, useNavigate} from "react-router-dom"; // Import useParams
import { Button, Tag, Avatar, Divider, Card } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import Header from "../../components/header/header.jsx";
import blogs from '../../data/blogs.json';
import users from '../../data/users.json';
import moment from 'moment';
import "./blog.css";
import { Pagination } from "antd";

function BlogDetail() {
  const { id } = useParams(); // Get the blog ID from the URL

  const navigate = useNavigate(); // Sử dụng để điều hướng
  // Fetch the corresponding blog and user data
  const blog = blogs.find((b) => b.id === parseInt(id));
  const user = users.find((u) => u.id === blog?.author_id);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFollowed, setIsFollowed] = useState(false);

  // Tìm các thẻ h1 trong nội dung blog để tạo danh sách sidebar
  const getHeadersFromContent = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Lấy cả h1 từ nội dung bài viết
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

  const handleFollowClick = () => {
    setIsFollowed((prev) => !prev);
  };

  if (!blog || !user) {
    return <div>Blog not found</div>; // Handle case where the blog or user does not exist
  }

  const navigateToProfile = () => {
    navigate(`/profile/${blog?.author_id}`); // Điều hướng đến trang profile của user
  };


  return (
    <div className="container">
      <div className="user-info-btn-container">
        <span className="back" onClick={() => window.history.back()}>戻る</span>
        <div className="user-info">
          <Avatar size={40} 
          style={{ backgroundColor: "#ddd" }}
          onClick={navigateToProfile}>
            {user?.username[0]}
          </Avatar>
          <span className="username" 
          onClick={navigateToProfile}>
            {user?.username || "Unknown User"}</span>
          <Button
            type="primary"
            onClick={handleFollowClick}
            className={`follow-button ${isFollowed ? "followed" : ""}`}
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
              <img src={blog?.image_url || "https://via.placeholder.com/400"} alt="Placeholder" />
              <div className="likes">
                <span className="like-count">10</span>
                <span className="like-icon">
                  <HeartOutlined />
                </span>
              </div>
            </div>
            <Divider />
            <div className="content-container"
               dangerouslySetInnerHTML={{
                __html: blog.content,
              }}>
            </div>
          </div>
        </Card>

        <div className="sidebar">
          <h3 className="sidebar-title">記事の目次</h3>
          <ul className="sidebar-list">
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
        <h3 className="additional-title">和食みたい</h3>
        <ul className="additional-list">
          {Array.isArray(blog.additional_food) && blog.additional_food.length > 0 ? (
              blog.additional_food.map((dish, index) => (
                <li key={index} className="additional-item">
                  {dish}
                </li>
              ))
          ) : (
          <li className="additional-item">コメントはありません。</li>
          )}
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
