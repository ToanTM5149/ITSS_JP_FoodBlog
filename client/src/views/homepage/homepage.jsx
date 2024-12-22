import React, { useState } from 'react';
import { Layout, Card, Row, Col, Avatar, Pagination, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import blogs from '../../data/blogs.json';
import users from '../../data/users.json';
import moment from 'moment';
import homepageHandle from './homepage.handle';
import HeaderBar from '../../components/header/header';

const { Title } = Typography;
const { Content } = Layout;

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Lọc blogs dựa trên từ khóa tìm kiếm
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp blogs theo ngày cập nhật
  const sortedBlogs = [...filteredBlogs].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  // Phân trang blogs
  const paginatedBlogs = homepageHandle.paginateData(sortedBlogs, currentPage);

  // Hàm xử lý tìm kiếm từ HeaderBar
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  return (
    <Layout style={{ minHeight: '100vh', margin: '44px 0 0 0' }}>
      {/* HeaderBar với hàm tìm kiếm */}
      <HeaderBar onSearchSubmit={handleSearch} />

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
          {/* Phần tiêu đề */}
          <Title level={2} className="section-title" style={{ marginLeft: '50px', marginBottom: '30px' }}>
            最近のブログ投稿
          </Title>

          {/* Hiển thị thông báo nếu không có bài viết nào */}
          {sortedBlogs.length === 0 ? (
            <p style={{ marginLeft: '50px', fontSize: '16px', color: 'red' }}>
              該当するブログ投稿が見つかりません。
            </p>
          ) : (
            <>
              {/* Phần card lớn */}
              {sortedBlogs.length > 0 && (
                <Row gutter={[16, 16]}>
                  <Col span={24} md={16}>
                    <Card
                      hoverable
                      cover={
                        <div className="blog-image large-image">
                          <img
                            src={sortedBlogs[0]?.image_url || "https://via.placeholder.com/400"}
                            alt="large-card-image"
                            style={{ width: '100%', height: '504px', objectFit: 'cover' }}
                          />
                        </div>
                      }
                      onClick={() => homepageHandle.handleNavigate(navigate, sortedBlogs[0]?.id)}
                    >
                      <div style={{ padding: '10px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                          {sortedBlogs[0]?.title || "No Title"}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                          <Avatar style={{ marginRight: '8px' }}>
                            {users.find(user => user.id === sortedBlogs[0]?.author_id)?.username[0] || "U"}
                          </Avatar>
                          <span>
                            {users.find(user => user.id === sortedBlogs[0]?.author_id)?.username || "Unknown User"} •{" "}
                            {moment(sortedBlogs[0]?.updated_at).format('YYYY年M月D日')}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Phần card nhỏ */}
                  <Col span={24} md={8}>
                    <Row gutter={[0, 16]}>
                      {sortedBlogs.slice(1, 3).map((blog) => (
                        <Col span={24} key={blog.id}>
                          <Card
                            hoverable
                            cover={
                              <img
                                src={blog.image_url}
                                alt="small-card"
                                style={{ height: '180px', objectFit: 'cover' }}
                              />
                            }
                            onClick={() => homepageHandle.handleNavigate(navigate, blog.id)}
                          >
                            <div style={{ padding: '10px' }}>
                              <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                                {blog.title}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                                <Avatar style={{ marginRight: '8px' }}>
                                  {users.find(user => user.id === blog.author_id)?.username[0] || "U"}
                                </Avatar>
                                <span>
                                  {users.find(user => user.id === blog.author_id)?.username || "Unknown User"} •{" "}
                                  {moment(blog.updated_at).format('YYYY年M月D日')}
                                </span>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              )}

              {/* Phần card bổ sung */}
              {sortedBlogs.length > 3 && (
                <Card hoverable style={{ marginTop: '20px' }}>
                  <Row gutter={16}>
                    <Col span={24} md={16}>
                      <div className="blog-image large-image">
                        <img
                          src={sortedBlogs[3]?.image_url || "https://via.placeholder.com/400"}
                          alt="large-card-image"
                          style={{ width: '100%', height: '200px', objectFit: 'cover', border: '20px' }}
                        />
                      </div>
                    </Col>
                    <Col span={24} md={8}>
                      <div style={{ padding: '10px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                          {sortedBlogs[3]?.title || "No Title"}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                          <Avatar style={{ marginRight: '8px' }}>
                            {users.find(user => user.id === sortedBlogs[3]?.author_id)?.username[0] || "U"}
                          </Avatar>
                          <span>
                            {users.find(user => user.id === sortedBlogs[3]?.author_id)?.username || "Unknown User"} •{" "}
                            {moment(sortedBlogs[3]?.updated_at).format('YYYY年M月D日')}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              )}

              {/* Phần tất cả bài viết */}
              <Title level={2} className="blog-title" style={{ marginLeft: '50px', marginBottom: '30px', marginTop: '40px' }}>
                すべてのブログ投稿
              </Title>
              <Row gutter={[16, 16]}>
                {paginatedBlogs.map((blog) => (
                  <Col span={8} key={blog.id}>
                    <Card
                      hoverable
                      cover={
                        <img
                          src={blog.image_url}
                          alt="blog-image"
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                      }
                      onClick={() => homepageHandle.handleNavigate(navigate, blog.id)}
                    >
                      <div style={{ padding: '10px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                          {blog.title}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                          <Avatar style={{ marginRight: '8px' }}>
                            {users.find(user => user.id === blog.author_id)?.username[0] || "U"}
                          </Avatar>
                          <span>
                            {users.find(user => user.id === blog.author_id)?.username || "Unknown User"} •{" "}
                            {moment(blog.updated_at).format('YYYY年M月D日')}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          {/* Pagination */}
          <Pagination
            current={currentPage}
            total={sortedBlogs.length}
            pageSize={6}
            onChange={(page) => homepageHandle.handlePageChange(page, setCurrentPage)}
            style={{ textAlign: 'center', marginTop: '30px', justifyContent: 'center', display: 'flex' }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Homepage;