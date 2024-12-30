import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth_context";
import { handleLogin } from "./login.handler";
import { motion } from "framer-motion";
import "./login.css";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleLogin: handleAuthLogin } = useContext(AuthContext); // Lấy hàm handleLogin từ AuthContext

  const handleSubmit = (values) => {
    handleLogin(values, setLoading, navigate, handleAuthLogin);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Phần bên trái: Form */}
        <div className="login-left">
          <div className="logo-container">
            <img
              className="image-logo"
              src="image/preview.png"
              alt="Logo"
              width={50}
              height={50}
            />
            <h1 className="app-name">ベトフード</h1>
          </div>

          <h2 className="welcome-title">おかえりなさい</h2>
          <p className="welcome-subtitle">またお会いできて嬉しいです</p>

          <Form
            name="login"
            onFinish={handleSubmit}
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              name="email"
              label="メールアドレス"
              required={false}
              rules={[
                { required: true, message: "メールアドレスを入力してください！" },
                { type: "email", message: "有効なメールアドレスを入力してください！" },
              ]}
            >
              <Input className="login-input" placeholder="メールアドレスを入力" />
            </Form.Item>

            <Form.Item
              name="password"
              label="パスワード"
              required={false}
              rules={[{ required: true, message: "パスワードを入力してください！" }]}
              hasFeedback
            >
              <Input.Password
                className="login-input"
                placeholder="**************"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="login-button"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                ログイン
              </Button>
            </Form.Item>

            <p style={{ textAlign: "center" }}>
              アカウントをお持ちでないですか？{" "}
              <Link to="/register" style={{ marginRight: "20px" }}>
                サインアップ
              </Link>
              <br />
              <Link to="/forgot-password" className="forgot-password-link">
                パスワードを忘れましたか？
              </Link>
            </p>
          </Form>
        </div>

        {/* Phần bên phải: Ảnh minh họa */}
        <div className="login-right">
          {/* <motion.img
            src="/image/preview.png"
            alt="おいしい食べ物"
            className="login-image"
            initial={{ opacity: 0, x: 100 }}  // Khởi tạo trạng thái ảnh ẩn và di chuyển bên phải
            animate={{ opacity: 1, x: 0 }}    // Ảnh sẽ hiện lên và di chuyển về vị trí ban đầu
            transition={{ duration: 1 }}       // Thời gian hiệu ứng
          /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
