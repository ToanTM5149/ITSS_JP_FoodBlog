import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import './login.css';  // CSS cho trang Login

const LoginForm = () => {
  return (
    <div className="login-container">
      <div className="logo-container">
        <img className="image-logo" src="/image/ic_launcher.png" alt="Logo" width={50} height={50} />
        <h1 className="app-name">Food Blog</h1>  {/* Tên ứng dụng */}
      </div>

      <h2 className="welcome-title">おかえりなさい</h2>
      <p className="welcome-subtitle">またお会いできて嬉しいです</p>

      <Form
        name="login"
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
              <Button className="login-button" type="primary" htmlType="submit" block>
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
