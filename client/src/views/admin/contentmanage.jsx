import React, { useState } from "react";
import { Table, Avatar, Button, Input, Pagination, Tooltip, Dropdown, Menu } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Header from "../../components/header/header";

const AdminPostManagement = () => {
  const columns = [
    {
      title: "タイトル",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "著者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "ステータス",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "投稿日",
      dataIndex: "postDate",
      key: "postDate",
    },
    {
      title: "アクション",
      key: "action",
      render: (_, record) => (
        <div>
          {record.status === "公開" ? (
            <>
              <Tooltip title="編集">
                <Button icon={<EditOutlined />} type="link" />
              </Tooltip>
              <Tooltip title="詳細を確認">
                <Button icon={<EyeOutlined />} type="link" />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="削除">
                <Button icon={<DeleteOutlined />} type="link" danger />
              </Tooltip>
              <Tooltip title="詳細を確認">
                <Button icon={<EyeOutlined />} type="link" />
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];
  const takedata = () => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    if (blogs.length > 0) {
      return blogs;
    } else {
      return data;
    }
  };
  
  const data1 = takedata();
  let data; // Khai báo biến `data` để sử dụng bên dưới
  
  if (!data1) {
    data = Array.from({ length: 40 }, (_, index) => ({
      key: index + 1,
      title: `記事タイトル${index + 1}`,
      author: `ユーザー名${(index % 10) + 1}`,
      status: index % 2 === 0 ? "公開" : "非公開",
      postDate: `2022-11-${String((index % 30) + 1).padStart(2, "0")}`,
    }));
  } else {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    data = data1.map((blog, index) => {
      const user = users.find((u) => u.id === blog.author_id);
      return {
        key: index + 1,
        title: blog.title,
        author: user ? user.username : "Không rõ",
        status: blog.status === "public" ? "公開" : "非公開",
        postDate: blog.created_at,
      };
    });
  }
  
  console.log(data);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const pageSize = 10;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleMenuClick = (e) => {
    setFilterStatus(e.key);
    setCurrentPage(1);
  };

  const filteredData =
    filterStatus === "all"
      ? data
      : data.filter((item) => item.status === filterStatus);

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="all">すべて</Menu.Item>
      <Menu.Item key="公開">公開</Menu.Item>
      <Menu.Item key="非公開">非公開</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Header />
      <div style={{ padding: "20px", margin: "70px 0 0 0" }}>
        {/* Back Button */}
        <Button type="default" style={{ marginBottom: "20px" }}>戻る</Button>

        {/* Admin Info */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", marginLeft: "20px" }}>
          <Avatar size={56} src="/path-to-avatar.png" alt="Admin Avatar" />
          <span style={{ marginLeft: "16px", fontSize: "18px", fontWeight: "bold" }}>Adminネーム</span>
        </div>

        {/* Post Management Table */}
        <h2>すべての記事</h2>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <Input.Search
            placeholder="記事を探す"
            style={{ maxWidth: "400px" }}
          />
          <Dropdown overlay={menu}>
            <Button>
              フィルター <DownOutlined />
            </Button>
          </Dropdown>
        </div>

        <Table columns={columns} dataSource={paginatedData} pagination={false} />

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={pageSize}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPostManagement;
