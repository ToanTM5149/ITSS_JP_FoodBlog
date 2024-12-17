import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogin } from './login.handler';
import './login.css'; // CSS cho trang Login

const LoginForm = () => {
  const [loading, setLoading] = useState(false); // Để theo dõi trạng thái loading
  const navigate = useNavigate(); // Dùng để điều hướng sau khi đăng nhập thành công

  const handleSubmit = async (values) => {
    handleLogin(values, setLoading, navigate);
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img className="image-logo" src="/image/ic_launcher.png" alt="Logo" width={50} height={50} />
        <h1 className="app-name">Food Blog</h1>
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
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="email"
              label="メールアドレス"
              required={false}
              rules={[ 
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Địa chỉ email không hợp lệ!' },
              ]}
            >
              <Input className="custom-input" placeholder="メールアドレスを入力" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="password"
              label="パスワード"
              required={false}
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              hasFeedback
            >
              <Input.Password className="custom-input" placeholder="**************" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button
                className="login-button"
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
                ログイン
              </Button>
            </Form.Item>
          </Col>

          <Col span={24}>
            <p style={{ textAlign: 'center' }}>
              アカウントをお持ちでないですか?{' '}
              <Link to="/register" className="register-link">
                サインアップ
              </Link>
            </p>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LoginForm;
