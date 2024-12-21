import React, { useState } from "react";
import { Layout, Row, Col, Card, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  handleChangeCode,
  handleBack,
  handleContinue,
  handleResend,
} from "./password-code.handler.js";
import "./password-code.css";
import forgotPasswordImage from '../../../assets/images/food.jpg';
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ForgotPassword2() {
  const [code, setCode] = useState(["", "", "", ""]);
  const navigate = useNavigate(); // Sử dụng hook useNavigate
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Tự động chuyển sang ô tiếp theo
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <Row className="forgot-password2-container">
        {/* Bên trái: Nhập mã xác thực */}
        <Col span={12} className="forgot-password2-left">
          <Card className="forgot-password2-card">
            <h2 className="logo">ロゴ</h2>
            <h3 className="title">確認</h3>
            <p className="description">メールで受信した4桁のコードを入力してください。</p>

            {/* Input code group */}
            <div className="code-input-group">
              {code.map((value, index) => (
                <Input
                  key={index}
                  id={`code-input-${index}`}
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  className="code-input"
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="button-group">
              <Button type="default" className="back-button" onClick={() => navigate("/forgot-password")} icon={<ArrowLeftOutlined />}>
                戻る
              </Button>
              <Button type="primary" className="continue-button"onClick={() => navigate("/new-password")}>
                続ける
              </Button>
            </div>

            {/* Resend link */}
            <p className="resend-text">
              コードを受け取っていませんか？{" "}
              <span className="resend-link" onClick={handleResend}>
                再送信
              </span>
            </p>
          </Card>
        </Col>

        {/* Bên phải: Ảnh */}
        <Col span={12} className="forgot-password2-right">
          <div className="image-container">
            <img
              src={forgotPasswordImage} // Đường dẫn tới ảnh
              alt="Forgot Password Illustration"
              className="forgot-password2-image"
            />
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default ForgotPassword2;
