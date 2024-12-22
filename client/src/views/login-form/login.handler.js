import { message } from 'antd';
import users from '../../data/users.json';

export const handleLogin = (values, setLoading, navigate, authContext) => {
  setLoading(true);

  // Kiểm tra thông tin đăng nhập
  const user = users.find(
    (user) => user.email === values.email && user.password === values.password
  );

  if (user) {
    // Gọi hàm handleLogin từ AuthContext
    authContext.handleLogin(user);

    // Hiển thị thông báo thành công
    message.success('Đăng nhập thành công!');
    
    // Điều hướng đến trang chính
    navigate('/');
  } else {
    // Hiển thị thông báo lỗi
    message.error('Email hoặc mật khẩu không chính xác!');
  }

  setLoading(false);
};