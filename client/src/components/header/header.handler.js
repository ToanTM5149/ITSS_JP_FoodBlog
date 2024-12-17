import { message } from 'antd';
const headerHandle = {
    handleLogout: (navigate) => {
      // Xóa token khỏi localStorage
      localStorage.removeItem('token');
      message.success('Đăng xuất thành công!');
      navigate('/login');
    },
  
    // Hàm xử lý tìm kiếm
    handleSearch: (searchValue) => {
      console.log("Tìm kiếm:", searchValue);
    },
  };
  
  export default headerHandle;