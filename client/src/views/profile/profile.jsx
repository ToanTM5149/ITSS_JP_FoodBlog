import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Avatar, Card, List, Button, message } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import HeaderBar from "../../components/header/header";
import blogs from '../../data/blogs.json'; // Import blogs JSON
import users from '../../data/users.json'; // Import users JSON
import "./profile.css";

function Profile() {
  const [currentUser, setCurrentUser] = useState(null); // Người dùng hiện tại
  const [userPosts, setUserPosts] = useState([]); // Bài viết của người dùng

  useEffect(() => {
    const loggedInUserEmail = JSON.parse(localStorage.getItem("loggedInUser"))?.email;
    if (!loggedInUserEmail) {
      message.error("Bạn chưa đăng nhập!");
      return;
    }

    // Tìm thông tin người dùng hiện tại
    const user = users.find((user) => user.email === loggedInUserEmail);
    if (user) {
      setCurrentUser(user);

      // Lọc bài viết của người dùng hiện tại
      const userBlogs = blogs.filter((blog) => blog.author_id === user.id);
      setUserPosts(userBlogs);
    } else {
      message.error("Không tìm thấy thông tin người dùng!");
    }
  }, []);

  const deletePost = (id) => {
    setUserPosts(userPosts.filter((post) => post.id !== id)); // Xóa bài viết
    message.success("Đã xóa bài viết!");
  };

  if (!currentUser) {
    return <p>Loading...</p>; // Hiển thị trạng thái tải dữ liệu
  }

  return (
    <Layout style={{ minHeight: "100vh", margin: "0 0 0 0" }}>
      <HeaderBar />
      <Card style={{ width: "100%", marginBottom: "20px", padding: 0 }}>
        <div className="cover-image" style={{ backgroundImage: "url(/image/back.jpg)" }} />
        <div className="avatar-container">
          <Avatar size={64} src={currentUser.avatar} className="avatar" style={{ width: "120px", height: "120px" }} />
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
                <Card className="post-card" key={post.id}>
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
                        onClick={() => deletePost(post.id)}
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
