import React, { useState } from 'react';
import { Layout, Card, Row, Col, Avatar, Pagination, Typography } from 'antd';
import HeaderBar from '../../components/header/header';

const { Title } = Typography;
const { Content } = Layout;

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Dữ liệu mẫu cho blog
  const blogData = [
    { id: 1, image: 'https://via.placeholder.com/150', author: 'M', title: 'Blog Post 1', date: '2023年1月1日' },
    { id: 2, image: 'https://via.placeholder.com/150', author: 'M', title: 'Blog Post 2', date: '2023年1月2日' },
    { id: 3, image: 'https://via.placeholder.com/150', author: 'M', title: 'Blog Post 3', date: '2023年1月3日' },
    { id: 4, image: 'https://via.placeholder.com/150', author: 'M', title: 'Blog Post 4', date: '2023年1月4日' },
    { id: 5, image: 'https://via.placeholder.com/150', author: 'M', title: 'Blog Post 5', date: '2023年1月5日' },
    { id: 6, image: 'https://via.placeholder.com/150', author: 'M', title: 'Blog Post 6', date: '2023年1月6日' },
    { id: 7, image: 'https://via.placeholder.com/150', author: 'M', title: 'Blog Post 7', date: '2023年1月7日' },
    { id: 8, image: 'https://via.placeholder.com/150', author: 'M', title: 'Blog Post 8', date: '2023年1月8日' },
    { id: 9, image: 'https://via.placeholder.com/150', author: 'M', title: 'Blog Post 9', date: '2023年1月9日' },
    // Thêm các bài viết khác vào đây...
  ];

  // Hàm để phân trang dữ liệu
  const paginateData = (page) => {
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    return blogData.slice(startIndex, endIndex);
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout style={{ minHeight: '100vh', margin: '44px 0 0 0' }}>
      <HeaderBar showSearch={true} />

      <Layout style={{ padding: '0 0 0px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          {/* Phần Tiêu đề */}
          <Title level={2} className="section-title" style={{marginLeft: '50px', marginBottom: '30px'}}>最近のブログ投稿</Title>

          {/* Phần card lớn */}
          <Row gutter={[16, 16]}>
            <Col span={24} md={16}>
              <Card
                hoverable
                cover={
                  <div className="blog-image large-image">
                    <img
                      src="https://via.placeholder.com/400"
                      alt="large-card-image"
                      style={{ width: '100%', height: '504px', objectFit: 'cover' }}
                    />
                  </div>
                }
              >
                <div style={{ padding: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                    新しいスニーカーが登場。500ドル!!!
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                    <Avatar style={{ marginRight: '8px' }}>M</Avatar>
                    <span>Male • 2023年1月1日</span>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Phần card nhỏ */}
            <Col span={24} md={8}>
              <Row gutter={[0, 16]}>
                {paginateData(currentPage).slice(0, 2).map((blog) => (
                  <Col span={24} key={blog.id}>
                    <Card
                      hoverable
                      cover={<img src={blog.image} alt="small-card" style={{ height: '180px', objectFit: 'cover' }} />}
                    >
                      <div style={{ padding: '10px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                          {blog.title}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                          <Avatar style={{ marginRight: '8px' }}>{blog.author}</Avatar>
                          <span>{`${blog.author} • ${blog.date}`}</span>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <Card hoverable style={{ marginTop: '20px' }}>
            <Row gutter={16}>
              <Col span={24} md={16}>
                <div className="blog-image large-image">
                  <img
                    hoverable
                    src={"https://via.placeholder.com/400"}
                    alt="large-card-image"
                    style={{ width: '100%', height: '200px', objectFit: 'cover', border: '20px' }}
                  />
                </div>
              </Col>

              <Col span={24} md={8}>
                <div style={{ padding: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                    新しいスニーカーが登場。500ドル!!!
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                    <Avatar style={{ marginRight: '8px' }}>M</Avatar>
                    <span>Male • 2023年1月1日</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          <Title level={2} className="blog-title" style={{marginLeft: '50px', marginBottom: '30px', marginTop: '40px'}}>すべてのブログ投稿</Title>

          <Row gutter={[16, 16]}>
            {paginateData(currentPage).map((blog) => (
              <Col span={8} key={blog.id}>
                <Card
                  hoverable
                  cover={<img src={blog.image} alt="blog-image" style={{ height: '180px', objectFit: 'cover' }} />}
                >
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                      {blog.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                      <Avatar style={{ marginRight: '8px' }}>{blog.author}</Avatar>
                      <span>{`${blog.author} • ${blog.date}`}</span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Pagination
            current={currentPage}
            total={blogData.length}
            pageSize={6}
            onChange={handlePageChange}
            style={{ textAlign: 'center', marginTop: '30px', justifyContent: 'center', display: 'flex'}}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Homepage;
