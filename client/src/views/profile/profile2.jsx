import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Avatar, Card, List, Button, message, Spin } from "antd";
import {UserOutlined,MailOutlined,PhoneOutlined,HomeOutlined,HeartOutlined,DeleteOutlined,} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fetchProfileData, deletePost, fetchProfileData2 } from "./profile.handle";
import { useParams } from "react-router-dom"; // Import useParams
import "./profile.css";

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const navigate = useNavigate(); // Để điều hướng
  const {id} = useParams();

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
      const { user, userBlogs } = fetchProfileData2(id); // Gọi hàm lấy dữ liệu
        console.log(user);

    if (user) {
      setCurrentUser(user);
      setUserPosts(userBlogs);
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
 const handleFollowClick = () => {
    setIsFollowed(!isFollowed); // Đổi trạng thái giữa Follow và Unfollow
};

  return (
   <Layout style={{margin: '20px 10% 0 10%'}}>
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
        {/* Tên và Status va follow*/}
        <div style={{display: "flex", justifyContent: "glow"}}>
        <div className="user-name-status">
          <h3 className="user-name">{currentUser.username}</h3>
          <p className="user-status">Online</p>
        </div>
        <Button
            type="primary"
            className="follow-button"
            onClick={handleFollowClick}
            style={{
                width: "100px",
                margin: "-20px 0 0 30px",
                backgroundColor: isFollowed ? "green" : "#1677ff", // Xanh lá khi được bấm
                borderColor: isFollowed ? "green" : "#1677ff",
                color: "#fff",
            }}
        >
            {isFollowed ? "フォロー中" : "フォロー"} {/* Thay đổi nội dung nút */}
        </Button>
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
                >
                  <Row>
                    <Col span={2}>
                      <Avatar src={currentUser.avatar} size={48} />
                    </Col>
                    <Col span={20}>
                      <div className="post-info">
                        <h4>{currentUser.username}</h4>
                        <p className="post-time" style={{marginTop: "0px"}}>{new Date(post.updated_at).toLocaleString()}</p>
                      </div>
                    </Col>
                    {/* <Col span={2} className="delete-icon">
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn chặn sự kiện onClick của Card
                          deletePost(post.id, userPosts, setUserPosts); // Gọi hàm xóa
                        }}
                      />
                    </Col> */}
                  </Row>
                  <div className="post-image">
                    {renderMedia(post.media)}
                    {/* <img src={post.image_url} style={{maxHeight: "360px"}} alt="Post" /> */}
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

                  <div className="post-likes" style={{display: "flex", justifyContent: "flex-end", marginTop: "-38px"}}>
                    <HeartOutlined />
                    <span style={{fontSize:'0.5em'}}>1000</span>
                    {/* <span>{post.additional_food}</span> */}
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
