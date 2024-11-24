import React from "react";
import './css/UserInfo.css';

const UserInfo = () => {
  return (
    <div className="user-info-container">
      <span className="back">戻る</span>
      <div className="user-info">
        <span className="user-avatar"></span>
        <span className="username">ユーザーネーム</span>
      </div>
      <div className="follow-and-date">
        <button className="follow-btn">フォロー</button>
        <span className="create-date">作成日: 2023年11月22日</span>
      </div>
    </div>
  );
};

export default UserInfo;
