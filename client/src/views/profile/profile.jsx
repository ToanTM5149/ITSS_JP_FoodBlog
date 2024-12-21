import React, { useState } from "react";
import { Layout, Row, Col, Avatar, Card, List, Button } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import HeaderBar from "../../components/header/header";
import "./profile.css";

function Profile() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "User's Name",
      avatar: "/image/OIP.jpeg",
      time: "10 minutes ago",
      image: "/image/third.jpeg",
      title: "My first post!",
      likes: 32,
    },
    {
      id: 2,
      name: "User's Name",
      avatar:  "/image/OIP.jpeg",
      time: "1 hour ago",
      image: "/image/second.jpeg",
      title: "Another beautiful day....maybe",
      likes: 64,
    },
    {
        id: 2,
      name: "User's Name",
      avatar: "/image/OIP.jpeg",
      time: "3 hour ago",
      image: "/image/first.jpeg",
      title: "Another beautiful day!",
      likes: 64,
    },
  ]);

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <Layout style={{ minHeight: "100vh", margin: "0 0 0 0" }}>
      <HeaderBar showSearch={true} />
      <Card style={{ width: "100%", marginBottom: "20px", padding: 0 }}>
        <div className="cover-image" style={{ backgroundImage: "url(/image/back.jpg)" }} />
        <div className="avatar-container">
          <Avatar size={64} src="/image/OIP.jpeg" className="avatar" style={{ width: "120px", height: "120px" }} />
        </div>

        {/* Tên và Status */}
        <div className="user-name-status">
          <h3 className="user-name">後藤 ひとり</h3>
          <p className="user-status">Online</p>
        </div>

        {/* Hai cột thông tin và bài viết */}
        <Row gutter={[20, 20]} className="profile-content">
          {/* Cột thông tin */}
          <Col span={8} className="user-details">
            <h4 className="section-title">ユーザー情報</h4>
            <p>
              <UserOutlined /> 男性
            </p>
            <p>
              <MailOutlined /> user@example.com
            </p>
            <p>
              <PhoneOutlined /> 123-456-7890
            </p>
            <p>
              <HomeOutlined /> 日本、東京
            </p>
            <p>
              <UserOutlined /> 1996年6月15日
            </p>
          </Col>

          {/* Cột bài viết */}
          <Col span={16} className="user-posts">
            <h4 className="section-title">Posts</h4>
            <List
              dataSource={posts}
              renderItem={(post) => (
                <Card className="post-card" key={post.id}>
                  <Row>
                    <Col span={2}>
                      <Avatar src={post.avatar} size={48} />
                    </Col>
                    <Col span={20}>
                      <div className="post-info">
                        <h4>{post.name}</h4>
                        <p className="post-time">{post.time}</p>
                      </div>
                    </Col>
                    <Col span={2} className="delete-icon">
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => deletePost(post.id)}
                      />
                    </Col>
                  </Row>
                  <div className="post-image">
                    <img src={post.image} alt="Post" />
                  </div>
                  <h4 className="post-title">{post.title}</h4>
                  <div className="post-likes">
                    <HeartOutlined />
                    <span>{post.likes} likes</span>
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
