import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import user from '../../api/user';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';  

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);  // Trạng thái loading khi gửi form
  const navigate = useNavigate(); // Dùng useNavigate để chuyển hướng
  const [form] = Form.useForm()

const onFinish = async (values) => {
    setLoading(true);  // Bắt đầu gửi dữ liệu

    try {
        console.log("Value: ", values);
        const response = await user.createUser(values);
        console.log("Respond Data", response.data);

        if (response.status === 201) {
            message.success('User created successfully!');
            navigate('/login');  
        } else {
            message.error(`Error: ${response.data.message}`);
        }
    } catch (error) {
        console.error('Error creating user:', error);

        if (error.response) {
            console.error('Error response:', error.response);
            message.error(`Error: ${error.response.data.error || 'Unknown error'}`);
        }  else {
          message.error('Network error or server is down.');
        }
    } finally {
        setLoading(false); 
    }
};
 
  
  return (
    <div className="register-container">
      <img className='image-logo' src="/image/ic_launcher.png" alt="Logo" width={100} height={100} />
      <h2 className="register-title">アカウントを作成</h2>
      <Form
        name="register"
        initialValues={{
          remember: true,
        }}
        scrollToFirstError
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="email"
              label="メールアドレス"
              required={false} 
              rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Địa chỉ email không hợp lệ!' }]}
            >
              <Input 
                className="custom-input" 
                placeholder="メールアドレスを入力" 
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="username"
              label="氏名"
              required={false} 
              rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
            >
              <Input className="custom-input"  placeholder="氏名を入力" />
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
              <Input.Password className="custom-input"  placeholder="パスワードを作成" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
            <Button className="register-button" type="primary" htmlType="submit" block loading={loading}>
              アカウントを作成
              </Button>
            </Form.Item>
          </Col>

          <Col span={24}>
            <p style={{ textAlign: 'center' }}>
            すでにアカウントをお持ちですか?{' '}
              <Link to="/login" className="login-link">
              ログイン
              </Link>
            </p>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RegisterForm;
