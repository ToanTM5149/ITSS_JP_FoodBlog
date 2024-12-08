// login.handler.js

import { message } from 'antd';
import user from '../../api/user'; // Import API user

export const handleLogin = async (values, setLoading, navigate) => {
  const { email, password } = values;

  try {
    setLoading(true);

    const response = await user.loginUser(email, password);

    // Lưu token vào localStorage
    localStorage.setItem('token', response.data.token);
    message.success('Đăng nhập thành công!');

    navigate('/');

  } catch (error) {
    message.error(error.response?.data?.error || 'Đăng nhập không thành công!');
  } finally {
    setLoading(false); 
  }
};
