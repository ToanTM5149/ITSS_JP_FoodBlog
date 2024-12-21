import React, { useState } from "react";
import { Layout, Row, Col, Card, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, ArrowLeftOutlined } from "@ant-design/icons";
import {
  handlePasswordChange,
  handleConfirmPasswordChange,
  handleBack,
  handleContinue,
} from "./new-password.handler.js";
import "./new-password.css";
import newPasswordImage from "../../../assets/images/food.jpg";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  return (
    <Layout style={{ minHeight: "100vh", margin: "0", backgroundColor: "#f9f9f9" }}>
      <Row className="new-password-layout">
        {/* Cột bên trái */}
        <Col span={12} className="new-password-content">
          <Card className="new-password-card">
            <h2 className="new-password-title">ロゴ</h2>
            <h2 className="new-password-title">新しいパスワード</h2>
            <p className="new-password-description">
              アカウントに新しいパスワードを設定して、ログインしてすべての機能にアクセスできるようにしてください。
            </p>
            <Input.Password
              placeholder="新しいパスワードを入力"
              value={password}
              onChange={(e) => handlePasswordChange(e, setPassword)}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="password-input"
            />
            <Input.Password
              placeholder="パスワードを確認"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e, setConfirmPassword)}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="password-input"
            />
            <div className="button-group">
              <Button
                type="default"
                icon={<ArrowLeftOutlined />}
                onClick={() => handleBack(navigate)} // Truyền navigate vào handleBack
                className="back-button"
              >
                戻る
              </Button>
              <Button
                type="primary"
                onClick={() => handleContinue(password, confirmPassword, navigate)} // Truyền navigate vào handleContinue
                className="continue-button"
              >
                続ける
              </Button>
            </div>
          </Card>
        </Col>

        {/* Cột bên phải */}
        <Col span={12} className="new-password-image-container">
          <img src={newPasswordImage} alt="New Password" className="new-password-image" />
        </Col>
      </Row>
    </Layout>
  );
}

export default NewPassword;
