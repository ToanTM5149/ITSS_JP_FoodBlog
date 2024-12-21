import React, { useState } from 'react';
import { Layout, Card, Row, Col, Avatar, Pagination, Typography } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import HeaderBar from '../../components/header/header';
import blogs from '../../data/blogs.json';
import users from '../../data/users.json';
import moment from 'moment';
import homepageHandle from './homepage.handle'; // Import homepageHandle

const { Title } = Typography;
const { Content } = Layout;

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Hook for navigation

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
          <Title level={2} className="section-title" style={{ marginLeft: '50px', marginBottom: '30px' }}>最近のブログ投稿</Title>

          {/* Phần card lớn */}
          <Row gutter={[16, 16]}>
            <Col span={24} md={16}>
              <Card
                hoverable
                cover={
                  <div className="blog-image large-image">
                    <img
                      src={blogs[0]?.image_url || "https://via.placeholder.com/400"}
                      alt="large-card-image"
                      style={{ width: '100%', height: '504px', objectFit: 'cover' }}
                    />
                  </div>
                }
                onClick={() => homepageHandle.handleNavigate(navigate, blogs[0]?.id)} // Use handleNavigate
              >
                <div style={{ padding: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                    {blogs[0]?.title || "No Title"}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                    <Avatar style={{ marginRight: '8px' }}>{users.find(user => user.id === blogs[0]?.author_id)?.username[0] || "U"}</Avatar>
                    <span>{users.find(user => user.id === blogs[0]?.author_id)?.username || "Unknown User"} • {moment(blogs[0]?.created_at).format('YYYY年M月D日') || "Unknown Date"}</span>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Phần card nhỏ */}
            <Col span={24} md={8}>
              <Row gutter={[0, 16]}>
                {homepageHandle.paginateData(blogs, currentPage).slice(1, 3).map((blog) => (
                  <Col span={24} key={blog.id}>
                    <Card
                      hoverable
                      cover={<img src={blog.image_url} alt="small-card" style={{ height: '180px', objectFit: 'cover' }} />}
                      onClick={() => homepageHandle.handleNavigate(navigate, blog.id)} // Use handleNavigate
                    >
                      <div style={{ padding: '10px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                          {blog.title}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                          <Avatar style={{ marginRight: '8px' }}>{users.find(user => user.id === blog.author_id)?.username[0] || "U"}</Avatar>
                          <span>{users.find(user => user.id === blog.author_id)?.username || "Unknown User"} • {moment(blog.created_at).format('YYYY年M月D日')}</span>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          {/* Phần card bổ sung */}
          <Card hoverable style={{ marginTop: '20px' }}>
            <Row gutter={16}>
              <Col span={24} md={16}>
                <div className="blog-image large-image">
                  <img
                    src={blogs[1]?.image_url || "https://via.placeholder.com/400"}
                    alt="large-card-image"
                    style={{ width: '100%', height: '200px', objectFit: 'cover', border: '20px' }}
                  />
                </div>
              </Col>

              <Col span={24} md={8}>
                <div style={{ padding: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                    {blogs[1]?.title || "No Title"}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                    <Avatar style={{ marginRight: '8px' }}>
                      {users.find(user => user.id === blogs[1]?.author_id)?.username[0] || "U"}
                    </Avatar>
                    <span>
                      {users.find(user => user.id === blogs[1]?.author_id)?.username || "Unknown User"} • {moment(blogs[1]?.created_at).format('YYYY年M月D日') || "Unknown Date"}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          <Title level={2} className="blog-title" style={{ marginLeft: '50px', marginBottom: '30px', marginTop: '40px' }}>すべてのブログ投稿</Title>

          <Row gutter={[16, 16]}>
            {homepageHandle.paginateData(blogs, currentPage).map((blog) => (
              <Col span={8} key={blog.id}>
                <Card
                  hoverable
                  cover={<img src={blog.image_url} alt="blog-image" style={{ height: '180px', objectFit: 'cover' }} />}
                  onClick={() => homepageHandle.handleNavigate(navigate, blog.id)} // Use handleNavigate
                >
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                      {blog.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                      <Avatar style={{ marginRight: '8px' }}>{users.find(user => user.id === blog.author_id)?.username[0] || "U"}</Avatar>
                      <span>{users.find(user => user.id === blog.author_id)?.username || "Unknown User"} • {moment(blog.created_at).format('YYYY年M月D日')}</span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Pagination
            current={currentPage}
            total={blogs.length}
            pageSize={6}
            onChange={(page) => homepageHandle.handlePageChange(page, setCurrentPage)} // Use handlePageChange
            style={{ textAlign: 'center', marginTop: '30px', justifyContent: 'center', display: 'flex' }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Homepage;
