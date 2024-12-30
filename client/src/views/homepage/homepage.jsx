import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Avatar, Pagination, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import homepageHandle from './homepage.handle';
import HeaderBar from '../../components/header/header';

const { Title } = Typography;
const { Content } = Layout;

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Lấy dữ liệu từ localStorage
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setBlogs(storedBlogs);
    setUsers(storedUsers);
  }, []);

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
    setCurrentPage(1);
  };

  return (
    <Layout style={{ minHeight: '100vh', margin: '80px 0 0 0', paddingLeft: '100px', paddingRight: '100px' }}>
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
          <Title level={2} className="section-title" style={{ marginBottom: '30px' }}>
            最近のブログ投稿
          </Title>

          {sortedBlogs.length === 0 ? (
            <p style={{ marginLeft: '50px', fontSize: '16px', color: 'red' }}>
              該当するブログ投稿が見つかりません。
            </p>
          ) : (
            <>
              {sortedBlogs.length > 0 && (
                <Row gutter={[16, 16]}>
                  {/* Card lớn */}
                  <Col span={24} md={16} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Card
                      hoverable
                      cover={
                        <div style={{ height: '550px', overflow: 'hidden' }}>
                          {renderMedia(sortedBlogs[0]?.media)}
                        </div>
                      }
                      onClick={() => homepageHandle.handleNavigate(navigate, sortedBlogs[0]?.id)}
                      style={{ height: '100%' }}
                    >
                      <div style={{ padding: '10px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                          {sortedBlogs[0]?.title || 'No Title'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                          <Avatar style={{ marginRight: '8px' }}>
                            {users.find((user) => user.id === sortedBlogs[0]?.author_id)?.username[0] || 'U'}
                          </Avatar>
                          <span>
                            {users.find((user) => user.id === sortedBlogs[0]?.author_id)?.username || 'Unknown User'} •{' '}
                            {moment(sortedBlogs[0]?.updated_at).format('YYYY年M月D日')}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Card nhỏ */}
                  <Col span={24} md={8}>
                    <Row gutter={[0, 16]}>
                      {sortedBlogs.slice(1, 3).map((blog) => (
                        <Col span={24} key={blog.id}>
                          <Card
                            hoverable
                            cover={
                              <div style={{ height: '200px', overflow: 'hidden' }}>
                                {renderMedia(blog.media)}
                              </div>
                            }
                            onClick={() => homepageHandle.handleNavigate(navigate, blog.id)}
                          >
                            <div style={{ padding: '10px' }}>
                              <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                                {blog.title}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                                <Avatar style={{ marginRight: '8px' }}>
                                  {users.find((user) => user.id === blog.author_id)?.username[0] || 'U'}
                                </Avatar>
                                <span>
                                  {users.find((user) => user.id === blog.author_id)?.username || 'Unknown User'} •{' '}
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

              {/* Danh sách bài viết */}
              <Title level={2} className="blog-title" style={{ marginBottom: '30px', marginTop: '40px' }}>
                すべてのブログ投稿
              </Title>
              <Row gutter={[16, 16]}>
                {paginatedBlogs.map((blog) => (
                  <Col span={8} key={blog.id}>
                    <Card
                      hoverable
                      cover={
                        <div style={{ height: '180px', overflow: 'hidden' }}>
                          {renderMedia(blog.media)}
                        </div>
                      }
                      onClick={() => homepageHandle.handleNavigate(navigate, blog.id)}
                    >
                      <div style={{ padding: '10px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
                          {blog.title}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'gray' }}>
                          <Avatar style={{ marginRight: '8px' }}>
                            {users.find((user) => user.id === blog.author_id)?.username[0] || 'U'}
                          </Avatar>
                          <span>
                            {users.find((user) => user.id === blog.author_id)?.username || 'Unknown User'} •{' '}
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
