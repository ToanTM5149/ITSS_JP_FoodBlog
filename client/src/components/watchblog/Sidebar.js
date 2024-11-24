import React from "react";
import './css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Mục lục bài viết</h3>
      <ul className="sidebar-list">
        <li className="sidebar-item">Phần 1: Giới thiệu</li>
        <li className="sidebar-item">Phần 2: Nội dung chính</li>
        <li className="sidebar-item">Phần 3: Kết luận</li>
      </ul>
    </div>
  );
};

export default Sidebar;
