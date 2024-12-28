import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Avatar, Card, List, Button, Spin } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, HeartOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { fetchProfileData2 } from "./profile.handle"; 
import "./profile.css";

function Profile() {
  const { id } = useParams(); // Lấy id từ URL
  const [currentUser, setCurrentUser] = useState(null); 
  const [userPosts, setUserPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowClick = () => {
    setIsFollowed(!isFollowed); // Đổi trạng thái Follow
  };
  useEffect(() => {
    setLoading(true);

    // Gọi hàm lấy dữ liệu với id user
    const { user, userBlogs } = fetchProfileData2(id); // Thay đổi để nhận dữ liệu dựa trên id
    // const user ={
    //     "id": 1,
    //     "username": "john_jackson",
    //     "email": "john_jackson@example.com",
    //     "password": "password384",
    //     "role": "Admin",
    //     "sex": "Male",
    //     "avatar": "https://via.placeholder.com/150",
    //     "address": "789 Oak St",
    //     "phone": "6415653145"
    // };
    // const userBlogs = [

    // ];
    if (user) {
      setCurrentUser(user);
      setUserPosts(userBlogs);
    }

    setLoading(false); // Kết thúc tải dữ liệu
  }, [id]); // Thêm [id] để chạy lại khi id thay đổi

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

        {/* Tên và Follow Button */}
        <div className="user-name-status">
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px"}}>
            <h3 className="user-name">{currentUser.username}</h3>
            <Button
                type="primary"
                onClick={handleFollowClick}
                className={`follow-button ${isFollowed ? "followed" : ""}`}
                >
                {isFollowed ? "フォロー中" : "フォロー"}
            </Button>

            </div>
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
                    <Col span={22}>
                      <div className="post-info">
                        <h4>{currentUser.username}</h4>
                        <p className="post-time">{new Date(post.updated_at).toLocaleString()}</p>
                      </div>
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
