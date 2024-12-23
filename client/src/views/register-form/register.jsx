import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Dùng useNavigate để chuyển hướng
  const [form] = Form.useForm();

  // Hàm xử lý khi submit form
  const onFinish = (values) => {
    setLoading(true); // Bắt đầu gửi dữ liệu

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((user) => user.email === values.email);

      if (existingUser) {
        message.error("Email này đã được đăng ký!");
        setLoading(false);
        return;
      }

      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        username: values.username,
        email: values.email,
        password: values.password,
        role: "User",
        avatar: "https://via.placeholder.com/150",
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      message.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Phần bên trái: Hình ảnh minh họa */}
        <div className="register-left">
          <img
            src="/image/register-placeholder.jpg"
            alt="Delicious food"
            className="register-image"
          />
        </div>

        {/* Phần bên phải: Form */}
        <div className="register-right">
          <img
            className="register-image-logo"
            src="/image/ic_launcher.png"
            alt="Logo"
            width={100}
            height={100}
          />
          <h2 className="register-title">アカウントを作成</h2>
          <Form
            name="register"
            initialValues={{
              remember: true,
            }}
            scrollToFirstError
            layout="vertical"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="email"
              label="メールアドレス"
              required={false}
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Địa chỉ email không hợp lệ!" },
              ]}
            >
              <Input className="register-input" placeholder="メールアドレスを入力" />
            </Form.Item>

            <Form.Item
              name="username"
              label="氏名"
              required={false}
              rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
            >
              <Input className="register-input" placeholder="氏名を入力" />
            </Form.Item>

            <Form.Item
              name="password"
              label="パスワード"
              required={false}
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              hasFeedback
            >
              <Input.Password className="register-input" placeholder="パスワードを作成" />
            </Form.Item>

            <Form.Item>
              <Button
                className="register-button"
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
                アカウントを作成
              </Button>
            </Form.Item>

            <p style={{ textAlign: "center" }}>
              すでにアカウントをお持ちですか?{" "}
              <Link to="/login" className="register-login-link">
                ログイン
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
