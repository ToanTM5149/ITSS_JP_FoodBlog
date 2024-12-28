import React, { useState } from "react";
import { Table, Avatar, Button, Input, Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Header from "../../components/header/header";

const AdminUserManagement = () => {
  const columns = [
    {
      title: "ユーザー名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "メールアドレス",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ロール",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "ステータス",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "登録日",
      dataIndex: "registrationDate",
      key: "registrationDate",
    },
    {
      title: "アクション",
      key: "action",
      render: (_, record) => (
        <Button icon={<EditOutlined />} type="link" />
      ),
    },
  ];



  
  const data = Array.from({ length: 40 }, (_, index) => ({
    key: index + 1,
    username: `ユーザー名${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 3 === 0 ? "Admin" : index % 3 === 1 ? "User" : "Mod",
    status: index % 2 === 0 ? "アクティブ" : "停止中",
    registrationDate: `2022-11-${String((index % 30) + 1).padStart(2, "0")}`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
        <Header/>
        <div style={{ padding: "20px" , margin: "70px 0 0 0"}}>
        {/* Back Button */}
        <Button type="default" style={{ marginBottom: "20px" }}>戻る</Button>

        {/* Admin Info */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <Avatar size={64} src="/path-to-avatar.png" alt="Admin Avatar" />
            <span style={{ marginLeft: "16px", fontSize: "18px", fontWeight: "bold" }}>Adminネーム</span>
        </div>

        {/* User Management Table */}
        <h2>すべてのユーザー</h2>
        <Input.Search
            placeholder="ユーザーを探す"
            style={{ marginBottom: "20px", maxWidth: "400px" }}
        />

        <Table columns={columns} dataSource={paginatedData} pagination={false} />

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Pagination
            current={currentPage}
            total={data.length}
            pageSize={pageSize}
            onChange={handleChangePage}
            />
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
