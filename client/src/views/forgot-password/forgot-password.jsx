import React, { useState } from "react";
import { Layout, Row, Col, Card, Input, Button } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import {
  handleEmailChange,
  handleContinue,
  handleBack,
} from './forgot-password.handler.js';
import './forgot-password.css';
import forgotPasswordImage from '../../assets/images/food.jpg';
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  return (
    <Layout style={{ minHeight: "100vh", margin: "0", backgroundColor: "#f9f9f9" }}>
      <Row className="forgot-password-layout">
        {/* Cột bên trái */}
        <Col span={12} className="forgot-password-content">
          <Card className="forgot-password-card">
            <h2 className="forgot-password-title">ロゴ</h2>
            <h2 className="forgot-password-title">忘れたパスワード</h2>
            <p className="forgot-password-description">
            確認プロセスのためにメールアドレスを入力してください。4桁のコードをメールでお送りします。<br />
            </p>
            <Input
              prefix={<MailOutlined />}
              placeholder="メールアドレスを入力してください"
              value={email}
              onChange={(e) => handleEmailChange(e, setEmail)}
              className="email-input"
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
                onClick={() => handleContinue(navigate)}
                className="continue-button"
              >
                続ける
              </Button>
            </div>
          </Card>
        </Col>

        {/* Cột bên phải */}
        <Col span={12} className="forgot-password-image-container">
          <img src={forgotPasswordImage} alt="Forgot Password" className="forgot-password-image" />
        </Col>
      </Row>
    </Layout>
  );
}

export default ForgotPassword;
