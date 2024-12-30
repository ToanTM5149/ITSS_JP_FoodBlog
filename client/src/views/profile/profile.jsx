import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Avatar, Card, List, Button, message, Spin } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  HeartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fetchProfileData, deletePost } from "./profile.handle";
import "./profile.css";

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Để điều hướng

  const renderMedia = (media) => {
    if (Array.isArray(media) && media.length > 0) {
      const firstMedia = media[0];

      if (firstMedia.type === "image") {
        return (
          <img
            src={firstMedia.url}
            alt="Media Content"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        );
      } else if (firstMedia.type === "video") {
        return (
          <video
            controls
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          >
            <source src={firstMedia.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      }
    }

    return <img src="https://via.placeholder.com/400" alt="Placeholder" />;
  };

  useEffect(() => {
    setLoading(true);
    const { user, userBlogs } = fetchProfileData(); // Gọi hàm lấy dữ liệu
    if (user) {
      setCurrentUser(user);
      setUserPosts(userBlogs);
    } else {
      alert("ユーザー情報が見つかりませんでした"); // Thông báo lỗi
      navigate("/login"); // Điều hướng sau khi hiển thị alert
    }
    setLoading(false); // Kết thúc tải dữ liệu
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ margin: '20px 10% 0 10%' }}>
      <Layout style={{ minHeight: "100vh", margin: "0 0 0 0" }}>
        <Card style={{ width: "100%", marginBottom: "20px", padding: 0 }}>
          <div
            className="cover-image"
            style={{ backgroundImage: "url(/image/back.jpg)", height: "200px", backgroundSize: "cover" }}
          />
          <div className="avatar-container">
            <Avatar
              size={64}
              src={currentUser.avatar}
              className="avatar"
              style={{ width: "120px", height: "120px", border: "4px solid white" }}
            />
          </div>
          {/* Tên và Status */}
          <div className="user-name-status">
            <h3 className="user-name">{currentUser.username}</h3>
            <p className="user-status" style={{ color: "green" }}>Online</p>
          </div>

          {/* Hai cột thông tin và bài viết */}
          <Row gutter={[20, 20]} className="profile-content" style={{ padding: "20px" }}>
            {/* Cột thông tin */}
            <Col span={8} className="user-details">
              <h4 className="section-title">ユーザー情報</h4>
              <p>
                <UserOutlined /> {currentUser.sex}
              </p>
              <p>
                <MailOutlined /> {currentUser.email}
              </p>
              <p>
                <PhoneOutlined /> {currentUser.phone}
              </p>
              <p>
                <HomeOutlined /> {currentUser.address}
              </p>
              <p>
                <UserOutlined /> ロール: {currentUser.role}
              </p>
            </Col>

            {/* Cột bài viết */}
            <Col span={16} className="user-posts">
              <h4 className="section-title">Posts</h4>
              <List
                dataSource={userPosts}
                renderItem={(post) => (
                  <Card
                    className="post-card"
                    key={post.id}
                    hoverable
                    onClick={() => navigate(`/blog-details/${post.id}`)} // Điều hướng đến trang chi tiết bài viết
                    style={{ marginBottom: "20px" }}
                  >
                    <Row gutter={[10, 10]}>
                      <Col span={2}>
                        <Avatar src={currentUser.avatar} size={48} />
                      </Col>
                      <Col span={20}>
                        <div className="post-info">
                          <h4>{currentUser.username}</h4>
                          <p className="post-time" style={{ marginTop: "0px" }}>{new Date(post.updated_at).toLocaleString()}</p>
                        </div>
                      </Col>
                      <Col span={2} className="delete-icon">
                        <Button
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.stopPropagation(); // Ngăn chặn sự kiện onClick của Card
                            deletePost(post.id, userPosts, setUserPosts); // Gọi hàm xóa
                          }}
                        />
                      </Col>
                    </Row>
                    <div style={{ height: '550px', overflow: 'hidden' }}>
                      {renderMedia(post.media)}
                    </div>
                    <div
                      className="post-title"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "70%", // Đặt độ rộng cho box
                        display: "inline-block" // Đảm bảo nó không chiếm toàn bộ dòng
                      }}
                    >{post.title}</div>

                    <div className="post-likes" style={{ display: "flex", justifyContent: "flex-end", marginTop: "-38px" }}>
                      <HeartOutlined />
                      <span style={{ fontSize: '20px' }}> {post.likes} </span>
                    </div>
                  </Card>
                )}
              />
            </Col>
          </Row>
        </Card>
      </Layout>
    </Layout>
  );
}

export default Profile;
