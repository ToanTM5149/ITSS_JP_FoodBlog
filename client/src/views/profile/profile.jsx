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

  useEffect(() => {
    setLoading(true);
    const { user, userBlogs } = fetchProfileData(); // Gọi hàm lấy dữ liệu

    // if (user) {
    //   setCurrentUser(user);
    //   setUserPosts(userBlogs);
    // }
    // const user = {
    //   "id": 7,
    //   "username": "john_doe",
    //   "email": "john_doe@example.com",
    //   "password": "password318",
    //   "role": "User",
    //   "sex": "Female",
    //   "avatar": "https://via.placeholder.com/150",
    //   "address": "789 Oak St",
    //   "phone": "8247147140"
    // };
    // const userBlogs= [
    //   {
    //     "id": 9,
    //     "title": "カフェトゥン",
    //     "content": "<h1>カフェトゥン - ベトナムのエッグコーヒー</h1><p>ベトナムの特別なデザート「カフェトゥン」（ベトナムのエッグコーヒー）をご紹介します。この独特なドリンクは、ベトナムのカフェ文化の中でも非常に人気があり、多くの人々を魅了しています。カフェトゥンは、そのクリーミーでリッチな味わいが特徴で、寒い季節にもぴったりの温かいデザートコーヒーです。</p><h2>材料と作り方</h2><p>カフェトゥンは、コーヒー、卵黄、砂糖、バター、練乳を使用して作られます。最初に、エスプレッソコーヒーを抽出し、冷やしておきます。その後、卵黄、砂糖、バターを泡立て、ふんわりとしたクリーム状にします。これをエスプレッソの上にたっぷりと乗せて、カフェトゥンが完成します。クリームのふわふわ感と、コーヒーの苦味が絶妙に調和し、まろやかな味わいが楽しめます。</p><h2>カフェ文化の象徴</h2><p>カフェトゥンは、ベトナムのカフェや屋台で一般的に見かけることができます。特に、ハノイやホーチミンのカフェ文化の中で、このドリンクは象徴的な存在です。寒い季節に温かくして飲むだけでなく、涼しい日には冷やして楽しむこともできます。ベトナム国内外で愛され、多くのカフェやレストランで提供されています。</p><h2>一杯の中に詰まった文化</h2><p>もしベトナムを訪れた際には、ぜひ一度カフェトゥンを試してみてください。その一杯には、ベトナムのカフェ文化と豊かな風味が詰まっています。</p>",
    //     "image_url": "https://static.vinwonders.com/production/cafe-trung-ha-noi-3.jpg",
    //     "author_id": 3,
    //     "status": "public",
    //     "created_at": "2023-02-10T10:00:00",
    //     "updated_at": "2023-02-11T08:00:00",
    //     "tags": ["カフェトゥン", "エッグコーヒー", "ベトナムコーヒー", "デザートドリンク"],
    //     "additional_food": ["タピオカミルクティー", "抹茶ラテ", "アフォガート"]
    // },
    // {
    //     "id": 10,
    //     "title": "ミークアン",
    //     "content": "<h1>ミークアン - クアンナムの伝統的な麺料理</h1><p>ミークアンは、クアンナム地方の代表的な料理で、豊かな風味と美味しさ、そして新鮮な食材を使った絶妙な組み合わせで知られています。この料理は、クアンナムの人々の誇りであるだけでなく、ベトナム全土で愛されており、特に肌寒い日や家族が集まる時に人気があります。</p><h2>特徴と材料</h2><p>ミークアンの麺は、米粉で作られており、ほどよい太さと自然な黄色を持っています。この黄色はウコンによるものです。麺は適度に弾力があり、スープやトッピングの風味をよく吸収します。スープは、他の麺料理と比べて少なめですが、麺をしっとりさせるのに十分な量です。スープは、豚骨、鶏の骨、またはカニの出汁で煮込まれ、玉ねぎ、ニンニク、唐辛子、そして少しのオイルを加えて魅力的な色と香りを生み出します。</p><h2>多彩なトッピング</h2><p>ミークアンのトッピングは非常に豊富で多様です。豚肉、鶏肉、エビ、またはカラシナを合わせて食べることができます。肉は丁寧に調理され、炒めたり茹でたりして薄切りにされます。また、香草やもやし、バジル、コリアンダーなどの生野菜もトッピングとして加えられ、さっぱりとした風味と香りを引き立てます。</p><h2>食べ方と楽しみ方</h2><p>ミークアンは、少しの生レモン、唐辛子、そしてローストピーナッツを添えて食べるのが一般的です。これにより、酸味、辛味、甘味が絶妙にバランスよく調和します。ローストピーナッツは、食感を加えるだけでなく、料理の美味しさを引き立てます。食べるときには、麺、野菜、スープをよく混ぜて、すべての素材が完璧に調和した味を楽しむことができます。</p><h2>クアンナム文化の象徴</h2><p>ミークアンは、美味しいだけでなく、クアンナムの食文化において重要な一部を占める料理です。この料理は、祭りや家族の集まりなど、特別な日にもよく登場します。ミークアンの一杯は、伝統の一部であり、ベトナム料理の創造性と洗練された技を反映している料理です。</p>",
    //     "image_url": "https://hapinut.com/wp-content/uploads/2022/03/mi-quang-quang-nam.jpg",
    //     "author_id": 3,
    //     "status": "public",
    //     "created_at": "2023-01-02T10:00:00",
    //     "updated_at": "2023-01-03T06:00:00",
    //     "tags": ["ミークアン", "クアンナム料理", "ベトナム麺料理", "伝統料理"],
    //     "additional_food": ["ラーメン", "フォー", "うどん"]
    // }
    // ];
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

  return (
   <Layout style={{margin: '20px 10% 0 10%'}}>
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
                  style={{ marginBottom: "20px" }}
                >
                  <Row gutter={[10, 10]}>
                    <Col span={2}>
                      <Avatar src={currentUser.avatar} size={48} />
                    </Col>
                    <Col span={20}>
                      <div className="post-info">
                        <h4>{currentUser.username}</h4>
                        <p className="post-time" style={{marginTop: "0px"}}>{new Date(post.updated_at).toLocaleString()}</p>
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
                    <img src={post.image_url} style={{maxHeight: "360px"}} alt="Post" />
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
