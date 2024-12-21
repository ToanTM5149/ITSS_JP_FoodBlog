import { message } from 'antd';

const headerHandle = {
  handleLogout: (navigate) => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
    message.success('Đăng xuất thành công!');
    navigate('/login');
  },

  handleSearch: (searchValue) => {
    console.log("Tìm kiếm:", searchValue);
  },

  navigateToCreateBlog: (navigate) => {
    navigate('/createblog');
  },

  navigateToWatchBlog: (navigate) => {
    navigate('/all-blogs');
  },

  navigateToProfile: (navigate) => {
    navigate('/profile');
  },

  navigateToHome: (navigate) => {
    navigate('/');
  }
};

export default headerHandle;
