import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom"; // Import useParams
import { Button, Tag, Avatar, Divider, Card, Modal } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { HeartFilled } from "@ant-design/icons"; // Import HeartFilled icon

import moment from 'moment';
import "./blog.css";
import { Pagination } from "antd";
function BlogDetail() {
  const { id } = useParams();

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Lấy loggedInUser từ localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  // Fetch the corresponding blog and user data
  const blog = blogs.find((b) => b.id === parseInt(id));
  const user = users.find((u) => u.id === blog?.author_id);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const [popupMediaUrl, setPopupMediaUrl] = useState(null);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("likes")) || [];
    const blogLikes = likes.filter((like) => like.blog_id === blog.id);
    setLikeCount(blogLikes.length);

    if (loggedInUser) {
      const userLike = blogLikes.find((like) => like.user_id === loggedInUser.id);
      setIsLiked(!!userLike);
    }
  }, [blog.id, loggedInUser]);
  //ham kiem tra nguoi dung co phai author khong
  const checkAuthorIsUser=() =>{
      const user_idc = loggedInUser.id;
      const author_idc = blog.author_id;
      console.error(author_idc, "______", user_idc);
      if(user_idc === author_idc){
        return true;
      } else return false;
  }

  // Tìm các thẻ h1 trong nội dung blog để tạo danh sách sidebar
  const getHeadersFromContent = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Lấy cả h1 từ nội dung bài viết
    const headers = Array.from(tempDiv.querySelectorAll("h1, h2"));

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
    const headerElements = document.querySelectorAll("h1, h2");

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

  const handleMediaClick = (url) => {
    setPopupMediaUrl(url);
  };

  const closeModal = () => {
    setPopupMediaUrl(null);
  };

  const renderMedia = (media) => {
    if (Array.isArray(media) && media.length > 0) {
      const firstMedia = media[0];

      if (firstMedia.type === "image") {
        return <img src={firstMedia.url} alt="Media Content" />;
      } else if (firstMedia.type === "video") {
        return (
          <video controls>
            <source src={firstMedia.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      }
    }

    return <img src="https://via.placeholder.com/400" alt="Placeholder" />;
  };

  const renderMediaItems = (media) => {
    if (!Array.isArray(media) || media.length <= 1) {
      return <div></div>;
    }

    // Nếu độ dài mảng media lớn hơn 1, bỏ qua phần tử đầu tiên
    const filteredMedia = media.length > 1 ? media.slice(1) : media;

    return (
      <div className="media-gallery">
        {filteredMedia.map((item, index) => {
          if (item.type === "image") {
            return (
              <img
                key={index}
                src={item.url}
                alt={`Media ${index + 2}`} // Bắt đầu đánh số từ 2
                onClick={() => handleMediaClick(item.url)}
                style={{
                  width: "200px",
                  margin: "10px",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
              />
            );
          } else if (item.type === "video") {
            return (
              <video
                key={index}
                controls
                style={{
                  width: "200px",
                  margin: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => handleMediaClick(item.url)}
              >
                <source src={item.url} type="video/mp4" />
                お使いのブラウザはビデオタグをサポートしていません。
              </video>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  };

  const handleLikeClick = () => {
    if (!loggedInUser) {
      setIsModalVisible(true);
      return;
    }

    const likes = JSON.parse(localStorage.getItem("likes")) || [];

    if (isLiked) {
      // Nếu đã like, thì xóa like
      const updatedLikes = likes.filter(
        (like) => !(like.blog_id === blog.id && like.user_id === loggedInUser.id)
      );
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      // Nếu chưa like, thì thêm like
      console.log(loggedInUser.id);
      const newLike = {
        id: likes.length ? Math.max(...likes.map((like) => like.id)) + 1 : 1,
        user_id: loggedInUser.id,
        blog_id: blog.id,
        created_at: new Date().toISOString(),
      };
      const updatedLikes = [...likes, newLike];
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const pageSize = 6;
  const suggestions = (JSON.parse(localStorage.getItem("blogs")) || []).slice(0, 12);

  const currentSuggestions = suggestions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const FollowButton = () => {
    if(!checkAuthorIsUser()){
      return(
        <Button
            type={isFollowed ? "primary" : "default"}
            onClick={handleFollowClick}
            className="follow-button"
            style={{marginTop: "4px"}}
          >
            {isFollowed ? "フォロー中" : "フォロー"}
          </Button>
      );
    }else return;
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFollowClick = () => {
    setIsFollowed((prev) => !prev);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate("/login");
  };
  
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const goToProfile = () => {
    const profileUrl = checkAuthorIsUser() ? '/profile' : `/profile/${user?.id}`;
    navigate(profileUrl);
  };



  if (!blog || !user) {
    return <div>ブログが見つかりません</div>; // Handle case where the blog or user does not exist
  }


  return (
    <div className="container">
      <div className="user-info-btn-container">
        <span className="back" onClick={() => window.history.back()}>戻る</span>
        <div className="user-info">
          <div style={{display: "flex",gap: "10px"}}>
            <Avatar size={40} style={{ backgroundColor: "#ddd" }}
              onClick={() => goToProfile()}
            >{user?.username[0]}</Avatar>
            <span className="username" style={{marginTop: "10px"}}
               onClick={() => goToProfile()}
            >{user?.username || "Unknown User"}</span>
          </div>
          {FollowButton()}
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
              <div className="likes">
                {isLiked ? (
                  <HeartFilled style={{ color: "red", fontSize: "32px", cursor: "pointer" }} onClick={handleLikeClick} />
                ) : (
                  <HeartOutlined style={{ color: "gray", fontSize: "32px", cursor: "pointer" }} onClick={handleLikeClick} />
                )}
                <span className="like-count">{likeCount}</span>
              </div>
              {renderMedia(blog.media)}
            </div>
            <Divider />
            <div className="content-container"
               dangerouslySetInnerHTML={{
                __html: blog.content,
              }}>
            </div>
            <Divider />
            <div className="image-container">
              {renderMediaItems(blog.media)}
            </div>
            <Modal
              visible={!!popupMediaUrl}
              footer={null}
              onCancel={closeModal}
              centered
            >
              <img src={popupMediaUrl} alt="Popup Media" style={{ width: "100%" }} />
            </Modal>
          </div>
        </Card>
        <div className="sidebar-wrapper">
          <div className="sidebar">
            <h3 className="sidebar-title">記事の目次</h3>
            <ul className="sidebar-list">
              {headers.map((header) => (
                <li
                  key={header.text}
                  className={`sidebar-item ${header.element.tagName.toLowerCase() + "-tag"}`}
                  onClick={() => scrollToHeader(header.text)}
                >
                  {header.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="additional-section">
            <h3 className="additional-title">和食みたい</h3>
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
            <Card className="suggestion-item"
            onClick={() => {
              navigate(`/blog-details/${item.id}`);

              window.scrollTo(0, 0); // Cuộn lên đầu trang
            }}
            key={item.id} hoverable>
              <div style={{height: '180px', overflow: 'hidden'}}>
                {renderMedia(item.media)}
              </div>
              {/* <img className="suggestion-image" src={item.media[0].url} alt="" /> */}
              <p className="suggestion-time">
                {new Date(item.created_at).toLocaleDateString('vi-VN')}
              </p>
              <p className="title-text">{item.title}</p>
              {/* <p>{item.content}</p> */}
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

      <Modal
        title="Chưa đăng nhập"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Đồng ý"
        cancelText="Hủy"
        centered
      >
        <p>この操作を実行するには、ログインする必要があります。</p>
      </Modal>
    </div>
  );
}

export default BlogDetail;
