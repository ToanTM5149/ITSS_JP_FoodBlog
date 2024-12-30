import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((user) => user.email === values.email);

      if (existingUser) {
        message.error("このメールアドレスは既に登録されています!");
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
      message.success("登録が成功しました!");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      message.error("エラーが発生しました。後で再試行してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Phần bên trái: Hình ảnh minh họa */}
        <div className="register-left">
          {/* <img
            src="/image/register-placeholder.jpg"
            alt="Delicious food"
            className="register-image"
          /> */}
        </div>

        {/* Phần bên phải: Form */}
        <div className="register-right">
          <img
            className="register-image-logo"
            src="/image/preview.png"
            alt="Logo"
            width={50}
            height={50}
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
                { required: true, message: "メールアドレスを入力してください！" },
                { type: "email", message: "無効なメールアドレスです！" },
              ]}
            >
              <Input className="register-input" placeholder="メールアドレスを入力" />
            </Form.Item>

            <Form.Item
              name="username"
              label="氏名"
              required={false}
              rules={[{ required: true, message: "ユーザー名を入力してください！" }]}
            >
              <Input className="register-input" placeholder="氏名を入力" />
            </Form.Item>

            <Form.Item
              name="password"
              label="パスワード"
              required={false}
              rules={[{ required: true, message: "パスワードを入力してください！" }]}
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
