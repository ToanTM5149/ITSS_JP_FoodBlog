import React, { useState } from "react";
import { Card, Row, Col, Avatar, Pagination } from "antd";
import HeaderBar from "../../components/header/header";
import blogs from "../../data/blogs.json";
import users from "../../data/users.json";
import moment from "moment";

const AllBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Hàm phân trang
  const paginateData = (data, page) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  // Dữ liệu hiện tại
  const currentBlogs = paginateData(blogs, currentPage);

  // Hàm xử lý khi chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ paddingTop: "55px", paddingLeft: '200px', paddingRight: '200px' }}>
      <Row gutter={[16, 16]}>
        {currentBlogs.map((blog) => {
          const user = users.find((user) => user.id === blog.author_id);
          return (
            <Col span={24} key={blog.id}>
              <Card hoverable style={{ marginTop: "15px" }}>
                <Row gutter={16}>
                  <Col span={24} md={12}>
                    <div className="blog-image large-image">
                      <img
                        src={blog.image_url || "https://via.placeholder.com/400"}
                        alt="large-card-image"
                        style={{
                          width: "98%",
                          height: "200px",
                          objectFit: "cover",
                          border: "20px",
                        }}
                      />
                    </div>
                  </Col>
                  <Col span={24} md={12}>
                    <div style={{ padding: "10px" }}>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          marginBottom: "8px",
                        }}
                      >
                        {blog.title || "No Title"}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                          color: "gray",
                        }}
                      >
                        <Avatar style={{ marginRight: "8px" }}>
                          {user?.username[0] || "U"}
                        </Avatar>
                        <span>
                          {user?.username || "Unknown User"} •{" "}
                          {moment(blog.created_at).format("YYYY年M月D日") ||
                            "Unknown Date"}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={blogs.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        style={{
          textAlign: "center",
          marginTop: "30px",
          justifyContent: "center",
          display: "flex",
          paddingBottom:'20px'
        }}
      />
    </div>
  );
};

export default AllBlog;
