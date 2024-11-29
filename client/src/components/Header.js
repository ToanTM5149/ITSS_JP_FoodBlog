import React from "react";
import "./css/Header.css";
import { FaBell, FaSearch } from "react-icons/fa"; // Import thêm icon FaSearch

const Header = () => {
  return (
    <div className="header">
      <h1 className="logo">ヘッダー</h1>
      <div className="search-container">
        <div className="search-bar-wrapper">
          <FaSearch className="search-icon" /> {/* Icon tìm kiếm */}
          <input
            className="search-bar"
            type="text"
            placeholder="プロジェクトを探す"
          />
        </div>
        <FaBell className="notification-icon" />
      </div>
      <div className="header-buttons">
        <button>投稿</button>
        <button>ブログ</button>
        <button>プロフィール</button>
        <button>ログアウト</button>
      </div>
    </div>
  );
};

export default Header;
