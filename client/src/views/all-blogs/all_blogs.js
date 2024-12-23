import React, { useState, useEffect } from "react";
import { Card, Row, Col, Avatar, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../components/header/header";
import moment from "moment";
import allBlogsHandle from "./all_blogs.handle"; // Import file handle

const AllBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setBlogs(storedBlogs);
    setUsers(storedUsers);
  }, []);

  // Sắp xếp blogs theo ngày giảm dần
  const sortedBlogs = allBlogsHandle.sortBlogsByDate(blogs);

  // Dữ liệu hiện tại sau phân trang
  const currentBlogs = allBlogsHandle.paginateData(sortedBlogs, currentPage, pageSize);

  // Hàm xử lý khi chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ paddingTop: "55px", paddingLeft: "200px", paddingRight: "200px" }}>
      <Row gutter={[16, 16]}>
        {currentBlogs.map((blog) => {
          const user = users.find((user) => user.id === blog.author_id);
          return (
            <Col span={24} key={blog.id}>
              <Card
                hoverable
                style={{ marginTop: "15px" }}
                onClick={() => allBlogsHandle.handleNavigate(navigate, blog.id)} // Thêm onClick để điều hướng
              >
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
                          {moment(blog.created_at).format("YYYY年M月D日") || "Unknown Date"}
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
          paddingBottom: "20px",
        }}
      />
    </div>
  );
};

export default AllBlog;
