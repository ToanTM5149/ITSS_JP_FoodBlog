import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Avatar, Card, List, Button, message, Spin } from "antd";
import {UserOutlined,MailOutlined,PhoneOutlined,HomeOutlined,HeartOutlined,DeleteOutlined,} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fetchProfileData, deletePost } from "./profile.handle"; 
import "./profile.css";

function Profile() {
  const [currentUser, setCurrentUser] = useState(null); 
  const [userPosts, setUserPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); // Để điều hướng

  useEffect(() => {
    setLoading(true);
    // const { user, userBlogs } = fetchProfileData(); // Gọi hàm lấy dữ liệu

    // if (user) {
    //   setCurrentUser(user);
    //   setUserPosts(userBlogs);
    // }
    const user = {
      "id": 7,
      "username": "john_doe",
      "email": "john_doe@example.com",
      "password": "password318",
      "role": "User",
      "sex": "Female",
      "avatar": "https://via.placeholder.com/150",
      "address": "789 Oak St",
      "phone": "8247147140"
    };
    const userBlogs= [
      
    ]
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
    <Layout style={{ minHeight: "100vh", margin: "0 0 0 0" }}>
      <Card style={{ width: "100%", marginBottom: "20px", padding: 0 }}>
        <div className="cover-image" style={{ backgroundImage: "url(/image/back.jpg)" }} />
        <div className="avatar-container">
          <Avatar
            size={64}
            src={currentUser.avatar}
            className="avatar"
            style={{ width: "120px", height: "120px" }}
          />
        </div>

        {/* Tên và Status */}
        <div className="user-name-status">
          <h3 className="user-name">{currentUser.username}</h3>
          <p className="user-status">Online</p>
        </div>

        {/* Hai cột thông tin và bài viết */}
        <Row gutter={[20, 20]} className="profile-content">
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
              <UserOutlined /> Role: {currentUser.role}
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
                >
                  <Row>
                    <Col span={2}>
                      <Avatar src={currentUser.avatar} size={48} />
                    </Col>
                    <Col span={20}>
                      <div className="post-info">
                        <h4>{currentUser.username}</h4>
                        <p className="post-time">{new Date(post.updated_at).toLocaleString()}</p>
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
                  <div className="post-image">
                    <img src={post.image_url} alt="Post" />
                  </div>
                  <h4 className="post-title">{post.title}</h4>
                  <div className="post-likes">
                    <HeartOutlined />
                    <span>{post.recommend_food}</span>
                  </div>
                </Card>
              )}
            />
          </Col>
        </Row>
      </Card>
    </Layout>
  );
}

export default Profile;
